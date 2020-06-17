<template>
	<view class="content">
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindEditCld">编辑</button>
			<button type="warn" class="warn" @tap="bindDeleteCld">删除</button>
		</view>
		<view class="cldItem">
			<view>钢印号：{{cldDetail.stampId}}</view>
			<view>所属气站：{{currentCld.stationName}}</view>
			<view>生产日期：{{createDateF}}</view>
			<view>报废日期：{{disposeDateF}}</view>
			<view>初始重量（KG）：{{currentCld.initWeight}}</view>
			<view>规格（KG）：{{currentCld.spec}}</view>
			<view>租金（元）：{{currentCld.price}}</view>
			<view>录入人：{{currentCld.userName}}</view>
			<view>录入时间：{{entryTimeF}}</view>
			<view>备注：{{currentCld.comment}}</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		cldDetail,
	} from 'vuex'
	export default {
		components: {},
		computed: mapState(['cldDetail', 'isEdit']),
		data() {
			return {
				createDateF: undefined,
				disposeDateF: undefined,
				entryTimeF: undefined,
				currentCld: {},
			}
		},
		methods: {
			...mapMutations(['cldUpdateOrInsertSuccess', 'toEditCld']),
			transDate() {
				this.createDateF = this.parseTime(this.currentCld.createDate)
				this.disposeDateF = this.parseTime(this.currentCld.disposeDate)
				this.entryTimeF = this.parseTime(this.currentCld.entryTime)
			},
			bindEditCld() {
				this.toEditCld();
			},
			bindDeleteCld() {
				uni.request({
					url: this.constVal.baseURL + '/system/cld/' + this.cldDetail.id,
					data: {},
					method: 'DELETE',
					success: (res) => {
						this.cldUpdateOrInsertSuccess();
					}
				})
			}

		},
		onLoad() {
			this.currentCld = this.cldDetail;
			this.transDate();
		}
	}
</script>

<style>

</style>
