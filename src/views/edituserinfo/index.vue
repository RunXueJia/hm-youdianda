<template>
	<div class="user-profile">
		<!-- 导航栏 -->
		<van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />
		<!-- /导航栏 -->

		<!-- 个人信息 -->
		<van-cell @click="$refs.inp.click()" class="avatar-cell" title="头像" is-link center>
			<input ref="inp" type="file" hidden @change="choseImg" />
			<van-image class="avatar" round fit="cover" :src="UserInfo.icon | showImg" />
		</van-cell>
		<van-cell @click="isEditName=true" title="昵称" :value="UserInfo.username" is-link />
		<van-cell @click="isEditSex=true" title="性别" :value="UserInfo.sex ?'女':'男'" is-link />
		<van-cell @click="isEditMobile=true" title="手机号" :value="UserInfo.mobile" is-link />
		<van-cell @click="isEditBrith=true" title="生日" :value="UserInfo.birthday" is-link />
		<van-cell @click="isEditAderess=true" title="家庭地址" :label="UserInfo.address || '去添加'" is-link />
		<van-cell @click="isEditNote=true" title="个性留言" :label="UserInfo.notes" is-link />
		<!-- /个人信息 -->
		<!-- 修改资料弹出层 -->
		<van-popup v-model="isEditPhoto" position="bottom" :style="{height : '100%'}">
			<UpdatePhoto
				@UpImgSuccess="UserInfo.icon=$event"
				@close="isEditPhoto=false"
				:id="UserInfo.id"
				v-if="isEditPhoto"
				:img="ImgUrl"
			></UpdatePhoto>
		</van-popup>
		<van-popup v-model="isEditName" position="bottom" :style="{height : '50%'}">
			<EditName
				v-if="isEditName"
				@close="isEditName=false"
				:id="UserInfo.id"
				:username.sync="UserInfo.username"
			/>
		</van-popup>
		<van-popup v-model="isEditSex" position="bottom" :style="{height : '50%'}">
			<EditSex :sex.sync="UserInfo.sex" :id="UserInfo.id" v-if="isEditSex" @close="isEditSex=false" />
		</van-popup>
		<van-popup v-model="isEditMobile" position="bottom" :style="{height : '50%'}">
			<EditMobile
				:mobile.sync="UserInfo.mobile"
				:id="UserInfo.id"
				v-if="isEditMobile"
				@close="isEditMobile=false"
			/>
		</van-popup>
		<van-popup v-model="isEditBrith" position="bottom" :style="{height : '50%'}">
			<EditBrith
				:id="UserInfo.id"
				:birthday.sync="UserInfo.birthday"
				v-if="isEditBrith"
				@close="isEditBrith=false"
			/>
		</van-popup>
		<van-popup v-model="isEditAderess" position="bottom" :style="{height : '50%'}">
			<EditAddress
				:address.sync="UserInfo.address"
				:id="UserInfo.id"
				v-if="isEditAderess"
				@close="isEditAderess=false"
			/>
		</van-popup>
		<van-popup v-model="isEditNote" position="bottom" :style="{height : '50%'}">
			<EditNotes
				:notes.sync="UserInfo.notes"
				:id="UserInfo.id"
				v-if="isEditNote"
				@close="isEditNote=false"
			/>
		</van-popup>
		<!-- /修改资料弹出层 -->
	</div>
</template>

<script>
	import { getUserApi } from "@/api/my";
	//弹出层内容
	import EditName from "./components/editname";
	import EditSex from "./components/editsex";
	import EditMobile from "./components/editmobile";
	import EditBrith from "./components/editbrith";
	import EditAddress from "./components/editaddress";
	import EditNotes from "./components/editnote";
	import UpdatePhoto from "./components/editphoto";
	export default {
		name: "UserProfile",
		components: {
			EditNotes,
			EditAddress,
			EditName,
			EditSex,
			EditMobile,
			EditBrith,
			UpdatePhoto,
		},
		props: {},
		data() {
			return {
				UserInfo: {},
				isEditName: false,
				isEditSex: false,
				isEditMobile: false,
				isEditBrith: false,
				isEditAderess: false,
				isEditNote: false,
				isEditPhoto: false,
				ImgUrl: "",
			};
		},
		computed: {},
		watch: {},
		created() {
			this.getUserInfoFn();
		},
		mounted() {},
		methods: {
			async getUserInfoFn() {
				try {
					const { data } = await getUserApi();
					if (!data.errno) {
						this.UserInfo = data.data.userInfo;
					}
				} catch (error) {}
			},

			//选择头像图片
			choseImg() {
				const img = this.$refs.inp.files[0];
				// console.log(img);
				const types = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
				if (!types.includes(img.type))
					return this.$toast.fail("不支持的图片类型");
				this.ImgUrl = URL.createObjectURL(img);
				this.isEditPhoto = true;
				this.$refs.inp.value = null;
			},
		},
	};
</script>

<style scoped lang="less">
	.user-profile {
		.avatar-cell {
			.van-cell__value {
				display: flex;
				flex-direction: row-reverse;
			}
			.avatar {
				width: 60px;
				height: 60px;
			}
		}
		.van-popup {
			background-color: #f5f7f9;
		}
	}
</style>
