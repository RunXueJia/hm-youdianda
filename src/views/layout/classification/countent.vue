<template>
	<div id="classCountent">
		<van-nav-bar title="列表" fixed placeholder left-arrow @click-left="$router.go(-1)" />
		<!-- 标签 -->
		<van-tabs v-model="active">
			<van-tab v-for="obj in allCateList" :key="obj.id" :title="obj.catename"></van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import { getIndexApi } from "@/api/home";

	export default {
		name: "classCountent",

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
				// console.log(data.data.allCate);
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