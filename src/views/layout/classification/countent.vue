<template>
	<div id="classCountent">
		<van-nav-bar title="列表" fixed placeholder left-arrow @click-left="$router.go(-1)" />
		<!-- 标签 -->
		<van-tabs border sticky v-model="active" swipeable animated>
			<van-tab v-for="obj in index.allCate" :key="obj.id" :title="obj.catename">
				<OneClassCountent :obj="obj"></OneClassCountent>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import OneClassCountent from "./componetent/index.vue";
	export default {
		name: "classCountent",
		computed: { ...mapState(["index"]) },
		components: {
			OneClassCountent,
		},
		data() {
			return {
				active: +this.$route.query.index,
			};
		},

		mounted() {},

		methods: {},
		created() {},
	};
</script>

<style lang="less" >
	#classCountent {
		.van-sticky {
			position: fixed;
			top: 45px;
			right: 0;
			left: 0;
			z-index: 99;
		}
		.van-list {
			padding-top: 48px;
		}
	}
</style>