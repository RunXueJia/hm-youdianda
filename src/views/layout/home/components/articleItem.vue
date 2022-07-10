<template>
	<div id="ArticleItem">
		<van-cell style="height:127px">
			<template #title>
				<div class="p title">{{item.title}}</div>
			</template>
			<template #label>
				<div class="p dis">{{item.description}}</div>
			</template>
			<template #default>
				<van-image show-error height="100px" fit="contain" :src="item.pic | showImg" />
			</template>
		</van-cell>
	</div>
</template>

<script>
	export default {
		name: "ArticleItem",
		props: {
			item: {
				type: Object,
				required: true,
			},
		},
		data() {
			return {};
		},

		mounted() {},

		methods: {},
	};
</script>

<style lang="less" >
	#ArticleItem {
		.van-image__error,
		.van-image__loading {
			top: 0;
			left: -80px;
			transform: translate(50 50);
		}
		.p {
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
		}
		.title {
			-webkit-line-clamp: 2;
		}
		.dis {
			-webkit-line-clamp: 3;
		}
	}
</style>