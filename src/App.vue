<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from "vuex";
	import { getUserApi } from "@/api/my";
	import { getIndexApi } from "@/api/home";
	export default {
		name: "App",
		computed: {
			...mapGetters(["token"]),
		},
		data() {
			return {};
		},

		mounted() {},
		created() {
			if (this.token) this.testToken();
			this.getindex();
		},
		methods: {
			...mapMutations(["quit", "setIndex"]),
			async testToken() {
				const { data } = await getUserApi();
				// console.log(data);
				if (data.errno) {
					this.quit();
					this.$toast.fail("登录已过期");
				}
			},
			async getindex() {
				const { data } = await getIndexApi();
				this.setIndex(data.data);
			},
		},
	};
</script>

<style lang="less" scoped>
</style>
