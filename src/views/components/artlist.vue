<template>
	<van-list
		:error.sync="error"
		error-text="请求失败，点击重新加载"
		v-model="loading"
		:finished="finished"
		finished-text="没有更多了"
		@load="onLoad"
	>
		<ArticleItem :item="item" v-for="item in list" :key="item.id">
			<template #rightBtn v-if="isRight">
				<van-button
					v-for="(btn ,index) in isRight"
					:key="index"
					style="height:100%;"
					square
					:type="btn.type"
					:text="btn.btnName"
					@click="action(btn,item)"
				/>
			</template>
		</ArticleItem>
	</van-list>
</template>

<script>
	// import { getIndexApi, getHotApi,  } from "@/api/home";

	import ArticleItem from "@/views/components/articleItem.vue";
	import { getArtListApi, BtnActionApi } from "@/api/artiListApi";
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
			isMy: {
				type: Boolean,
			},
			isRight: {
				type: Array,
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
					let list = [];
					if (this.isMy) {
						list = data.data.data;
					} else {
						list = data.data.list.data;
					}
					// console.log(data.data.list.data, "----------");
					this.list = [...this.list, ...list];
					this.loading = false;
					if (list.length < this.params.limit) this.finished = true;
					if (data.errno) this.error = true;
				} catch (error) {}
			},
			//右侧按钮功能
			async action(btn, item) {
				try {
					if (btn.btnName === "修改") return this.EditArticle(item);
					// console.log("123");
					if (this.isMy) {
						//删除我的文章
						await BtnActionApi(btn.url, {
							id: item.id,
						});
					} else {
						//取消点赞/收藏
						await BtnActionApi(btn.url, {
							...btn.params,
							article_id: item.id,
						});
					}
					// 页面重新加载
					this.list = [];
					this.params.page = 0;
					this.finished = false;
				} catch (error) {}
			},
			//修改我的文章
			EditArticle(item) {
				this.$router.push({
					path: "/release",
					query: {
						id: item.id,
					},
				});
			},
		},
	};
</script>

<style lang="less" scoped>
</style>