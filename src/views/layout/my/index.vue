<template>
	<div id="my-spc">
		<!-- 头部 -->
		<van-nav-bar title="我的" @click-right="$router.push('/my/edit')">
			<template #right v-if="isLoad">
				<van-icon name="setting-o" />
			</template>
		</van-nav-bar>
		<!-- 信息展示 -->
		<div class="islogin" v-if="isLoad">
			<van-image round width="60px" height="60px" :src="user.icon | showImg" />
			<div class="note">
				<h1>{{user.username}}</h1>
				<span v-if="user.notes.length">{{user.notes}}</span>
			</div>
		</div>
		<div class="userInfo" v-else @click="$router.push('/login')">
			<div class="plogin">
				<van-image round width="60px" height="60px" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
				<div>
					<p class="onep">请登录</p>
					<p>登陆之后更精彩</p>
				</div>
			</div>
			<van-icon name="arrow" v-if="!isLoad" />
		</div>
		<!-- 收藏点赞等 -->
		<van-grid :column-num="3" clickable>
			<van-grid-item icon="like" text="收藏" @click="$router.push('/my/collect')" />
			<van-grid-item icon="thumb-circle" text="点赞" @click="$router.push('/my/like')" />
			<van-grid-item icon="ascending" text="文章" @click="$router.push('/my/articles')" />
		</van-grid>
		<!-- 我的 -->
		<van-cell title="我的文章" @click="$router.push('/my/articles')" icon="ascending" is-link />
		<van-cell title="我的点赞" icon="thumb-circle" @click="$router.push('/my/like')" is-link />
		<van-cell title="我的收藏" @click="$router.push('/my/collect')" icon="like" is-link />
		<div class="btn" v-if="isLoad">
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
				isLoad: false,
			};
		},

		mounted() {},

		methods: {
			...mapMutations(["quit"]),
			//获取用户信息
			async getUserInfo() {
				if (!this.token) return;
				try {
					const { data } = await getUserApi();
					// console.log(data);
					if (data.errno) {
						// this.$toast.fail("网络异常,请重新登录");
						return;
					}
					this.user = data.data.userInfo;
					this.isLoad = true;
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
						this.isLoad = false;
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
			.note {
				margin-left: 10px;
				h1 {
					color: #fff;
					font-weight: 700;
					font-size: 20px;
					margin-bottom: 5px;
					margin-top: 5px;
				}
				span {
					color: #fff;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
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