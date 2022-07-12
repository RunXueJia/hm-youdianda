<template>
	<div id="my-spc">
		<!-- 头部 -->
		<van-nav-bar title="我的" @click-right="onClickRight">
			<template #right v-if="token">
				<van-icon name="setting-o" />
			</template>
		</van-nav-bar>
		<!-- 信息展示 -->
		<div class="islogin" v-if="token">
			<van-image round width="60px" height="60px" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
			<h1>{{user.username}}</h1>
		</div>
		<div class="userInfo" v-else @click="$router.push('/login')">
			<div class="plogin">
				<van-image round width="60px" height="60px" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
				<div>
					<p class="onep">请登录</p>
					<p>登陆之后更精彩</p>
				</div>
			</div>
			<van-icon name="arrow" v-if="!token" />
		</div>
		<!-- 收藏点赞等 -->
		<van-grid :column-num="3" clickable>
			<van-grid-item icon="like" text="收藏" @click="$router.push('/my/collect')" />
			<van-grid-item icon="thumb-circle" text="点赞" @click="$router.push('/my/like')" />
			<van-grid-item icon="ascending" text="文章" @click="$router.push('/my/articles')" />
		</van-grid>
		<!-- 我的 -->
		<van-cell title="我的文章" icon="ascending" is-link />
		<van-cell title="我的点赞" icon="thumb-circle" is-link />
		<van-cell title="我的收藏" icon="like" is-link />
		<div class="btn" v-if="token">
			<van-button @click="quitFn" type="info">立即退出</van-button>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from "vuex";
	import { getUserApi } from "@/api/my";
	export default {
		name: "Index",
		computed: {
			...mapGetters(["token"]),
		},
		data() {
			return {
				user: {},
			};
		},

		mounted() {},

		methods: {
			...mapMutations(["quit"]),
			onClickRight() {},
			//获取用户信息
			async getUserInfo() {
				try {
					const { data } = await getUserApi();
					// console.log(data);
					if (data.errno) {
						this.$toast.fail("网络异常,请重新登录");
						this.quit();
						return;
					}
					this.user = data.data.userInfo;
				} catch (error) {}
			},
			//退出
			quitFn() {
				this.$dialog
					.confirm({
						title: "退出",
						message: "确认退出吗",
					})
					.then(() => {
						// on confirm
						this.quit();
					})
					.catch(() => {
						// on cancel
					});
			},
		},
		created() {
			if (this.token) return this.getUserInfo();
		},
	};
</script>

<style lang="less" >
	#my-spc {
		.van-nav-bar {
			background-color: skyblue;
			.van-icon {
				color: #fff;
			}
			.van-nav-bar__title {
				color: #fff;
			}
		}
		.islogin {
			display: flex;
			align-items: center;
			width: 375px;
			height: 120px;
			background-color: skyblue;
			padding: 30px 16px;
			h1 {
				margin-left: 10px;
				color: #fff;
				font-weight: 700;
				font-size: 20px;
			}
		}
		.userInfo {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 375px;
			height: 120px;
			background-color: skyblue;
			padding: 30px 16px;
		}
		.van-grid-item__text {
			margin-top: 0;
		}
		.btn {
			padding: 0 10px;
			.van-button--normal {
				width: 100%;
			}
		}
		.van-icon-arrow:before {
			color: #fff;
		}
		.plogin {
			display: flex;
			align-items: center;
			margin-left: 10px;
			p {
				// padding: 0;
				margin: 0;
				margin-left: 10px;
				color: #fff;
			}
			.onep {
				font-weight: 900;
			}
		}
	}
</style>