<template>
	<div class="update-name">
		<!-- 导航栏 -->
		<van-nav-bar
			@click-right="Sbumit"
			title="设置昵称"
			left-text="取消"
			right-text="完成"
			@click-left="$emit('close')"
		/>
		<!-- /导航栏 -->
		<!-- 输入框 -->
		<div class="field-wrap">
			<van-field
				v-model.trim="message"
				rows="2"
				autosize
				type="textarea"
				maxlength="7"
				placeholder="请输入昵称"
				show-word-limit
			/>
		</div>
		<!-- /输入框 -->
	</div>
</template>

<script>
	import { UpdateUserInfoApi } from "@/api/my";
	export default {
		name: "UpdateName",
		components: {},
		props: {
			username: {
				type: String,
				required: true,
			},
			id: {
				type: [String, Number],
				required: true,
			},
		},
		data() {
			return {
				message: this.username,
			};
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {},
		methods: {
			async Sbumit() {
				if (!this.$store.getters.token) return this.$toast.fail("请先登录");
				if (!this.message) return this.$toast.fail("不能为空");
				try {
					const { data } = await UpdateUserInfoApi({
						id: this.id,
						username: this.message,
					});
					if (!data.errno) {
						this.$toast.success("更新成功");
						this.$emit("update:username", this.message);
						this.$emit("close");
					} else {
						this.$toast.fail("更新失败");
					}
				} catch (error) {}
			},
		},
	};
</script>

<style scoped lang="less">
	.field-wrap {
		padding: 20px;
	}
</style>