<template>
	<div id="classCountent">
		<van-nav-bar title="列表" fixed placeholder left-arrow @click-left="$router.go(-1)" />
		<!-- 标签 -->
		<van-tabs v-model="active" swipeable animated>
			<van-tab v-for="obj in allCateList" :key="obj.id" :title="obj.catename">
				<OneClassCountent :obj="obj"></OneClassCountent>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import { getIndexApi } from "@/api/home";
	import OneClassCountent from "./componetent/index.vue";
	export default {
		name: "classCountent",
		components: {
			OneClassCountent,
		},
		data() {
			return {
				allCateList: [],
				active: this.$route.query.index * 1,
			};
		},

		mounted() {},

		methods: {
			//获取分类列表
			async getClass() {
				const { data } = await getIndexApi();
				this.allCateList = data.data.allCate;
			},
		},
		created() {
			this.getClass();
		},
	};
</script>

<style lang="less" scoped>
	// #classCountent {
	// }
</style>