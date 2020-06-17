import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		userId: 0,
		cldDetail: {},
		valveNum: "",
		isEdit: true,
		curOrderLocation: "",
		lat: 0,
		lng: 0,
	},

	mutations: {
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
			uni.reLaunch({
				url: '../main/main',
			})
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		toCldOpt(state, userId) {
			state.userId = userId;
			uni.navigateTo({
				url: '../cldOpt/cldOpt',
			})
		},
		toCldDetail(state, currentCld) {
			state.cldDetail = currentCld;
			uni.redirectTo({
				url: './cldDetail',
			})
		},
		toValveDetail(state, valveNum) {
			state.valveNum = valveNum;
			uni.navigateTo({
				url: './valveDetail',
			})
		},
		toCldInsert(state, userId) {
			state.userId = userId;
			state.cldDetail = {};
			state.isEdit = false;
			uni.navigateTo({
				url: '../cldOpt/cldEdit',
			})
		},
		toEditCld(state) {
			state.isEdit = true;
			uni.redirectTo({
				url: './cldEdit',
			})
		},
		cldUpdateOrInsertSuccess(state) {
			state.cldDetail = {};
			uni.redirectTo({
				url: './cldOpt',
			})
		},
		valveDeleteSuccess(state) {
			state.valveDetail = {};
			uni.redirectTo({
				url: './valveOpt',
			})
		},
		toValveOpt(state, userId) {
			state.userId = userId;
			uni.navigateTo({
				url: '../valveOpt/valveOpt',
			})
		},
		//配送工查看当前订单
		toCurOrder(state, userId) {
			state.userId = userId;
			uni.navigateTo({
				url: '../orderOpt/curOrder',
			})
		},
		//配送工查看历史业绩
		toWLDelivery(state, userId) {
			// state.userId = userId;
			uni.navigateTo({
				url: '../orderOpt/wlDelivery',
			})
		},
		// 钢瓶回转
		toSendBack(state, userId) {
			state.userId = userId;
			uni.navigateTo({
				url: '../orderOpt/sendBack',
			})
		},
		//退出清除state缓存
		cleanState(state) {
			state.userId = undefined;
		},
		//看地图
		toOrderMap(state, curOrderLocation) {
			state.curOrderLocation = curOrderLocation;
			uni.navigateTo({
				url: './orderMap',
			})
		},
		changeLat(state, lat) {
			state.lat = lat;
			console.log(state.lat);
		},
		changeLng(state, lng) {
			state.lng = lng;
			console.log(state.lng);
		},
		//充装cld
		toRefillCld(state, userId) {
			state.userId = userId;
			uni.navigateTo({
				url: '../refillOpt/refillCld',
			})
		},
		// 录入工查看工作量
		toWlRefiller(state, userId) {
			state.userId = userId;
			uni.navigateTo({
				url: '../refillOpt/wlRefiller',
			})
		},
		// 入库
		toToStorage(state, userId) {
			state.userId = userId;
			uni.navigateTo({
				url: '../storage/toStorage',
			})
		},
		toWlStorage(state, userId) {
			state.userId = userId;
			uni.navigateTo({
				url: '../storage/wlStorage',
			})
		}
	}
})

export default store
