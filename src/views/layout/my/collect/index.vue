<template>
	<div id="myArticles">
		<van-nav-bar fixed placeholder @click-left="$router.back()" left-arrow title="我的收藏"></van-nav-bar>
		<!-- 我的文章列表 -->
		<ArtList :url="url" :isRight="isRight" :params="params"></ArtList>
	</div>
</template>

<script>
	import ArtList from "@/views/components/artlist.vue";
	export default {
		name: "collect",
		components: {
			ArtList,
		},
		data() {
			return {
				list: [],
				params: {
					type: 1,
					page: 0,
					limit: 10,
				},
				url: "/home/user/userDataList",
				isRight: [
					//home/user/userDataHandle?type=2&article_id=54&action=del
					{
						btnName: "取消收藏",
						url: "/home/user/userDataHandle",
						params: {
							type: 1,
							action: "del",
						},
						type: "primary",
					},
				],
			};
		},

		mounted() {},

		methods: {},
	};
</script>

<style lang="less" scoped>
	#myArticles {
		/deep/.van-nav-bar {
			background-color: pink;
			.van-icon {
				color: #fff;
			}
			.van-nav-bar__title {
				color: #fff;
			}
		}
	}
</style>