<template>
	<view class="container" style="background-color: #eeeeee;">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box">
			<input class="ser-input" type="text" value="输入关键字搜索" disabled />
		</view>
		<!-- #endif -->

		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<view style="margin-left: 38rpx;">
				<text class="tit">今日特供</text>
			</view>
			<!-- 背景色区域 -->
			<view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view>
			<swiper class="carousel" circular @change="swiperChange">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToDetailPage({title: '轮播广告'})">
					<image :src="item.src" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>

		<!-- <view class="ad-1">
			<image src="/static/temp/test_ad1.jpg" mode="scaleToFill"></image>
		</view> -->

		<!-- 全部商品 -->
		<view class="f-header m-t">
			<view class="tit-box">
				<text class="tit" style="margin-bottom: 20rpx;">全部商品</text>
				<view v-if="!hasLogin" class="empty-tips">
					您未登录
					<view class="navigator" @click="navToLogin">去登陆></view>
				</view>
				<!-- <block v-for="(item, index) in cldList" :key="index">
					<view class="itemDetail">
						<img :src="item.image" style="height: 400rpx; " />
						<view class="itemDetailRight">
							<view style="font-size: 40rpx;">{{item.title}}</view>
							<view style="margin-top: 20rpx;">
								<view class="itemDetailFee">￥{{item.price}}</view>
								<view class="itemDetailNumberBox">
									<uni-number-box :value="item.cldAmount" :index="index" @change="numberChange($event, item.id)"
									 :disabled="!hasLogin"></uni-number-box>
								</view>
							</view>
						</view>
					</view>
				</block> -->
				<!-- 列表 -->
				<view class="cart-list">
					<block v-for="(item, index) in cldList" :key="item.id">
						<view class="cart-item" :class="{'b-b': index!==cldList.length-1}">
							<view class="image-wrapper">
								<img :src="item.image" style="width: 115px; height: 115px" :class="[item.loaded]" mode="aspectFill" lazy-load
								 @load="onImageLoad('cldList', index)"></img>
							</view>
							<view class="item-right">
								<text class="clamp title">{{item.title}}</text>
								<text class="price">¥{{item.price}}</text>
								<uni-number-box class="step" :value="item.cldAmount" :index="index" @change="numberChange($event, item.id)"
								 :disabled="!hasLogin"></uni-number-box>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>

		<!-- 底部菜单栏 -->
		<view class="action-section" v-if="isCreateOrder">
			<view class="checkbox">
				<view>已选中{{amount}}件商品</view>
			</view>
			<view class="total-box">
				<text class="price">¥{{fee}}</text>
			</view>
			<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
		</view>

	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				smallAmount: 0,
				cldList: [{
					id: 0,
					image: '../../static/cld_small.jpg',
					title: '5KG装',
					price: 30,
					cldAmount: 0,
					cldSpec: "5",
				}, {
					id: 1,
					image: '../../static/cld_medium.jpg',
					title: '10KG装',
					price: 50,
					cldAmount: 0,
					cldSpec: "10",
				}, {
					id: 2,
					image: '../../static/cld_large.jpg',
					title: '15KG装',
					price: 80,
					cldAmount: 0,
					cldSpec: "15",
				}],
				orderItemList: [],
				// 总价
				fee: 0,
				// 数量
				amount: 0,
				isCreateOrder: false,
			};
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			...mapMutations(['setOrderAmount', 'setOrderFee', 'setOrderItemList']),
			// 点击数量变化, number 数量，id 第几个
			numberChange(cldAmount, id) {
				this.orderItemList = [];
				this.cldList[id].cldAmount = parseInt(cldAmount);
				this.calcTotalFee();
			},
			navToLogin() {
				uni.navigateTo({
					url: '../public/login',
				})
			},
			// 计算总价,钢瓶个数
			calcTotalFee() {
				var totalFee = 0;
				var totalItem = 0;
				this.cldList.forEach(item => {
					var tempItemFee = item.cldAmount * item.price;
					totalFee = totalFee + tempItemFee;
					totalItem = parseInt(item.cldAmount) + totalItem;
				});
				this.cldList.forEach(item => {
					if (item.cldAmount != 0) {
						this.orderItemList.push(item);
					}
				});
				this.fee = totalFee;
				this.amount = totalItem;
				// this.amount != 0 ? this.isCreateOrder = true : this.isCreateOrder = false
				if (this.amount != 0) {
					this.isCreateOrder = true;
				} else {
					this.isCreateOrder = false;
				}
			},
			// 去订单页面
			createOrder() {
				this.setOrderItemList(this.orderItemList);
				this.setOrderAmount(this.amount);
				this.setOrderFee(this.fee);
				this.orderItemList = [];
			},
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			async loadData() {
				let carouselList = await this.$api.json('carouselList');
				this.titleNViewBackground = carouselList[0].background;
				this.swiperLength = carouselList.length;
				this.carouselList = carouselList;

				let goodsList = await this.$api.json('goodsList');
				this.goodsList = goodsList || [];
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].background;
			},
			//详情页
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.title;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			this.$api.msg('点击了搜索框');
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$api.msg('点击了扫描');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		}
		// #endif
	}
</script>

<style lang="scss">
	.empty-tips {
		display: flex;
		font-size: $font-sm+2upx;
		color: $font-color-disabled;

		.navigator {
			color: $uni-color-primary;
			margin-left: 16upx;
		}
	}

	.container {
		padding-bottom: 134rpx;
	}

	/* #ifdef MP */
	.mp-search-box {
		position: absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;

		.ser-input {
			flex: 1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color: $font-color-base;
			border-radius: 20px;
			background: rgba(255, 255, 255, .6);
		}
	}

	page {
		.cate-section {
			position: relative;
			z-index: 5;
			border-radius: 16upx 16upx 0 0;
			margin-top: -20upx;
		}

		.carousel-section {
			padding: 0;

			.titleNview-placing {
				padding-top: 35;
				height: 0;
			}

			.carousel {
				.carousel-item {
					padding: 0;
				}
			}

			.swiper-dots {
				left: 45upx;
				bottom: 40upx;
			}
		}
	}

	/* #endif */


	/* 购物车列表项 */
	.cart-item {
		display: flex;
		position: relative;
		padding: 30upx 40upx;

		.image-wrapper {
			width: 230upx;
			height: 230upx;
			flex-shrink: 0;
			position: relative;

			image {
				border-radius: 8upx;
			}
		}

		.checkbox {
			position: absolute;
			left: -16upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background: #fff;
			border-radius: 50px;
		}

		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position: relative;
			padding-left: 30upx;

			.title,
			.price {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}

			.attr {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}

			.price {
				height: 50upx;
				line-height: 50upx;
			}
		}

		.del-btn {
			padding: 4upx 10upx;
			font-size: 34upx;
			height: 50upx;
			color: $font-color-light;
		}
	}

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked {
		color: $uni-color-primary;
	}

	page {
		background: #f5f5f5;
	}

	.m-t {
		margin-top: 16upx;
	}

	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 10px;

		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			// width: 80%;
			height: 426upx;
			transition: .4s;
		}
	}

	.carousel {
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
		}

		image {
			width: 94%;
			height: 100%;
			border-radius: 10upx;
			box-shadow: -1px 2px 4px #8A8A8A; height: 170px;
			margin-left: 23rpx;
			margin-right: 10rpx;
		}
	}

	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}

	.ad-1 {
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.f-header {
		display: flex;
		border-radius: 7px;
		box-shadow: -1px 2px 4px #8A8A8A; 
		align-items: center;
		// height: 140upx;
		padding: 6upx 20upx 8upx;
		background: #FFFFFF;
		margin: 20rpx 26rpx auto 26rpx;

		image {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}

		.tit-box {
			flex: 1;
			display: flex;
			flex-direction: column;
		}

		.tit {
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}

		.tit2 {
			font-size: $font-sm;
			color: $font-color-light;
		}

		.icon-you {
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}


	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 100upx;
		/* #endif */
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.checkbox {
			height: 52upx;
			position: relative;

			image {
				width: 52upx;
				height: 100%;
				position: relative;
				z-index: 5;
			}
		}

		.clear-btn {
			position: absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius: 0 50px 50px 0;
			opacity: 0;
			transition: .2s;

			&.show {
				opacity: 1;
				width: 120upx;
			}
		}

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: right;
			padding-right: 40upx;

			.price {
				font-size: $font-lg;
				color: $font-color-dark;
			}

			.coupon {
				font-size: $font-sm;
				color: $font-color-light;

				text {
					color: $font-color-dark;
				}
			}
		}

		.confirm-btn {
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $uni-color-primary;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
	}
</style>
