<template>
	<div class="update-photo">
		<img class="img" :src="img" ref="img" />

		<div class="toolbar">
			<div class="cancel" @click="$emit('close')">取消</div>
			<div class="confirm" @click="onConfirm">完成</div>
		</div>
	</div>
</template>

<script>
	import { uploadImageApi } from "@/api/reslease";
	import { UpdateUserInfoApi } from "@/api/my";

	import Cropper from "cropperjs";
	export default {
		name: "UpdatePhoto",
		components: {},
		props: {
			// 预览图片地址信息
			img: {
				type: [String, Object],
				required: true,
			},
			id: {
				type: [String, Number],
				required: true,
			},
		},
		data() {
			return {};
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {
			this.cropper = new Cropper(this.$refs.img, {
				viewMode: 1,
				dragMode: "move",
				aspectRatio: 1,
				// autoCropArea: 1,
				cropBoxMovable: false,
				cropBoxResizable: false,
				background: false,
			});
		},
		methods: {
			// 确定事件
			onConfirm() {
				if (!this.$store.getters.token) return this.$toast.fail("请先登录");

				this.cropper.getCroppedCanvas().toBlob(async (blob) => {
					// console.log(blob); // 裁剪后的结果信息
					const Fd = new FormData();
					Fd.append("file", blob);
					try {
						const { data } = await uploadImageApi(Fd);

						if (data.errno) return this.$toast.fail("上传失败");
						const UpImgRes = await UpdateUserInfoApi({
							id: this.id,
							icon: data.data.savePath,
						});
						if (UpImgRes.errno) return this.$toast.fail("修改失败");
						this.$toast.success("修改成功");
						this.$emit("UpImgSuccess", data.data.savePath);
						this.$emit("close");
					} catch (error) {}
				});
			},
		},
	};
</script>

<style scoped lang="less">
	@import "cropperjs/dist/cropper.css";
	.update-photo {
		background-color: #000;
		height: 100%;
		.toolbar {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			.cancel,
			.confirm {
				width: 45px;
				height: 45px;
				font-size: 15px;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
			}
		}
	}
	.img {
		display: block;
		max-width: 100%;
	}
</style>