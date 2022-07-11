<template>
	<div>
		<ArtList :url="url" :params="params"></ArtList>
	</div>
</template>

<script>
	import ArtList from "@/views/components/artlist.vue";
	export default {
		name: "articleList",
		props: {
			obj: {
				type: Object,
				require: true,
			},
		},
		components: { ArtList },
		data() {
			return {
				params: {
					page: 0,
					limit: 10,
					cateid: this.obj.id,
				},
				url: "/home/index/list",
			};
		},

		mounted() {},

		methods: {},
	};
</script>

<style lang="less" scoped>
</style>