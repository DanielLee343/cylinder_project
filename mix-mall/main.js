import Vue from 'vue'
import store from './store'
import App from './App'

import Json from './Json'
import {
	parseTime,
	getDate,
	formatPolylines,
} from '@/common/utils'
import constVal from '@/common/constVal'
import uniNumberBox from '@/components/uni-number-box.vue'

const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type => {
	//模拟异步请求数据
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}


Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {
	msg,
	json,
	prePage
};

Vue.prototype.parseTime = parseTime;
Vue.prototype.getDate = getDate;
Vue.prototype.formatPolylines = formatPolylines;
Vue.prototype.constVal = constVal;
Vue.prototype.uniNumberBox = uniNumberBox;

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
