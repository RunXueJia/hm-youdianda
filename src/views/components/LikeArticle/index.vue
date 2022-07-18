<template>
	<van-loading v-if="isLoading" size="24" />
	<van-icon
		v-else
		@click="LikeArticleFn"
		:color="isLike ? '#000': '#777'"
		:name="isLike? 'good-job':'good-job-o'"
	/>
</template>

<script>
	import { LikeOrCollectArticleApi } from "@/api/articleinfo";
	export default {
		name: "LikeArticle",
		props: {
			isLike: {
				type: Boolean,
				required: true,
			},
			id: {
				type: [String, Number],
				required: true,
			},
		},
		data() {
			return {
				isLoading: false,
			};
		},

		mounted() {},

		methods: {
			async LikeArticleFn() {
				this.isLoading = true;
				try {
					const { data } = await LikeOrCollectArticleApi({
						type: 2,
						action: this.isLike ? "del" : "add",
						article_id: this.id,
					});
					if (data.errno) {
						// this.$toast.fail(this.isLike ? "取消点赞失败" : "点赞失败");
						this.isLoading = false;
						return;
					}

					this.$toast.success(this.isLike ? "取消点赞成功" : "点赞成功");
					this.$emit("update:isLike", !this.isLike);
				} catch (error) {}

				this.isLoading = false;
			},
		},
	};
</script>

<style lang="less" scoped>
</style>