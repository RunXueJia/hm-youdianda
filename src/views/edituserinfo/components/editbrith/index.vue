<template>
	<van-datetime-picker
		v-model="currentDate"
		type="date"
		title="选择年月日"
		:min-date="minDate"
		:max-date="maxDate"
		@cancel="$emit('close')"
		@confirm="confirm"
	/>
</template>

<script>
	import { TimeToString } from "@/utils/day";
	import { UpdateUserInfoApi } from "@/api/my";
	export default {
		name: "EditBrith",
		props: {
			id: {
				type: [String, Number],
				required: true,
			},
			birthday: {
				type: [String],
			},
		},
		data() {
			return {
				minDate: new Date(1921, 1, 1),
				maxDate: new Date(),
				currentDate: new Date(this.birthday || TimeToString()),
			};
		},

		mounted() {},
		created() {},
		methods: {
			async confirm(val) {
				if (!this.$store.getters.token) return this.$toast.fail("请先登录");

				try {
					const { data } = await UpdateUserInfoApi({
						id: this.id,
						birthday: TimeToString(val),
					});
					if (!data.errno) {
						this.$toast.success("更新成功");
						this.$emit("update:birthday", TimeToString(val));
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