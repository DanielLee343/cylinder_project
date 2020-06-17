<template>
	<view class="content">
		<view style="margin-bottom: 20px; ">
			<xfl-select :list="list" :clearable="true" :showItemNum="5" :listShow="false" :style_Container="'height: 40px; font-size: 16px;'"
			 :placeholder="'请选择查找类型'" @change="selectQueryType">
			</xfl-select>
		</view>
		<uni-search-bar placeholder="请输入钢印号" @confirm="getSearchCldList" @cancel="getCldList"></uni-search-bar>
		<view>
			<view v-if="searchAll" v-for="(item,index) in cldItems" :key="index" class="cldItem" @tap="bindCldDetail(item.id)">
				<view>钢印号：{{item.stampId}}</view>
				<view>所属气站：{{item.stationName}}</view>
				<view>初始重量：{{item.initWeight}}</view>
				<view>规格：{{item.spec}}</view>
				<view>录入人：{{item.userName}}</view>
			</view>

			<view v-if="!searchAll" v-for="(item,index) in cldItemsQuery" :key="index" class="cldItem" @tap="bindCldDetail(item.id)">
				<view>钢印号：{{item.stampId}}</view>
				<view>所属气站：{{item.stationName}}</view>
				<view>初始重量：{{item.initWeight}}</view>
				<view>规格：{{item.spec}}</view>
				<view>录入人：{{item.userName}}</view>
			</view>
		</view>


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
				//所有cld
				cldItems: [],
				//根据检索出来的cld
				cldItemsQuery: [],
				searchAll: true,
				queryParams: {
					stampId: undefined,
					comment: undefined,
					stationName: undefined,
				},
				searchType: undefined,
				currentCld: {},
				list: [ //要展示的数据
					'钢印号',
					'所属气站',
					'初始重量',
					'规格',
					'租金',
					'备注',
				],
			}
		},
		methods: {
			...mapMutations(['toCldDetail']),
			getCldList() {
				uni.request({
					url: this.constVal.baseURL + '/system/cld/list',
					data: {
						entryId: this.userId,
					},
					method: 'GET',
					success: (res) => {
						this.cldItems = res.data.rows;
						this.searchAll = true;
					}
				})
			},
			getCldListQuery(queryParams) {
				var currentSearchType = this.searchType;
				var _data = {
					entryId: this.userId
				};
				_data[currentSearchType] = queryParams;
				uni.request({
					url: this.constVal.baseURL + '/system/cld/list',
					data: _data,
					method: 'GET',
					success: (res) => {
						this.cldItemsQuery = res.data.rows;
						this.searchAll = false;
					}
				})
			},
			getSearchCldList(input) {
				this.getCldListQuery(input.value);
			},
			selectQueryType(input) {
				if (input.newVal === "钢印号") {
					this.searchType = 'stampId'
				} else if (input.newVal === "所属气站") {
					this.searchType = 'stationName'
				} else if (input.newVal === "初始重量") {
					this.searchType = 'initWeight'
				} else if (input.newVal === "规格") {
					this.searchType = 'spec'
				} else if (input.newVal === "租金") {
					this.searchType = 'price'
				} else if (input.newVal === "备注") {
					this.searchType = 'comment'
				}
			},
			bindCldDetail(id) {
				uni.request({
					url: this.constVal.baseURL + '/system/cld/' + id,
					data: {},
					method: 'GET',
					success: (res) => {
						this.currentCld = res.data.data;
						this.toCldDetail(this.currentCld);
					}
				})
			}
		},
		mounted() {

		},
		onLoad() {
			this.getCldList();
		},
	}
</script>

<style>

</style>
