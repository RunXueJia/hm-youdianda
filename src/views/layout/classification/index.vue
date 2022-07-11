<template>
	<div id="classification">
		<van-nav-bar title="分类" fixed placeholder />
		<van-grid :column-num="2" clickable>
			<van-grid-item
				@click="go(obj)"
				v-for="obj in allCateList"
				:key="obj.id"
				icon="smile"
				:text="obj.catename"
			/>
		</van-grid>
	</div>
</template>

<script>
	import { getIndexApi } from "@/api/home";
	export default {
		name: "classification",

		data() {
			return {
				allCateList: [],
			};
		},

		mounted() {},
		created() {
			this.getClass();
		},
		methods: {
			//获取分类列表
			async getClass() {
				const { data } = await getIndexApi();
				// console.log(data.data.allCate);
				this.allCateList = data.data.allCate;
			},
			//跳转
			go(obj) {
				// console.log(obj);
				this.$router.push({
					path: "/classCountent",
					query: {
						cateid: obj.id,
						index: this.allCateList.findIndex((item) => item.id === obj.id),
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
	}
</style>