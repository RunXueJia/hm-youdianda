<template>
	<div>
		<van-list
			:error.sync="error"
			error-text="请求失败，点击重新加载"
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
		>
			<ArticleItem :item="item" v-for="item in list" :key="item.id"></ArticleItem>
		</van-list>
	</div>
</template>

<script>
	// import { getIndexApi, getHotApi,  } from "@/api/home";

	import ArticleItem from "@/views/components/articleItem.vue";
	import { getArtListApi } from "@/api/artiListApi";
	export default {
		name: "Atrlist",
		components: { ArticleItem },

		props: {
			url: {
				type: String,
			},
			params: {
				type: Object,
			},
		},
		data() {
			return {
				list: [],
				loading: false,
				finished: false,
				error: false,
			};
		},

		mounted() {},

		methods: {
			async onLoad() {
				try {
					this.params.page++;
					const { data } = await getArtListApi(this.url, this.params);
					const list = data.data.list.data;
					// console.log(list, "----------");
					this.list = [...this.list, ...list];
					this.loading = false;
					if (list.length < this.params.limit) this.finished = true;
					if (data.errno) this.error = true;
				} catch (error) {}
			},
		},
	};
</script>

<style lang="less" scoped>
</style>