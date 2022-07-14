<template>
	<div id="myArticles">
		<van-nav-bar @click-left="$router.back()" left-arrow title="我的"></van-nav-bar>
		<!-- 我的文章列表 -->
		<ArtList :url="url" :isMy="true" :params="params"></ArtList>
	</div>
</template>

<script>
	import ArtList from "@/views/components/artlist.vue";
	export default {
		name: "Articles",
		components: {
			ArtList,
		},
		data() {
			return {
				list: [],
				params: {
					page: 0,
					limit: 10,
				},
				url: "/home/user/myArticle",
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