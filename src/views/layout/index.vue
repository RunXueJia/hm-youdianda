<template>
	<div>
		<!-- <h1>layout</h1> -->
		<router-view></router-view>
		<van-tabbar route>
			<van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
			<van-tabbar-item replace to="/my" icon="manager-o">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default {
		name: "Index",

		data() {
			return {};
		},

		mounted() {},

		methods: {},
	};
</script>

<style lang="less" scoped>
	/deep/ .van-tabbar-item--active {
		color: pink;
	}
</style>