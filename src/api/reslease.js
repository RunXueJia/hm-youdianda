import requset from '@/requset'

export const uploadImageApi = (data) => requset({
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
    url: '/home/common/upload?type=images',
    data,
})
export const addArticleApi = (data) => requset({
    method: 'post',
    url: '/home/user/addArticle',
    data,
})

export const getArticleInfoApi = (id) => requset({
    url: '/index/show?id=' + id,
})
//        /home/user/editArticle

export const editArticleApi = (data) => requset({
    method: 'post',
    url: '/home/user/editArticle',
    data
})