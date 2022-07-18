<template>
	<van-loading v-if="isLoading" size="24" />
	<van-icon
		v-else
		@click="CollectArticleFn"
		:color="value ? '#000': '#777'"
		:name="value? 'star':'star-o'"
	/>
</template>

<script>
	import { LikeOrCollectArticleApi } from "@/api/articleinfo";
	export default {
		name: "CollectArticlex",
		props: {
			value: {
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
			async CollectArticleFn() {
				this.isLoading = true;
				try {
					const { data } = await LikeOrCollectArticleApi({
						type: 1,
						action: this.value ? "del" : "add",
						article_id: this.id,
					});
					if (data.errno) {
						// this$toast.fail(this.value ? "取消收藏失败" : "收藏失败");
						this.isLoading = false;
						return;
					}

					this.$toast.success(this.value ? "取消收藏成功" : "收藏成功");
					this.$emit("input", !this.value);
				} catch (error) {}

				this.isLoading = false;
			},
		},
	};
</script>

<style lang="less" scoped>
</style>