<template>
	<view class="content">
		当前员工编号：{{userId}}
		<view class="uni-padding-wrap">
			<view style="float: left;">
				已添加数量：{{scannedCldList.length}}
			</view>
			<button type="primary" size="mini" style="float: right;margin-top: 0;" @tap="bindScan">
				添加空瓶
			</button>
		</view>
		<view class="sendBackBar">
			<view>钢印号</view>
			<view class="sendBackBarProp">规格(KG)</view>
			<view class="sendBackBarProp">瓶子状态</view>
			<view class="sendBackBarProp">操作</view>
		</view>
		<view v-for="(item, index) in scannedCldList" :key="index" class="sendBackItem">
			<view style="margin: 2rpx 0 0 30rpx">{{item.stampId}}</view>
			<view style="margin: 2rpx 0 0 140rpx">{{item.spec}}</view>
			<view style="margin: 2rpx 0 0 158rpx">{{item.isFull}}</view>
			<button type="warn" size="mini" style="margin: 0 0 0 0rpx;left: 78rpx; font-size: 12px;" @tap="deleteCurCld(index)">
				删除
			</button>
		</view>

		<!-- 扫码结果 -->
		<neil-modal :show="showVCDetail" @cancle="bindHideVCDetail" title="钢瓶信息" confirm-text="确认添加" cancel-text="取消"
		 @confirm="confirmAddCld" @close="bindHideVCDetail">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<view>钢瓶编号: {{VCDetail.stampId}}</view>
				<view>钢瓶规格(KG): {{VCDetail.spec}}</view>
				<view>钢瓶租金(元): {{VCDetail.price}}</view>
				<view>钢瓶备注: {{VCDetail.comment}}</view>
				<view>钢瓶状态: {{VCDetail.isFull}}</view>
			</view>
		</neil-modal>
		<uni-fab :pattern="pattern" :content="fabContent" @trigger="bindShowTriggerModel" class="fab"></uni-fab>

		<neil-modal :show="showConfirmModel" @cancle="showConfirmModel = false" title="是否充装" confirm-text="确认已充装" cancel-text="取消"
		 @confirm="confirmTransfer" @close="showConfirmModel = false">
			<!-- <view style="min-height: 90upx;padding: 32upx 24upx;">
				
			</view> -->
		</neil-modal>
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
				scannedCldList: [],
				VCDetail: {},
				showVCDetail: false,
				Valve: {},
				fabContent: [{
					text: "批量充装",
					iconPath: "../../static/icons/arrow_down.png",
				}],
				pattern: {

				},
				location: "",
				showConfirmModel: false,
				stampIds: [],
			}
		},
		methods: {
			...mapMutations(['']),
			//扫码
			bindScan() {
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
			//获取VC详细信息
			getVCDetail(valveNum) {
				uni.request({
					url: this.constVal.baseURL + '/system/order/VC/' + valveNum,
					method: 'GET',
					success: (res) => {
						this.VCDetail = res.data.data;
						if (this.VCDetail.isFull == '0') {
							this.VCDetail.isFull = '空瓶';
						} else if (this.VCDetail.isFull == '1') {
							// this.VCDetail.isFull = '重瓶';
							uni.showToast({
								title: '该瓶为重瓶，无法充装',
								image: '../../static/icons/forbidden.png',
								duration: 2000,
							})
							return;
						}
						this.showVCDetail = true;
					}
				})
			},
			//添加钢瓶
			confirmAddCld() {
				this.checkAddCld(this.scannedCldList, this.VCDetail);
			},
			bindShowTriggerModel() {
				this.showConfirmModel = true;
				this.scannedCldList.forEach(item => {
					this.stampIds.push(item.stampId);
				});
				console.log(this.stampIds);
				uni.getLocation({
					success: (res) => {
						this.location = res.latitude + "," + res.longitude;
					}
				})
			},
			// 确认充装
			confirmTransfer() {
				uni.request({
					url: this.constVal.baseURL + '/system/cld/refill',
					data: {
						refillStampIds: this.stampIds,
						refillerId: this.userId,
					},
					method: 'PUT',
					success: (res) => {
						this.scannedCldList = [];
						this.stampIds = [];
						uni.showToast({
							image: '../../static/icons/check_filled.png',
							title: '充装成功',
						})
					}
				})
			},
			// 隐藏窗口
			bindHideVCDetail() {
				this.showVCDetail = false;
			},
			//移除当前钢瓶
			deleteCurCld(index) {
				this.scannedCldList.splice(index, 1);
				uni.showToast({
					icon: 'success',
					title: '删除成功',
				})
			},


		},
		onLoad() {

		},
		// onPullDownRefresh() {
		// 	setTimeout(function() {
		// 		uni.stopPullDownRefresh();
		// 	}, 500);
		// }
	}
</script>

<style>
</style>
