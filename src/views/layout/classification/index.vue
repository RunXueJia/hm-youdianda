<template>
	<div id="classification">
		<van-nav-bar title="分类" fixed placeholder />
		<van-grid :column-num="2" clickable>
			<van-grid-item @click="go(obj)" v-for="obj in index.allCate" :key="obj.id" :text="obj.catename">
				<template #icon>
					<i class="fa" :class="obj.icon "></i>
				</template>
			</van-grid-item>
		</van-grid>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		name: "classification",

		data() {
			return {};
		},
		computed: { ...mapState(["index"]) },
		mounted() {},
		created() {},
		methods: {
			//跳转
			go(obj) {
				// console.log(obj);
				this.$router.push({
					path: "/classCountent",
					query: {
						cateid: obj.id,
						index: this.index.allCate.findIndex((item) => item.id === obj.id),
					},
				});
			},
		},
	};
</script>

<style lang="less" >
	#classification {
		.van-nav-bar {
			background-color: pink;
			.van-nav-bar__title {
				color: #fff;
			}
		}
		.fa {
			margin-bottom: 8px;
			font-size: 20px;
		}
	}
</style>