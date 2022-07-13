<template>
	<div id="release-spc">
		<van-nav-bar title="发布" fixed placeholder />
		<!-- 表单 -->
		<van-form validate-first @failed="onFailed">
			<van-field
				v-model="ArticleTitle"
				name="pattern"
				label="文章标题"
				placeholder="请输入文章标题"
				:rules="[{ required :true	, message: '请输入文章标题' }]"
			/>
			<!-- 文章分类选择 -->
			<van-field
				readonly
				clickable
				name="picker"
				:value="ArtCate"
				label="文章分类"
				placeholder="点击选择文章分类"
				@click="showCate = true"
			/>
			<van-popup v-model="showCate" position="bottom">
				<van-picker
					title="文章分类"
					value-key="catename"
					show-toolbar
					:columns="index.allCate"
					@confirm="onCate"
					@cancel="showCate = false"
				/>
			</van-popup>
			<!-- 文章标签 -->
			<van-field
				readonly
				clickable
				name="picker"
				:value="ArtTag"
				label="文章标签"
				placeholder="点击选择文章标签"
				@click="showTag = true"
			/>
			<van-popup v-model="showTag" position="bottom">
				<van-picker
					title="文章标签"
					value-key="tagname"
					show-toolbar
					:columns="index.allTag"
					@confirm="onTag"
					@cancel="showTag = false"
				/>
			</van-popup>
			<!-- 文件上传 -->
			<van-field label="文件上传">
				<template #input>
					<van-uploader :max-count="2" v-model="imageList" multiple />
				</template>
			</van-field>
			<!-- 文章正文 -->
			<van-field
				v-model="ArticleText"
				rows="2"
				autosize
				label="文章内容"
				type="textarea"
				maxlength="200"
				placeholder="请输入您的文章内容"
				show-word-limit
			/>
			<!--  -->
			<div class="btns">
				<van-button @click="addArticle" icon="plus" type="primary">发布</van-button>
				<van-button @click.prevent icon="send-gift-o" type="info">存草稿</van-button>
				<van-button @click.prevent icon="revoke" type="danger">重置</van-button>
			</div>
		</van-form>
		<!-- <van-button @click="up" icon="revoke" type="danger">上传文件测试</van-button> -->
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import { uploadImageApi, addArticleApi } from "@/api/reslease";
	export default {
		name: "release",
		computed: {
			...mapState(["index"]),
		},
		data() {
			return {
				ArticleTitle: "",
				ArtCate: "",
				cateid: "",
				ArtTag: "",
				showCate: false, //文章分类选择
				showTag: false, //文章标签选择
				imageList: [],
				ArticleText: "",
				pic: "",
			};
		},

		mounted() {},

		methods: {
			onFailed(errorInfo) {
				// console.log("failed", errorInfo);
			},
			//分类选择
			onCate(value) {
				this.ArtCate = value.catename;
				this.cateid = value.id;
				this.showCate = false;
			},
			//标签选择
			onTag(value) {
				this.ArtTag = value.tagname;
				this.showTag = false;
			},
			//文件上传
			// async upImage() {
			// console.log(this.imageList[0].file);
			// let formData = new FormData();
			// formData.append("file", this.imageList[0].file);
			// try {
			// 	const { data } = await uploadImageApi(formData);
			// 	this.pic = data.data.savePath;
			// 	if (data.errno) return this.$toast.fail("图片上传失败");
			// } catch (error) {}
			// },

			//发布文章
			async addArticle() {
				let formData = new FormData();
				formData.append("file", this.imageList[0].file);
				try {
					const { data } = await uploadImageApi(formData);
					// console.log(data);
					this.pic = data.data.savePath;
					if (data.errno) return this.$toast.fail("图片上传失败");
				} catch (error) {}
				try {
					const { data } = await addArticleApi({
						author: "",
						cateid: this.cateid,
						content: this.ArticleText,
						pic: this.pic,
						status: "2",
						tags: this.ArtTag,
						title: this.ArticleTitle,
					});

					if (!data.errno) {
						this.$toast.success("文章发布成功");
						this.clear();
					}
					if (data.errno) return this.$toast.fail("文章发布失败");
				} catch (error) {}
			},
			//清除数据
			clear() {
				this.cateid = "";
				this.ArticleText = "";
				this.pic = "";
				this.ArtTag = "";
				this.ArticleTitle = "";
				this.imageList = [];
				this.ArtCate = "";
			},
		},
	};
</script>

<style lang="less" >
	#release-spc {
		.van-nav-bar__content {
			background-color: pink;
			.van-nav-bar__title {
				color: #fff;
			}
		}
		.btns {
			margin-top: 20px;
			display: flex;
			justify-content: space-between;
			padding: 0 16px;
		}
	}
</style>