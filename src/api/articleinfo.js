import requset from '@/requset'

//收藏/点赞/共用
export const LikeOrCollectArticleApi = (params) => requset({
    url: '/user/userDataHandle',
    params
})