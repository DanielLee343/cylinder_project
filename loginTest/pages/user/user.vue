<template>
	<view class="content">
		<view class="btn-row">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<view v-if="hasLogin">
				<button type="default" @tap="bindLogout">退出登录</button>
				{{userId}}
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
		data() {
			return {
				userId: 0
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
		methods: {
			...mapMutations(['logout', 'cleanState']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				uni.removeStorageSync('roleId');
				uni.removeStorageSync('userId');
				uni.removeStorageSync('token');
				uni.removeStorageSync('userName');
				// uni.closeSocket();
				uni.onSocketClose(function(res) {
					console.log('WebSocket 已关闭！');
				});
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			}
		},
		onReady() {
			this.userId = uni.getStorageSync('userId');
		}
	}
</script>

<style>

</style>
