<template>
	<div id="ArticleInfo">
		<van-nav-bar
			right-text="返回首页"
			@click-left="$router.back()"
			left-arrow
			title="文章"
			fixed
			placeholder
			@click-right="$router.push('/home')"
		/>
		<!-- 加载中 -->
		<div v-if="LoadingStatus===1" class="loading-wrap">
			<van-loading color="#3296fa" vertical>加载中</van-loading>
		</div>
		<!-- /加载中 -->
		<!-- 文章详情 -->
		<div v-if="LoadingStatus ===2">
			<h1 class="title">{{ ArticleData.info.title}}</h1>
			<!-- 用户信息 -->
			<van-cell class="user-info" center :border="false">
				<van-image class="avatar" slot="icon" round fit="cover" :src="ArticleData.info.pic | showImg" />
				<div slot="title" class="user-name">{{ArticleData.info.author}}</div>
				<div slot="label" class="publish-date">{{ArticleData.info.create_date | getrelativeTime}}</div>
			</van-cell>
			<!-- /用户信息 -->
			<div
				ref="content"
				style="width:100%"
				class="ArticleContent markdown-body"
				v-html="ArticleData.info.content"
			></div>
			<!-- 分割线 -->
			<van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">正文结束</van-divider>
			<!-- 上一篇   下一篇 -->
			<van-cell>
				<template #default>
					<router-link
						v-if="ArticleData.next.length"
						class="link"
						:to="'/articleinfo/'+ArticleData.next[0].id"
					>下一篇</router-link>
				</template>
				<template #title>
					<router-link
						v-if="ArticleData.prev.length"
						class="link"
						:to="'/articleinfo/'+ArticleData.prev[0].id"
					>上一篇</router-link>
				</template>
			</van-cell>
			<!-- 相关推荐 -->
			<van-grid :column-num="2">
				<GridItem v-for="obj in ArticleData.recommend" :key="obj.id" :obj="obj"></GridItem>
			</van-grid>
			<!-- 底部区域 -->
			<div class="article-bottom">
				<CollectArticle v-model="ArticleData.info.isCollect" :id="ArticleData.info.id"></CollectArticle>

				<LikeArticle :isLike.sync="ArticleData.info.isLike" :id="ArticleData.info.id"></LikeArticle>
				<van-icon @click="showShare=true" name="share" color="#777777"></van-icon>
			</div>
			<!-- /底部区域 -->
		</div>

		<!-- 加载失败：404 -->
		<div v-if="LoadingStatus ===3" class="error-wrap">
			<van-icon name="failure" />
			<p class="text">该资源不存在或已删除！</p>
		</div>
		<!-- /加载失败：404 -->

		<!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
		<div v-if="LoadingStatus ===4" class="error-wrap">
			<van-icon name="failure" />
			<p class="text">内容加载失败！</p>
			<van-button @click="reTest" class="retry-btn">点击重试</van-button>
		</div>
		<!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
		<!-- 分享组件 -->

		<van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
	</div>
</template>

<script>
	import { ImagePreview } from "vant";
	import { getArticleInfoApi } from "@/api/reslease";
	export default {
		name: "ArticleInfo",

		data() {
			return {
				ArticleData: {},
				LoadingStatus: 1,
				showShare: false,
				options: [
					{ name: "微信", icon: "wechat" },
					{ name: "微博", icon: "weibo" },
					{ name: "复制链接", icon: "link" },
					{ name: "分享海报", icon: "poster" },
					{ name: "二维码", icon: "qrcode" },
				],
			};
		},
		watch: {
			$route: {
				deep: true,
				immediate: true,
				handler(val) {
					// console.log(val);
					this.getArticleInfoFn();
				},
			},
		},
		mounted() {},
		created() {},
		methods: {
			async getArticleInfoFn() {
				this.LoadingStatus = 1;
				const { data } = await getArticleInfoApi(this.$route.params.id);
				// console.log(data);
				this.ArticleData = data.data;
				this.LoadingStatus = 2;
				this.$nextTick(() => {
					const imgs = [...this.$refs.content.querySelectorAll("img")];
					const imgSrcs = imgs.map((img) => img.src);
					imgs.forEach((img, index) => {
						img.onclick = function () {
							ImagePreview({
								images: imgSrcs,
								startPosition: index,
							});
						};
					});
					if (this.$refs.content.querySelector("h2"))
						this.$refs.content.querySelector("h2").style = "display:none";
				});

				//报错出现
				if (data.errno) {
					this.LoadingStatus = 4;
				}
			},
			//点击重试
			reTest() {
				this.getArticleInfoFn();
			},
			//分享点击
			onSelect(option) {
				this.$toast(option.name);
				this.showShare = false;
			},
		},
	};
</script>

<style lang="less">
	@import url("@/style/github-markdown.css");
	#ArticleInfo {
		padding-bottom: 44px;
		* {
			text-indent: 0 !important;
		}
		.link {
			color: rgb(25, 137, 250);
		}
		.user-info {
			margin-bottom: 10px;
			padding: 0 16px;
			.avatar {
				width: 35px;
				height: 35px;
				margin-right: 8px;
			}
			.van-cell__label {
				margin-top: 0;
			}
			.user-name {
				font-size: 12px;
				color: #3a3a3a;
			}
			.publish-date {
				font-size: 11px;
				color: #b7b7b7;
			}
			.follow-btn {
				width: 85px;
				height: 29px;
			}
		}
		.title {
			margin: 10px 0;
			font-size: 20px;
		}
		.van-nav-bar {
			background-color: pink;
			.van-nav-bar__title {
				color: #fff;
			}
			.van-icon {
				color: #fff;
			}
			.van-nav-bar__text {
				color: #fff;
			}
		}
		.loading-wrap {
			padding: 150px 16px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #fff;
		}
		.article-bottom {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-sizing: border-box;
			height: 44px;
			border-top: 1px solid #d8d8d8;
			background-color: #fff;
			.comment-btn {
				width: 141px;
				height: 23px;
				border: 1px solid #eeeeee;
				font-size: 15px;
				line-height: 23px;
				color: #a7a7a7;
			}
			.van-icon {
				font-size: 20px;
				.van-info {
					font-size: 8px;
					background-color: #e22829;
				}
			}
		}
		.error-wrap {
			padding: 100px 16px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-color: #fff;
			.van-icon {
				font-size: 61px;
				color: #b4b4b4;
			}
			.text {
				font-size: 15px;
				color: #666666;
				margin: 16px 0 23px;
			}
			.retry-btn {
				width: 140px;
				height: 35px;
				line-height: 35px;
				border: 1px solid #c3c3c3;
				font-size: 15px;
				color: #666666;
			}
		}
	}
</style>