import Vue from 'vue'
import App from './App'

import store from './store'
import {
	parseTime,
	getDate,
	checkAddCld,
	checkAddCldStampId,
	formatPolylines,
} from '@/common/utils'
import constVal from 'common/constVal'
import neilModal from '@/components/neil-modal/neil-modal'
import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
import uniFab from '@/components/uni-fab/uni-fab.vue'
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
import xfl_select from '@/components/xfl-select/xfl-select.vue'
import createSocket from 'common/websocket.js'
import sendWSPush from 'common/websocket.js'
import parser from "@/components/jyf-parser/jyf-parser"
import uniIndexedListItem from '@/components/uni-indexed-list/uni-indexed-list-item.vue'
import uniIndexedList from '@/components/uni-indexed-list/uni-indexed-list.vue'

Vue.config.productionTip = false

Vue.prototype.checkAddCld = checkAddCld
Vue.prototype.checkAddCldStampId = checkAddCldStampId
Vue.prototype.formatPolylines = formatPolylines
Vue.prototype.$store = store
Vue.prototype.parseTime = parseTime
Vue.prototype.getDate = getDate
Vue.prototype.constVal = constVal
Vue.prototype.neilModal = neilModal
Vue.prototype.uniDrawer = uniDrawer
Vue.prototype.uniSegmentedControl = uniSegmentedControl
Vue.prototype.uniFab = uniFab
Vue.prototype.uniSearchBar = uniSearchBar
Vue.prototype.xfl_select = xfl_select
Vue.prototype.createSocket = createSocket
Vue.prototype.sendWSPush = sendWSPush
Vue.prototype.parser = parser
Vue.prototype.uniIndexedListItem = uniIndexedListItem
Vue.prototype.uniIndexedList = uniIndexedList

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

app.$mount()
