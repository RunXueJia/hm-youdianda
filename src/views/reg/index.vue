<template>
	<div id="login-spc">
		<!-- <h1>login</h1> -->
		<!-- 头部导航 -->
		<van-nav-bar title="注册" left-arrow @click-left="$router.go(-1)" />
		<!-- 标题 -->
		<h1 class="title">欢迎注册</h1>
		<!-- 表单 -->
		<van-form ref="form" @submit="onSubmit">
			<van-field
				left-icon="manager-o"
				v-model="user.mobile"
				name="mobile"
				placeholder="手机号"
				:rules="rules.mobile"
			/>
			<van-field
				left-icon="bag-o"
				v-model="user.password"
				type="password"
				name="password"
				placeholder="密码"
				:rules="rules.password"
			/>
			<van-field
				left-icon="bag-o"
				v-model="password"
				type="password"
				name="passwordB"
				placeholder="再次确认密码"
				:rules="[{validator : () => password === user.password ,message :'两次密码不一致'}]"
			/>
			<div style="margin: 16px;">
				<van-button round block type="info" native-type="submit">提交</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
	import { reg } from "@/api/reg.js";
	export default {
		name: "Index",

		data() {
			return {
				user: {
					mobile: "",
					password: "",
				},
				password: "",
				rules: {
					mobile: [
						{
							required: true,
							message: "请填写手机号",
						},
						{
							pattern:
								/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
							message: "手机号格式不正确",
						},
					],
					password: [
						{ required: true, message: "请填写密码" },
						{
							pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/,
							message: "密码不正确",
						},
					],
				},
			};
		},

		mounted() {},

		methods: {
			async onSubmit() {
				// console.log("ok");
				this.$toast.loading({
					message: "登录中...",
					forbidClick: true,
				});
				try {
					await this.$refs.form.validate("mobile");
					await this.$refs.form.validate("password");
					await this.$refs.form.validate("passwordB");
					console.log("ok");
				} catch (error) {
					console.log("不ok");
				}
				try {
					const { data } = await reg(this.user);
					console.log(data);
					if (!data.errno) {
						this.$toast.clear();
						this.$toast.success(data.errmsg);
						this.$router.push({
							path: "/login",
						});
					} else {
						this.$toast.fail(data.errmsg);
					}
				} catch (error) {
					console.log(error);
				}
			},
		},
	};
</script>

<style lang="less">
	#login-spc {
		position: relative;
		.van-nav-bar {
			background-color: pink;
			.van-nav-bar__title {
				color: #fff;
			}
			.van-icon {
				color: #fff;
			}
		}
		.title {
			font-size: 37.5px;
			color: pink;
			text-align: center;
			font-weight: 400;
		}
		.van-button--info {
			background-color: pink;
			border: 0;
		}
		.goReg {
			font-size: 12px;
			position: absolute;
			right: 20px;
		}
	}
</style>