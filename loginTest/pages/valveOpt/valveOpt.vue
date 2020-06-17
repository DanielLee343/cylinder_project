<template>
	<view class="content">
		<view style="margin-bottom: 20px;">
			<xfl-select :list="list" :clearable="true" :showItemNum="5" :listShow="false" :style_Container="'height: 50px; font-size: 16px;'"
			 :placeholder="'请选择查找类型'" :selectHideType="'independent'" @change="selectQueryType">
			</xfl-select>
		</view>
		<uni-search-bar placeholder="请输入检索内容" @confirm="getSearchValveList" @cancel="getValveList"></uni-search-bar>
		<view>
			<view v-if="searchAll" v-for="(item,index) in valveItems" :key="index" class="valveItem" @click="bindValveDetail(item.valveId)">
				<view>气阀编号：{{item.valveNum}}</view>
				<view>钢印号：{{item.stampId}}</view>
				<view>出厂公司：{{item.prodCmp}}</view>
				<view>录入人：{{item.userName}}</view>
			</view>

			<view v-if="!searchAll" v-for="(item,index) in valveItemsQuery" :key="index" class="valveItem" @click="bindValveDetail(item.valveId)">
				<view>气阀编号：{{item.valveNum}}</view>
				<view>钢印号：{{item.stampId}}</view>
				<view>出厂公司：{{item.prodCmp}}</view>
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
	import uniSearchBar from '../../components/uni-search-bar/uni-search-bar.vue'
	import xfl_select from '../../components/xfl-select/xfl-select.vue'
	export default {
		components: {
			uniSearchBar,
			xfl_select,
		},
		computed: mapState(['userId']),
		data() {
			return {
				//所有valve
				valveItems: [],
				//根据检索出来的valve
				valveItemsQuery: [],
				searchAll: true,
				queryParams: {
					valveNum: undefined,
					stationName: undefined,
					prodCmp: undefined,
				},
				searchType: undefined,
				// curValveNum: "",
				list: [ //要展示的数据
					'气阀编号',
					'钢印号',
					'出厂公司',
				],
			}
		},
		methods: {
			...mapMutations(['toValveDetail']),
			getValveList() {
				uni.request({
					url: this.constVal.baseURL + '/system/valve/list',
					data: {
						entryId: this.userId,
					},
					method: 'GET',
					success: (res) => {
						this.valveItems = res.data.rows;
						this.searchAll = true;
					}
				})
			},
			getValveListQuery(queryParams) {
				var currentSearchType = this.searchType;
				var _data = {
					entryId: this.userId
				};
				_data[currentSearchType] = queryParams;
				uni.request({
					url: this.constVal.baseURL + '/system/valve/list',
					data: _data,
					method: 'GET',
					success: (res) => {
						this.valveItemsQuery = res.data.rows;
						this.searchAll = false;
					}
				})
			},
			getSearchValveList(input) {
				this.getValveListQuery(input.value);
			},
			selectQueryType(input) {
				if (input.newVal === "气阀编号") {
					this.searchType = 'valveNum'
				} else if (input.newVal === "钢印号") {
					this.searchType = 'stampId'
				} else if (input.newVal === "出厂公司") {
					this.searchType = 'prodCmp'
				}
			},
			bindValveDetail(valveId) {
				uni.request({
					url: this.constVal.baseURL + '/system/valve/' + valveId,
					data: {},
					method: 'GET',
					success: (res) => {
						this.toValveDetail(res.data.data.valveNum);
					}
				})
			}
		},
		mounted() {

		},
		onLoad() {
			this.getValveList();
		}
	}
</script>

<style>

</style>
