<template>
	<div id="home-spc">
		<van-nav-bar title="首页" fixed placeholder />
		<!-- 轮播图 -->
		<van-swipe :autoplay="2000" :indicator-color="'#fff'">
			<van-swipe-item v-for="image in index.banner" :key="image.id">
				<img style="display: block" width="100%" height="170px" :src="image.advimgsrc | showImg " />
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
			<GridItem :obj="obj" v-for="obj in hotList" :key="obj.id"></GridItem>
		</van-grid>
		<!-- 最新发布标题 -->
		<van-cell-group>
			<van-cell title="最新发布" :title-style="'color: #1989fa;font-weight: 700'" />
		</van-cell-group>
		<Artlist :url="'/home/index/new'" :params="params"></Artlist>
	</div>
</template>

<script>
	import { getHotApi } from "@/api/home";
	import Artlist from "@/views/components/artlist.vue";
	import { mapState } from "vuex";
	export default {
		name: "Index",
		components: { Artlist },
		data() {
			return {
				hotList: [],
				params: {
					page: 0,
					limit: 10,
				},
			};
		},
		computed: { ...mapState(["index"]) },
		mounted() {},

		methods: {
			//获取热门推荐
			async getHot() {
				const { data } = await getHotApi();
				if (data.errno) return this.$toast.fail("网络异常");
				this.hotList = data.data.list;
			},
		},
		created() {
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