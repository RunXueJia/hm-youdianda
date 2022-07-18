<template>
	<div class="update-name">
		<!-- 导航栏 -->
		<van-nav-bar
			@click-right="Sbumit"
			title="设置手机号"
			left-text="取消"
			right-text="完成"
			@click-left="$emit('close')"
		/>
		<!-- /导航栏 -->
		<!-- 输入框 -->
		<div class="field-wrap">
			<van-form ref="form">
				<van-field
					v-model.trim="message"
					rows="2"
					autosize
					type="textarea"
					maxlength="11"
					placeholder="请输入昵称"
					show-word-limit
					:rules="rules"
					name="mobile"
				/>
			</van-form>
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
			mobile: {
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
				message: this.mobile,
				rules: [
					{
						pattern:
							/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
						message: "手机号格式不正确",
					},
					{
						required: true,
						message: "请填入手机号",
					},
				],
			};
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {},
		methods: {
			async Sbumit() {
				if (!this.$store.getters.token) return this.$toast.fail("请先登录");

				try {
					await this.$refs.form.validate("mobile");
					const { data } = await UpdateUserInfoApi({
						id: this.id,
						mobile: this.message,
					});
					if (!data.errno) {
						this.$toast.success("更新成功");
						this.$emit("update:mobile", this.message);
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