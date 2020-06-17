<template>
	<view class="content">
		<view style="display: flex;">
			<view v-if="searchAll">总计入库钢瓶数：{{itemLength}}</view>
			<view v-if="!searchAll">选择范围入库数：{{selectedWorkloadItems.length}}</view>
			<view>
				<button type="primary" size="mini" style="left: 260rpx; height:50rpx; margin: 0rpx; width: 175rpx;" @tap="isTimeSelectVisible = true">选择时间</button>
			</view>
		</view>

		<view v-if="searchAll" v-for="(item,index) in workloadItems" :key="index" class="worklaodItem">
			<view class="innerItem">钢印号：{{item.stampId}}</view>
			<view class="innerItem">入库时间：{{parseTime(item.moveTime)}}</view>
		</view>

		<view v-if="!searchAll" v-for="(item,index) in selectedWorkloadItems" :key="index" class="worklaodItem">
			<view class="innerItem">钢印号：{{item.stampId}}</view>
			<view class="innerItem">入库时间：{{parseTime(item.moveTime)}}</view>
		</view>

		<!-- 侧边抽屉 -->
		<uni-drawer :visible="isTimeSelectVisible" mode="right" @close="isTimeSelectVisible = false">
			<view style="padding:30rpx;">
				起始日期：
				<picker mode="date" :value="wlStartDate" :start="startDate" :end="endDate" @change="bindDateChangeStart">
					<view class="uni-input">{{wlStartDate}}</view>
				</picker>
				结束日期：
				<picker mode="date" :value="wlEndDate" :start="startDate" :end="endDate" @change="bindDateChangeEnd">
					<view class="uni-input">{{wlEndDate}}</view>
				</picker>
				<button type="primary" @tap="BindCheckWlRange">查询</button>
				<button type="default" @tap="BindClearWlRange">显示所有</button>
			</view>
		</uni-drawer>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		computed: mapState(['userId']),
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				userId: 0,
				workloadItems: [],
				selectedWorkloadItems: [],
				isTimeSelectVisible: false,
				itemLength: 0,
				searchAll: true,
				index: 0,
				wlStartDate: currentDate,
				wlEndDate: currentDate,
			}
		},
		computed: {
			startDate() {
				var startDate = this.getDate('start');
				return startDate;
			},
			endDate() {
				var endDate = this.getDate('end');
				return endDate;
			},
		},
		methods: {
			...mapMutations(['']),
			bindDateChangeStart: function(e) {
				this.wlStartDate = e.target.value;
			},
			bindDateChangeEnd: function(e) {
				this.wlEndDate = e.target.value;
			},

			refresh() {
				uni.startPullDownRefresh({
					success: (res) => {
						this.getWlDelivery();
					}
				});
			},
			getWlDelivery() {
				uni.request({
					url: this.constVal.baseURL + "/system/workload/deliverer/" + this.userId,
					method: 'GET',
					success: (res) => {
						this.workloadItems = res.data.rows;
						this.itemLength = this.workloadItems.length;
					}
				})
			},
			BindCheckWlRange() {
				this.selectedWorkloadItems = [];
				var wlStartDateTrans = new Date(this.wlStartDate.replace((/-/g, "/")));
				var wlEndDateTrans = new Date(this.wlEndDate.replace((/-/g, "/")));
				wlEndDateTrans.setTime(wlEndDateTrans.getTime() + 24 * 60 * 60 * 1000);
				var wlEndDateTrans = wlEndDateTrans.getFullYear() + "-" + (wlEndDateTrans.getMonth() + 1) + "-" + wlEndDateTrans.getDate();
				var wlEndDateTrans = new Date(wlEndDateTrans.replace((/-/g, "/")));
				this.workloadItems.forEach(item => {
					var itemMoveTimeTrans = new Date(item.moveTime.replace((/-/g, "/")));
					if ((wlEndDateTrans > itemMoveTimeTrans) && (itemMoveTimeTrans > wlStartDateTrans)) {
						this.selectedWorkloadItems.push(item);
					}
				})
				this.searchAll = false;
				this.isTimeSelectVisible = false;
				uni.showToast({
					icon: 'success',
					title: '查询成功',
				})
			},
			BindClearWlRange() {
				this.searchAll = true;
				this.isTimeSelectVisible = false;
			},
		},
		onLoad() {
			this.userId = uni.getStorageSync('userId');
			this.refresh();
			// this.transAddr();
		},
		onPullDownRefresh() {
			this.getWlDelivery();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		}
	}
</script>

<style>
</style>
