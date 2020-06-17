<template>
	<view class="content">
		<view class="btn-row">
			<button v-if="!isBind" type="primary" @tap="bindSortUnbindCld">绑定钢瓶</button>
			<button v-if="isBind" type="default" @tap="unbindCV">解绑</button>
			<button type="warn" class="warn" @tap="bindDeleteValve">删除</button>
		</view>
		<view class="valveItem">
			<view>气阀编号：{{valveDetail.valveNum}}</view>
			<view>钢印号：{{valveDetail.stampId}}</view>
			<view>生产厂商：{{valveDetail.prodCmp}}</view>
			<view>生产日期：{{parseTime(valveDetail.valveCreateDate)}}</view>
			<view>录入人：{{valveDetail.userName}}</view>
			<view>录入时间：{{parseTime(valveDetail.valveEntryTime)}}</view>
			<view>备注：{{valveDetail.valveComment}}</view>
		</view>

		<!-- 侧边抽屉 -->
		<uni-drawer :visible="isUnbindCldVisible" mode="right" @close="isUnbindCldVisible = false">
			<view style="padding:30rpx;">
				<uni-indexed-list :options="unBindCldList" :showSelect="isUnbindCldVisible" @click="bindCldClick">
				</uni-indexed-list>
			</view>
		</uni-drawer>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
	} from 'vuex'
	export default {
		components: {},
		computed: mapState(['valveNum']),
		data() {
			return {
				createDateF: undefined,
				entryTimeF: undefined,
				isUnbindCldVisible: false,
				unBindCldList: [{
					"data": []
				}],
				valveDetail: {},
				// 当前阀是否绑定
				isBind: false,
			}
		},
		methods: {
			...mapMutations(['valveDeleteSuccess']),
			transDate() {
				this.createDateF = this.parseTime(this.valveDetail.valveCreateDate)
				this.entryTimeF = this.parseTime(this.valveDetail.valveEntryTime)
			},
			bindDeleteValve() {
				uni.showModal({
					title: '删除气阀',
					content: '是否删除',
					success: (res) => {
						if (res.confirm) {
							uni.request({
								url: this.constVal.baseURL + '/system/valve/',
								data: {
									valveId: this.valveDetail.valveId,
									stampId: this.valveDetail.stampId,
								},
								method: 'DELETE',
								success: (res) => {
									this.valveDeleteSuccess();
								}
							})
						} else if (res.cancel) {
							return;
						}
					}
				})
			},
			// 显示未绑定Cld
			bindSortUnbindCld() {
				this.unBindCldList[0].data = [];
				this.getUnbindClds();
			},
			// 解绑
			unbindCV() {
				uni.showModal({
					title: '解绑',
					content: '是否解绑',
					success: (res) => {
						if (res.confirm) {
							uni.request({
								url: this.constVal.baseURL + '/system/valve/unbind',
								method: 'PUT',
								data: {
									stampId: this.valveDetail.stampId,
								},
								success: (res) => {
									if (res.data.code == 200) {
										this.isBind = false;
										this.getCurValve();
										uni.showToast({
											title: '解绑成功',
											image: '../../static/icons/check.png'
										})
									} else {
										uni.showToast({
											title: '解绑失败',
											image: '../../static/icons/close.png',
										})
									}
								}
							})
						} else if (res.cancel) {
							return;
						}
					}
				})
			},
			bindCldClick(e) {
				this.isUnbindCldVisible = false;
				uni.showModal({
					title: '绑定钢瓶',
					content: e.item.name,
					success: (res) => {
						if (res.confirm) {
							uni.request({
								url: this.constVal.baseURL + '/system/valve/bind',
								data: {
									stampId: e.item.name,
									valveNum: this.valveDetail.valveNum,
								},
								method: 'PUT',
								success: (res) => {
									uni.showToast({
										title: '绑定成功',
										image: '../../static/icons/check.png',
									})
									this.isBind = true;
									this.getCurValve();
								}
							})
						} else if (res.cancel) {
							return;
						}
					}
				})
			},
			getCurValve() {
				uni.request({
					url: this.constVal.baseURL + '/system/valve/list',
					data: {
						valveNum: this.valveNum
					},
					success: (res) => {
						this.valveDetail = res.data.rows[0];
						if (this.valveDetail.stampId != '') { //已绑定
							this.isBind = true;
						} else { //未绑定
							this.isBind = false;
						}
					}
				})
			},
			getUnbindClds() {
				uni.request({
					url: this.constVal.baseURL + '/system/cld/unbindList',
					success: (res) => {
						var Clds = res.data.rows;
						if (Clds == []) {
							uni.showToast({
								title: '当前无未绑定钢瓶',
								duration: 2000,
								image: '../../static/icons/forbidden.png',
							})
						} else {
							this.isUnbindCldVisible = true;
							Clds.forEach(item => {
								this.unBindCldList[0].data.push(item.stampId);
							})
						}
					}
				})
			},

		},
		onLoad() {
			this.transDate();
			this.getCurValve();
		}
	}
</script>

<style>

</style>
