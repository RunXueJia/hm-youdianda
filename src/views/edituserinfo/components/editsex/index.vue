<template>
	<van-picker
		title="想变性?"
		show-toolbar
		:columns="columns"
		@confirm="onConfirm"
		@cancel="$emit('close')"
		:default-index="sex"
	/>
</template>

<script>
	import { UpdateUserInfoApi } from "@/api/my";

	export default {
		name: "EditSex",
		props: {
			sex: {
				type: [Number, String],
				retuired: true,
			},
			id: {
				type: [String, Number],
				required: true,
			},
		},
		data() {
			return {
				columns: ["男", "女"],
			};
		},
		methods: {
			async onConfirm(value, index) {
				if (!this.$store.getters.token) return this.$toast.fail("请先登录");

				try {
					const { data } = await UpdateUserInfoApi({
						id: this.id,
						sex: index,
					});
					if (!data.errno) {
						this.$toast.success("更新成功");
						this.$emit("update:sex", index);
						this.$emit("close");
					} else {
						this.$toast.fail("更新失败");
					}
				} catch (error) {}
			},
		},
	};
</script>

<style lang="less" scoped>
</style>