<template>
	<div id="release-spc">
		<van-nav-bar title="发布" fixed placeholder />
		<!-- 表单 -->
		<van-form v-if="$store.getters.token" validate-first @failed="onFailed">
			<van-field
				v-model="params.title"
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
				:value="params.tags"
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
					<van-uploader show-upload :max-count="1" v-model="imageList" multiple />
				</template>
			</van-field>
			<!-- 文章正文 -->
			<van-field
				v-model="params.content"
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
				<van-button v-if="!edit" @click="UpArticle" icon="plus" type="primary">发布</van-button>
				<van-button @click="SaveArticle" icon="send-gift-o" type="info">存草稿</van-button>
				<van-button v-if="edit" @click="EditArticle" type="warning" icon="edit">修改文章</van-button>
				<van-button @click.prevent="clear" icon="revoke" type="danger">重置</van-button>
			</div>
		</van-form>
		<div class="noLogin" v-else>
			<van-image width="160" height="160" src="https://img01.yzcdn.cn/vant/empty-image-error.png" />
			<p>请登录</p>
		</div>
		<!-- <van-button @click="up" icon="revoke" type="danger">上传文件测试</van-button> -->
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import {
		uploadImageApi,
		addArticleApi,
		getArticleInfoApi,
		editArticleApi,
	} from "@/api/reslease";
	export default {
		name: "release",
		computed: {
			...mapState(["index"]),
		},
		data() {
			return {
				ArtCate: "",
				showCate: false, //文章分类选择
				showTag: false, //文章标签选择
				imageList: [],
				pic: "",
				params: {
					cateid: "",
					content: "",
					tags: "",
					title: "",
				},
				edit: false,
			};
		},

		mounted() {},
		created() {
			if (this.$route.query.id) {
				this.edit = true;
				this.initData(this.$route.query.id);
			}
		},
		methods: {
			onFailed(errorInfo) {
				// console.log("failed", errorInfo);
			},
			//分类选择
			onCate(value) {
				this.ArtCate = value.catename;
				if (this.edit) this.params.catename = value.catename;
				this.params.cateid = value.id;
				this.showCate = false;
			},
			//标签选择
			onTag(value) {
				this.params.tags = value.tagname;
				this.showTag = false;
			},

			//发布文章
			async addArticle(status) {
				if (this.imageList[0].file) {
					let formData = new FormData();
					formData.append("file", this.imageList[0].file);
					this.imageList[0].message = "上传中...";
					this.imageList[0].status = "uploading";

					try {
						const { data } = await uploadImageApi(formData);
						// console.log(data);
						this.pic = data.data.savePath;
						if (data.errno) {
							this.imageList[0].status = "failed";
							this.imageList[0].message = "上传失败";
						}
					} catch (error) {}
				}
				try {
					this.params.pic = this.pic;
					const { data } = status
						? await addArticleApi(this.params)
						: await editArticleApi(this.params);

					if (!data.errno) {
						this.$toast.success(
							`文章${status === "1" ? "保存" : status ? "发布" : "修改"}成功`
						);
						this.clear();
						this.$router.push("/my/articles");
					}
					if (data.errno)
						return this.$toast.fail(
							`文章${status === "1" ? "保存" : status ? "发布" : "修改"}失败`
						);
				} catch (error) {}
			},
			//清除数据
			clear() {
				this.params.cateid = "";
				this.params.content = "";
				this.params.tags = "";
				this.params.title = "";
				this.ArtCate = "";
				this.imageList = [];
				this.pic = "";
			},
			//发布文章的前置动作
			UpArticle() {
				this.beforeUp("2");

				this.addArticle("2");
			},
			//保存草稿的前置动作
			SaveArticle() {
				let params = {
					cateid: this.params.cateid,
					content: this.params.content,
					tags: this.params.tags,
					title: this.params.title,
				};
				this.params = params;
				this.beforeUp("1");
				this.addArticle("1");
			},
			//发布前的数据总集
			beforeUp(status) {
				this.params.status = status;
			},
			//修改文章
			EditArticle() {
				this.addArticle(false);
			},
			//修改文章的页面初始化
			async initData(id) {
				const { data } = await getArticleInfoApi(id);
				console.log(data.data.info);
				this.params = data.data.info;
				this.ArtCate = data.data.info.catename;
				this.pic = data.data.info.pic;
				this.imageList.push({
					url: "http://122.51.249.55:8060/" + data.data.info.pic,
				});
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
		.noLogin {
			text-align: center;
			padding-top: 30px;
			color: #969799;
		}
	}
</style>