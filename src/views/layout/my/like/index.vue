<template>
	<div id="myArticles">
		<van-nav-bar fixed placeholder @click-left="$router.back()" left-arrow title="我的点赞"></van-nav-bar>
		<!-- 我的文章列表 -->
		<ArtList :isRight="isRight" :url="url" :params="params"></ArtList>
	</div>
</template>

<script>
	import ArtList from "@/views/components/artlist.vue";
	export default {
		name: "MyLike",
		components: {
			ArtList,
		},
		data() {
			return {
				list: [],
				params: {
					type: 2,
					page: 0,
					limit: 10,
				},
				url: "/home/user/userDataList",
				isRight: [
					//home/user/userDataHandle?type=2&article_id=54&action=del
					{
						btnName: "取消点赞",
						url: "/home/user/userDataHandle",
						params: {
							type: 2,
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