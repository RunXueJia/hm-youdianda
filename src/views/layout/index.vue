<template>
	<div>
		<!-- <h1>layout</h1> -->
		<router-view></router-view>
		<van-tabbar route>
			<van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
			<van-tabbar-item replace to="/classification" icon="apps-o">分类</van-tabbar-item>
			<van-tabbar-item replace to="/release" icon="edit">发布</van-tabbar-item>
			<van-tabbar-item replace to="/my" icon="manager-o">{{token ? '我的':'未登录'}}</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "LayOut",
		computed: {
			...mapGetters(["token"]),
		},
		data() {
			return {};
		},

		mounted() {},
		created() {},
		methods: {},
	};
</script>

<style lang="less" scoped>
	/deep/ .van-tabbar-item--active {
		color: pink;
	}
</style>