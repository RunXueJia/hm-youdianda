<template>
	<div id="ArticleItem">
		<van-swipe-cell>
			<van-cell @click="goArticleInfo(item.id)" style="height:127px">
				<template #title>
					<div class="p">{{item.title}}</div>
				</template>
				<template #label>
					<div class="p">{{item.description}}</div>
					<span>
						<van-icon name="star-o" />
						收藏({{item.lovenum || 0}})
					</span>
					<span>
						<van-icon name="good-job-o" />
						点赞({{item.click}})
					</span>
				</template>
				<template #default>
					<van-image show-error height="100px" fit="contain" :src="item.pic | showImg" />
				</template>
			</van-cell>
			<!--  -->
			<template #right>
				<!-- <van-button style="height:100%" square type="danger" text="删除" /> -->
				<slot name="rightBtn"></slot>
			</template>
		</van-swipe-cell>
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

		methods: {
			goArticleInfo(id) {
				this.$router.push({
					path: "/articleinfo",
					query: {
						id,
					},
				});
			},
		},
		created() {
			// console.log(this.item);
			// console.log(this.$route);
		},
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
			-webkit-line-clamp: 2;
		}
	}
</style>