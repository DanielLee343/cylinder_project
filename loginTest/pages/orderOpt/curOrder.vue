<template>
	<view class="content">
		<view>
			<uni-segmented-control :current="current" :values="orderStatusItems" @clickItem="onClickItem" style-type="button"
			 active-color="#009dff"></uni-segmented-control>
			<view class="content">
				<view v-if="current === 0">
					<view class="orderItem" v-for="(item, index) in waitOrderItems" :key="index" @click="showOrderDetail(item.orderNum, item.clientLocation)">
						<view>订单编号: {{item.orderNum}}</view>
						<view>订单状态: 尚未接单</view>
						<view>钢瓶数量: {{item.amount}}</view>
						<view>订单金额: {{item.fee}}</view>
						<view>下单时间: {{parseTime(item.createDate)}}</view>
						<!-- <view>分配人员: {{userName}}</view> -->
						<view>客户地址: {{item.clientLocation}}</view>
						<view>客户名称: {{item.clientName}}</view>
						<view>客户手机: {{item.clientNum}}</view>
					</view>
				</view>
				<view v-if="current === 1">
					<view class="orderItem" v-for="(item, index) in curOrderItems" :key="index" @click="showOrderDetail(item.orderNum, item.clientLocation)">
						<view>订单编号: {{item.orderNum}}</view>
						<view>订单状态: 已接单</view>
						<view>钢瓶数量: {{item.amount}}</view>
						<view>订单金额: {{item.fee}}</view>
						<view>下单时间: {{parseTime(item.createDate)}}</view>
						<!-- <view>分配人员: {{userId}}</view> -->
						<view>客户地址: {{item.clientLocation}}</view>
						<view>客户名称: {{item.clientName}}</view>
						<view>客户手机: {{item.clientNum}}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 侧边抽屉 -->
		<uni-drawer :visible="isOrderDetailVisible" mode="right" @close="isOrderDetailVisible = false">
			<view style="padding:30rpx;">
				<view class="drawerTitle">订单详情</view>
				<view v-for="(item, index) in curOrderDetail" :key="index" class="orderDetail">
					<view>钢瓶规格(KG): {{item.cldSpec}}</view>
					<view>瓶数: {{item.cldAmount}}</view>
				</view>
				<button type="primary" class="primary" @tap="takeOrder" v-if="isShowTakeOrderButton">接单</button>
				<button type="primary" @tap="ScanValveToTrans" v-if="isShowScanValveButton">扫码运送</button>
				<button type="primary" @tap="ScanValveToHome" v-if="isShowScanValveButton">钢瓶入户</button>
				<button type="primary" @tap="showMapToHome" v-if="isShowScanValveButton">查看线路</button>
			</view>
		</uni-drawer>

		<!-- 扫码结果 -->
		<neil-modal :show="showVCDetail" @cancle="bindHideVCDetail" title="钢瓶信息" confirm-text="确认添加" cancel-text="取消"
		 @confirm="confirmAddCld" @close="bindHideVCDetail">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<view>钢瓶编号: {{VCDetail.stampId}}</view>
				<view>钢瓶规格(KG): {{VCDetail.spec}}</view>
				<view>钢瓶租金(元): {{VCDetail.price}}</view>
				<view>钢瓶备注: {{VCDetail.comment}}</view>
				<view>气阀编号: {{VCDetail.valveNum}}</view>
				<view>生产厂家: {{VCDetail.prodCmp}}</view>
				<view>气阀备注: {{VCDetail.valveComment}}</view>
			</view>
		</neil-modal>

		<!-- 配送详情 -->
		<neil-modal :show="showDeliverDetail" title="配送信息" confirm-text="确认配送" cancel-text="取消" @confirm="confirmDeliver"
		 @close="hideDeliverDetail">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<view style="text-align: center;">钢瓶编号</view>
				<view v-for="(item, index) in cldToDeliver" :key="index">
					<view style="display: flex;">
						<view style="float: left;font-size: 35rpx; margin: 7rpx 0 0 20rpx;">{{item}}</view>
						<button size="mini" style="left: 250rpx; height:50rpx; margin: 0rpx 0rpx 20rpx 0rpx;" type="warn" @tap="removeCurCld(index)">删除</button>
					</view>
				</view>
			</view>
		</neil-modal>

		<uni-fab :pattern="pattern" :content="fabContent" @trigger="triggerShowModal" class="fab"></uni-fab>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: mapState(['userId']),
		data() {
			return {
				curOrderItems: [],
				waitOrderItems: [],
				isOrderDetailVisible: false,
				curOrderNum: 0,
				curOrderLocation: "",
				curOrderDetail: [],
				orderStatusItems: ['待接单', '正在进行单'],
				current: 0,
				isShowTakeOrderButton: true,
				isShowScanValveButton: false,
				showVCDetail: false,
				//显示stampIds
				showDeliverDetail: undefined,
				//瓶阀详细信息
				VCDetail: {},
				//扫码获取valve信息
				Valve: {},
				//将要配送的stampId数组
				cldToDeliver: [],
				fabContent: [{
					text: "当前钢瓶",
					iconPath: "../../static/icons/list.png",
				}],
				pattern: {

				},
				submitType: "",
				location: "",
				nextDelivererId: 0,
				curLat: "",
				curLng: "",
			}
		},
		methods: {
			...mapMutations(['toOrderMap', 'changeLat', 'changeLng']),
			//点击显示分隔栏模块
			onClickItem(e) {
				if (e.currentIndex == 0) {
					this.current = 0;
					this.isShowTakeOrderButton = true;
					this.isShowScanValveButton = false;
					this.getWaitOrder();
				} else if (e.currentIndex == 1) {
					this.current = 1;
					this.isShowTakeOrderButton = false;
					this.isShowScanValveButton = true;
					this.getCurrentOrder();
				}
			},
			//刷新页面
			refreshOrder() {
				uni.startPullDownRefresh({
					success: (res) => {
						this.getWaitOrder();
						this.getCurrentOrder();
					}
				});
			},
			//获取待接订单
			getWaitOrder() {
				uni.request({
					url: this.constVal.baseURL + '/system/order/cur_list',
					method: 'GET',
					data: {
						toStaffIdFirst: this.userId,
						toStaffIdSecond: this.userId,
						orderStatusFirst: "0",
						orderStatusSecond: "0",
					},
					success: (res) => {
						this.waitOrderItems = res.data.rows;
						this.waitOrderItems.forEach(item => {
							if (item.orderStatus == '0') {
								item.orderStatus = '未接单'
							} else if (item.orderStatus == '1') {
								item.orderStatus = '已接单'
							}
						})
					},
				})
			},
			//获取正在进行单
			getCurrentOrder() {
				uni.request({
					url: this.constVal.baseURL + '/system/order/cur_list',
					method: 'GET',
					data: {
						currentStaffId: this.userId,
						orderStatusFirst: "1",
						orderStatusSecond: "1",
					},
					success: (res) => {
						this.curOrderItems = res.data.rows;
						this.curOrderItems.forEach(item => {
							if (item.orderStatus == '0') {
								item.orderStatus = '未接单'
							} else if (item.orderStatus == '1') {
								item.orderStatus = '已接单'
							}
						})
					}
				})
			},

			// 展示抽屉，显示订单详情
			showOrderDetail(orderNum, clientLocation) {
				this.isOrderDetailVisible = true;
				this.curOrderLocation = clientLocation;
				this.curOrderNum = orderNum;
				uni.request({
					url: this.constVal.baseURL + '/system/order/cur_list/' + orderNum,
					method: 'GET',
					success: (res) => {
						this.curOrderDetail = res.data.data;
					}
				})
			},
			// 接单
			takeOrder() {
				var sysOrder = {};
				sysOrder.orderNum = this.curOrderNum;
				sysOrder.currentStaffId = this.userId;
				uni.request({
					url: this.constVal.baseURL + '/system/order',
					method: 'PUT',
					data: {
						orderNum: this.curOrderNum,
						currentStaffId: this.userId,
					},
					success: (res) => {
						if (res.data.code == 200) {
							uni.showToast({
								icon: 'success',
								title: '接单成功',
							});
							this.isOrderDetailVisible = false;
							this.refreshOrder();
							this.nextDelivererId = res.data.data;
							this.sendPush();
						}
					}
				})
			},
			// 扫码转接
			ScanValveToTrans() {
				this.submitType = "transport";
				this.scanQRCode();
			},
			// 查看地图线路
			showMapToHome() {
				var lat = 0;
				var lng = 0;
				uni.getLocation({
					success: (res) => {
						lat = res.latitude;
						lng = res.longitude;
						this.changeLat(lat);
						this.changeLng(lng);
						this.toOrderMap(this.curOrderLocation);
					}
				})
			},
			scanQRCode() {
				var _this = this;
				uni.scanCode({
					scanType: ['qrCode'],
					success: function(res) {
						_this.Valve = JSON.parse((res.result).trim());
						_this.getVCDetail(_this.Valve.valveNum);
					},
					fail: (res) => {
						console.log(res);
					}
				});
			},
			// 扫码入户
			ScanValveToHome() {
				this.submitType = "toHome";
				this.scanQRCode();
			},
			//获取VC详细信息
			getVCDetail(valveNum) {
				uni.request({
					url: this.constVal.baseURL + '/system/order/VC/' + valveNum,
					method: 'GET',
					success: (res) => {
						this.VCDetail = res.data.data;
						this.showVCDetail = true;
					}
				})
			},
			//加入钢瓶到数组
			confirmAddCld() {
				// this.cldToDeliver.push(this.VCDetail.stampId);
				// uni.showToast({
				// 	icon: 'success',
				// 	title: '添加成功',
				// })
				this.checkAddCldStampId(this.cldToDeliver, this.VCDetail.stampId);
			},
			//显示选中stampId列表
			triggerShowModal(e) {
				this.showDeliverDetail = true;
				uni.getLocation({
					success: (res) => {
						this.location = res.latitude + "," + res.longitude;
					}
				})
			},
			//关闭VCdetail提示框
			bindHideVCDetail() {
				this.showVCDetail = false;
			},
			//关闭stampIds提示框
			hideDeliverDetail() {
				this.showDeliverDetail = false;
			},
			//删除当前钢瓶
			removeCurCld(index) {
				this.cldToDeliver.splice(index, 1);
			},
			//配送钢瓶
			confirmDeliver() {
				//检测是否为空
				if (this.cldToDeliver.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请添加钢瓶'
					})
					this.showDeliverDetail = false;
					return;
				}
				//转移资产
				if (this.submitType == "transport") {
					uni.request({
						url: this.constVal.baseURL + '/system/order/delCld',
						method: 'POST',
						data: {
							stampIds: this.cldToDeliver,
							toUserId: this.userId,
							location: this.location,
						},
						success: (res) => {
							this.cldToDeliver = [];
							this.refreshOrder();
							uni.showToast({
								icon: 'success',
								title: '钢瓶成功转移',
							});
						}
					})
					// 运送入户
				} else if (this.submitType == "toHome") {
					var sysOrder = {};
					var cldMove = {};
					sysOrder.orderNum = this.curOrderNum;
					sysOrder.clientLocation = this.location;
					cldMove.stampIds = this.cldToDeliver;
					uni.request({
						url: this.constVal.baseURL + '/system/order/home',
						method: 'POST',
						data: {
							sysOrder,
							cldMove
						},
						success: (res) => {
							this.cldToDeliver = [];
							this.refreshOrder();
							uni.showToast({
								icon: 'success',
								title: '钢瓶成功入户',
							});
						}
					})
				}
			},
			// websocket推送消息
			sendPush() {
				uni.request({
					url: 'http://localhost:9999/websocket/message/' + this.nextDelivererId,
					// url: 'http://localhost:9999/websocket/message/3',
					data: {
						data: "该接单了",
					},
					success: (res) => {
						console.log(res);
					}
				})
			},
		},
		onLoad() {
			this.refreshOrder();
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		}
	}
</script>

<style>
</style>
