<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch');
		},
		onShow: function() {
			// console.log('App Show');
		},
		onHide: function() {
			// console.log('App Hide');
		}
	}
</script>

<style>
	/* 头条小程序需要把 iconfont 样式放到组件外 */
	@import "components/m-icon/m-icon.css";

	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
		font-size: 16px;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		/* min-height: 100%; */
		display: flex;
		flex: 1;
	}

	.innerItem {
		margin-bottom: 10rpx;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #d0f1f1;
		padding: 10px;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 20px;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 18px;
		line-height: 40px;
	}

	.input-row .title {
		width: 72px;
		padding-left: 15px;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 25px;
		padding: 10px;
	}

	button.primary {
		background-color: #0faeff;
	}

	button {
		margin: 20rpx 10rpx 20rpx 10rpx;
	}


	.worklaodItem,
	.cldItem,
	.valveItem {
		background-color: #FFFFFF;
		margin-top: 20rpx;
	}

	.orderItem {
		background-color: #FFFFFF;
		margin-top: 20rpx;
		/* height: 420rpx; */
		width: 100%;
	}

	.orderDetail {
		background-color: #f1f1f1;
		margin-top: 30rpx;
	}

	.drawerTitle {
		font-family: Arial, Helvetica, sans-serif;
		text-align: center;
	}

	.uni-common-mt {
		margin: 10rpx 10rpx 10rpx 10rpx;
	}

	.uni-input {
		margin: 10rpx;
		background-color: #FFFFFF;
		height: 75rpx;
	}

	.inputTitle {
		margin: 10rpx;
	}

	.disabledItem {
		background-color: #e6e6e6;
	}

	.fab {
		position: fixed;
		bottom: 140rpx;
	}

	.sendBackBar {
		height: 50rpx;
		background-color: #a9e4ff;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.sendBackItem {
		height: 50rpx;
		padding: 5rpx 0 5rpx 0;
		margin-bottom: 20rpx;
		border: 1rpx solid #FFFFFF;
		border-radius: 10rpx;
		background-color: #fffae0;
		width: 100%;
		display: flex;
		box-shadow: -1px 5px 4px #8A8A8A;
		/* justify-content: center; */
	}

	.sendBackBarProp {
		margin-left: 85rpx;
	}

	.equallyDistribute {
		display: -webkit-flex;
		display: flex;
		justify-content: space-around;
	}

	.equallyDistribute .innerItem {
		text-align: center;
	}

	.equallyDistribute .innerItem .innerImg {
		width: 30px;
		height: 30px;
	}
</style>
