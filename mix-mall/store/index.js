import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		amount: 0,
		fee: 0,
		orderItemList: {},
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({
				key: 'userInfo',
				data: provider
			})
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			})
		},
		// 更改amount
		setOrderAmount(state, amount) {
			state.amount = amount;
			// console.log(state.amount);
		},
		// 更改fee
		setOrderFee(state, fee) {
			state.fee = fee;
			// console.log(state.fee);
		},
		// 更改orderItemList
		setOrderItemList(state, orderItemList) {
			state.orderItemList = orderItemList;
			// console.log(state.orderItemList);
			uni.navigateTo({
				url: '../order/createOrder',
			})
		},
	},
	actions: {

	}
})

export default store
