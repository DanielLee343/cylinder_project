<template>
	<view class="content">
		<view class="uni-common-mt" v-if="isEdit">
			<view class="uni-form-item uni-column">
				<view class="inputTitle">钢印号:</view>
				<input class="uni-input" maxlength="4" focus v-model="cldDetail.stampId" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="inputTitle">所属气站：</view>
				<input class="uni-input disabledItem" :disabled="true" v-model="cldDetail.stationName" />
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="inputTitle">
						生产日期：
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="createDate" @change="bindCreateDateChange">
							<view class="uni-input">{{createDate}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="inputTitle">
						报废日期：
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="disposeDate" @change="bindDisposeDateChange">
							<view class="uni-input">{{disposeDate}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="inputTitle">初始重量(KG):</view>
				<input class="uni-input" type="number" v-model="cldDetail.initWeight" />
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="inputTitle">
						规格(KG):
					</view>
					<view class="uni-list-cell-db">
						<picker @change="bindSpecChange" :value="index" :range="specArray">
							<view class="uni-input" v-model="cldDetail.spec">{{specArray[index]}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="inputTitle">录入人：</view>
				<input class="uni-input disabledItem" :disabled="true" v-model="cldDetail.userName" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="inputTitle">备注：</view>
				<input class="uni-input" v-model="cldDetail.comment" />
			</view>
			<view class="btn-row">
				<button type="primary" class="primary" @tap="bindEditCldConfirm">确认提交</button>
			</view>
		</view>

		<view class="uni-common-mt" v-if="!isEdit">
			<view class="uni-form-item uni-column">
				<view class="inputTitle">钢印号:</view>
				<input class="uni-input" maxlength="4" focus v-model="cldDetail.stampId" />
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="inputTitle">
						生产日期：
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="createDate" @change="bindCreateDateChange">
							<view class="uni-input">{{createDate}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="inputTitle">
						报废日期：
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="disposeDate" @change="bindDisposeDateChange">
							<view class="uni-input">{{disposeDate}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="inputTitle">初始重量(KG):</view>
				<input class="uni-input" type="number" v-model="cldDetail.initWeight" />
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="inputTitle">
						规格(KG):
					</view>
					<view class="uni-list-cell-db">
						<picker @change="bindSpecChange" :value="index" :range="specArray">
							<view class="uni-input" v-model="cldDetail.spec">{{specArray[index]}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="inputTitle">备注：</view>
				<input class="uni-input" v-model="cldDetail.comment" />
			</view>
			<view class="btn-row">
				<button type="primary" class="primary" @tap="bindInsertCldConfirm">确认提交</button>
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
		components: {},
		computed: mapState(['cldDetail', 'isEdit', 'userId']),

		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				specArray: ['5', '10', '15'],
				index: 0,
				createDate: currentDate,
				disposeDate: currentDate,
			}
		},
		methods: {
			...mapMutations(['cldUpdateOrInsertSuccess']),
			initParams() {
				this.cldDetail.createDate = this.createDate;
				this.cldDetail.disposeDate = this.disposeDate;
				this.cldDetail.spec = this.specArray[0];
			},
			bindSpecChange(e) {
				this.index = e.target.value;
				this.cldDetail.spec = this.specArray[this.index];
			},
			bindCreateDateChange(e) {
				this.cldDetail.createDate = e.target.value;
			},
			bindDisposeDateChange(e) {
				this.cldDetail.disposeDate = e.target.value;
			},
			bindEditCldConfirm() {
				uni.request({
					url: this.constVal.baseURL + '/system/cld',
					data: {
						id: this.cldDetail.id,
						stampId: this.cldDetail.stampId,
						createDate: this.cldDetail.createDate,
						disposeDate: this.cldDetail.disposeDate,
						initWeight: this.cldDetail.initWeight,
						spec: this.cldDetail.spec,
						comment: this.cldDetail.comment,
					},
					method: 'PUT',
					success: (res) => {
						this.cldUpdateOrInsertSuccess();
					}
				})
			},
			bindInsertCldConfirm() {
				uni.request({
					url: this.constVal.baseURL + '/system/cld',
					data: {
						stampId: this.cldDetail.stampId,
						createDate: this.cldDetail.createDate,
						disposeDate: this.cldDetail.disposeDate,
						initWeight: this.cldDetail.initWeight,
						entryId: this.userId,
						spec: this.cldDetail.spec,
						comment: this.cldDetail.comment,
					},
					method: 'POST',
					success: (res) => {
						this.cldUpdateOrInsertSuccess();
					}
				})
			},
		},
		onLoad() {
			this.initParams();
		}
	}
</script>

<style>

</style>
