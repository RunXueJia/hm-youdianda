<template>
	<div id="home-spc">
		<van-nav-bar title="首页" fixed placeholder />
		<!-- 轮播图 -->
		<van-swipe :autoplay="3000" :indicator-color="'#fff'">
			<van-swipe-item v-for="image in index.banner" :key="image.id">
				<img style="display: block" width="100%" height="170px" v-lazy="showImg(image.advimgsrc)" />
			</van-swipe-item>
		</van-swipe>
		<!-- 最新公告 -->
		<van-notice-bar left-icon="volume-o" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
		<!-- 热门推荐标题 -->
		<van-cell-group>
			<van-cell title="热门推荐" :title-style="'color: #1989fa;font-weight: 700'" />
		</van-cell-group>
		<!-- 热门推荐内容 -->
		<van-grid :column-num="3">
			<van-grid-item v-for="obj in hotList" :key="obj.id">
				<template #default>
					<img width="100%" height="90px" :src="showImg(obj.pic)" alt />
					<span style="font-size :12px">{{obj.title}}</span>
				</template>
			</van-grid-item>
		</van-grid>
		<!-- 最新发布标题 -->
		<van-cell-group>
			<van-cell title="热门推荐" :title-style="'color: #1989fa;font-weight: 700'" />
		</van-cell-group>
		<!-- 最新发布 -->
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<van-cell v-for="item in newlist" :label="item.description" :key="item.id" :title="item.title">
				<template #default>
					<van-image show-error height="100px" fit="contain" :src="showImg(item.pic)" />
				</template>
			</van-cell>
		</van-list>
	</div>
</template>

<script>
	import { getIndexApi, getHotApi, getNewApi } from "@/api/home";
	export default {
		name: "Index",

		data() {
			return {
				index: {},
				hotList: [],
				newlist: [],
				loading: false,
				finished: false,
				page: 0,
				limit: 10,
			};
		},

		mounted() {},

		methods: {
			//轮播图
			async init() {
				const { data } = await getIndexApi();
				// console.log(data);
				if (data.errno) return this.$toast.fail("网络异常");
				this.index = data.data;
			},
			//获取热门推荐
			async getHot() {
				const { data } = await getHotApi();
				if (data.errno) return this.$toast.fail("网络异常");
				this.hotList = data.data.list;
			},
			//图片拼接
			showImg(url) {
				return "http://124.223.14.236:8060/" + url;
			},
			//最新发布
			async onLoad() {
				this.page++;
				const { data } = await getNewApi({
					page: this.page,
					limit: this.limit,
				});
				const list = data.data.list.data;
				console.log(list, "----------");
				this.newlist = [...this.newlist, ...list];
				this.loading = false;
				if (list.length < this.limit) this.finished = true;
			},
		},
		created() {
			this.init();
			this.getHot();
		},
	};
</script>

<style lang="less" >
	#home-spc {
		padding-bottom: 50px;
		.van-nav-bar {
			background-color: pink;
			.van-nav-bar__title {
				color: #fff;
			}
		}
		.van-notice-bar {
			height: 40px;
		}
		.van-image__error {
			top: 0;
			left: -80px;
			transform: translate(50 50);
		}
	}
</style>