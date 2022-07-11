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
					<van-image height="90px" :src="obj.pic | showImg" />
					<span style="font-size :12px">{{obj.title}}</span>
				</template>
			</van-grid-item>
		</van-grid>
		<!-- 最新发布标题 -->
		<van-cell-group>
			<van-cell title="热门推荐" :title-style="'color: #1989fa;font-weight: 700'" />
		</van-cell-group>
		<Artlist :url="'/home/index/new'" :params="params"></Artlist>
	</div>
</template>

<script>
	import { getIndexApi, getHotApi } from "@/api/home";
	import Artlist from "@/views/components/artlist.vue";
	export default {
		name: "Index",
		components: { Artlist },
		data() {
			return {
				index: {},
				hotList: [],
				params: {
					page: 0,
					limit: 10,
				},
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
				return url ? "http://124.223.14.236:8060/" + url : null;
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
	}
</style>