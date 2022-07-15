<template>
	<van-grid-item @click="goArticleInfo(obj.id)">
		<template #default>
			<van-image height="90px" :src="obj.pic | showImg" />
			<span class="HotTitle" style="font-size :12px">{{obj.title}}</span>
		</template>
	</van-grid-item>
</template>

<script>
	export default {
		name: "GridItem",

		data() {
			return {};
		},
		props: {
			obj: {
				type: Object,
				required: true,
			},
		},
		mounted() {},

		methods: {
			//热门推荐去文章详情
			goArticleInfo(id) {
				this.$router.push({
					path: "/articleinfo",
					query: {
						id,
					},
				});
			},
		},
	};
</script>

<style lang="less" scoped>
	.HotTitle {
		display: -webkit-box;
		width: 100px;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		text-align: center;
	}
</style>