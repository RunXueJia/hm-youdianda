<template>
	<div id="classCountent">
		<van-nav-bar title="列表" fixed placeholder left-arrow @click-left="$router.go(-1)" />
		<!-- 标签 -->
		<van-tabs>
			<van-tab v-for="index in 8" :key="index" :title="'标签 ' + index"></van-tab>
		</van-tabs>
	</div>
</template>

<script>
	export default {
		name: "classCountent",

		data() {
			return {};
		},

		mounted() {},

		methods: {},
		created() {},
	};
</script>

<style lang="less" scoped>
	#classCountent {
	}
</style>