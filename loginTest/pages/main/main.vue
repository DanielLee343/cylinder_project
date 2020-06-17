<template>
	<!-- <view class="content" style="background-image: url('../../static/bg.jpeg'); background-repeat:no-repeat; background-size: 100% 40%"> -->
	<view class="content" >
		<view v-if="hasLogin" class="hello">
			<view style="margin-top: 70px; margin-left: 30rpx; margin-bottom: 30px;">
				<view style="font-size: 30px; font-weight: bold;">西安总气站</view>
				<view style="font-size: 20px; ">{{roleName}}-{{nickName}}</view>
			</view>

			<view style="background-color: #eef5ca; padding: 10px 20px 10px 20px; border-radius: 7px; box-shadow: -1px 2px 4px #8A8A8A; height: 150px;">
				<view style="text-align: center;margin-bottom: 20px; font-size: 20px;">
					我的工作台
				</view>
				<view v-if="roleId == 2" class="equallyDistribute">
					<!-- 录入工 -->
					<view @tap="bindCldOpt" class="innerItem">
						<img src="../../static/icons/cld_opt.png" class="innerImg" />
						<view>钢瓶管理</view>
					</view>
					<view @tap="bindCldInsert" class="innerItem">
						<img src="../../static/icons/cld_insert.png" class="innerImg" />
						<view>钢瓶录入</view>
					</view>
					<view @tap="bindValveOpt" class="innerItem">
						<img src="../../static/icons/valve_opt.png" class="innerImg" />
						<view>阀体管理</view>
					</view>
					<view @tap="showValveDetail" class="innerItem">
						<img src="../../static/icons/valve_insert.png" class="innerImg" />
						<view>阀体录入</view>
					</view>
				</view>
				<view v-else-if="roleId == 3" class="equallyDistribute">
					<!-- 运输工 -->
					<view @tap="bindCheckCurrentOrder" class="innerItem">
						<img src="../../static/icons/check_order.png" class="innerImg" />
						<view>查看订单</view>
					</view>
					<view @tap="bindToWlDelivery" class="innerItem">
						<img src="../../static/icons/wl.png" class="innerImg" />
						<view>我的业绩</view>
					</view>
					<view @tap="bindSendBack" class="innerItem">
						<img src="../../static/icons/send_back.png" class="innerImg" />
						<view>空瓶回收</view>
					</view>
				</view>
				<view v-else-if="roleId == 4" class="equallyDistribute">
					<!-- 充装工 -->
					<view @tap="bindRefillCld" class="innerItem">
						<img src="../../static/icons/valve_insert.png" class="innerImg" />
						<view>充装钢瓶</view>
					</view>
					<view @tap="bindToWlRefiller" class="innerItem">
						<img src="../../static/icons/wl.png" class="innerImg" />
						<view>我的业绩</view>
					</view>
				</view>
				<view v-else-if="roleId == 6" class="equallyDistribute">
					<!-- 库管员 -->
					<view @tap="bindToStorage" class="innerItem">
						<img src="../../static/icons/send_back.png" class="innerImg" />
						<view>钢瓶入库</view>
					</view>
					<view @tap="bindToWlStorage" class="innerItem">
						<img src="../../static/icons/wl.png" class="innerImg" />
						<view>我的业绩</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="!hasLogin" class="hello">
			<view class="title">
				您好 游客。
			</view>
		</view>
		<neil-modal :show="showInsertValve" @cancle="bindHideModal" title="阀体信息" confirm-text="确认录入" cancel-text="取消"
		 @confirm="bindInsertValve">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<view>气阀编号：{{newValve.valveNum}}</view>
				<view>生产厂家：{{newValve.prodCmp}}</view>
				<view>生产日期：{{newValve.valveCreateDate}}</view>
				<view>备注：{{newValve.valveComment}}</view>
			</view>
		</neil-modal>

		<neil-modal :show="showSocketModel" @cancle="showSocketModel = false" title="有新订单" confirm-text="查看" cancel-text="取消"
		 @confirm="bindCheckCurrentOrder" @close="showSocketModel = false">
		</neil-modal>
	</view>
</template>

<script>
	import {
		createSocket,
		sendWSPush
	} from '../../common/websocket.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: mapState(['hasLogin', 'userName']),
		data() {
			return {
				roleName: "",
				roleId: 0,
				nickName: "",
				newValve: "",
				showInsertValve: undefined,
				userId: 0,
				lng: "",
				lat: "",
				showSocketModel: false,
				socketOpen: false,
			}
		},
		methods: {
			...mapMutations(['toCldOpt', 'toCldInsert', 'toValveOpt', 'toCurOrder', 'toWLDelivery', 'toSendBack', 'toRefillCld',
				'toToStorage', 'toWlRefiller', 'toWlStorage'
			]),
			getButtons(userId) {
				uni.request({
					url: this.constVal.baseURL + '/getRoleId/' + userId,
					method: 'GET',
					success: (res) => {
						uni.setStorageSync('roleId', res.data.data.roleId);
						uni.setStorageSync('roleName', res.data.data.roleName);
						this.roleId = res.data.data.roleId;
						this.roleName = res.data.data.roleName;
						this.nickName = res.data.data.nickName;
					}
				})
			},
			//充装工
			bindCldOpt() {
				this.toCldOpt(this.userId);
			},
			bindCldInsert() {
				this.toCldInsert(this.userId);
			},
			bindValveOpt() {
				this.toValveOpt(this.userId);
			},
			showValveDetail() {
				var _this = this;
				uni.scanCode({
					scanType: 'qrCode',
					success: function(res) {
						_this.newValve = JSON.parse((res.result).trim());
						_this.newValve.valveEntryId = _this.userId;
						_this.showInsertValve = true;
					}
				});
			},
			bindInsertValve() {
				uni.request({
					url: this.constVal.baseURL + '/system/valve',
					data: this.newValve,
					method: 'POST',
					success: (res) => {
						uni.showToast({
							icon: 'none',
							title: '新增成功',
						});
					}
				})
			},
			bindHideModal() {
				this.showInsertValve = false;
			},

			//配送工
			bindCheckCurrentOrder() {
				this.toCurOrder(this.userId);
			},
			bindToWlDelivery() {
				this.toWLDelivery(this.userId);
			},
			bindSendBack() {
				this.toSendBack(this.userId);
			},
			bindRefillCld() {
				this.toRefillCld(this.userId);
			},
			// 录入工工作量
			bindToWlRefiller() {
				this.toWlRefiller(this.userId);
			},
			// 入库
			bindToStorage() {
				this.toToStorage(this.userId);
			},
			// 库管员工作量查看
			bindToWlStorage() {
				this.toWlStorage(this.userId);
			}
		},

		created() {
			this.userId = uni.getStorageSync('userId');
			this.getButtons(this.userId);

			// uni.connectSocket({
			// 	url: 'ws://localhost:9999/websocket/socketServer/' + this.userId,
			// });

			// uni.onSocketOpen(function(res) {
			// 	console.log('WebSocket连接已打开！');
			// });
			// var _this = this;
			// uni.onSocketMessage(function(res) {
			// 	// uni.showToast({
			// 	// 	image: '../../static/icons/list.png',
			// 	// 	title: '该接单了',
			// 	// })
			// 	if (res.data == "该接单了") {
			// 		_this.showSocketModel = true;
			// 	}
			// });
		},
	}
</script>

<style>
	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul {
		font-size: 15px;
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul>view {
		line-height: 25px;
	}
</style>
