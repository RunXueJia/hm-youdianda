import requset from '@/requset'

export const getIndexApi = () => requset({
    url: '/home/index/index',
})
export const getHotApi = () => requset({
    url: '/home/index/hot',
})
export const getNewApi = (url, params) => requset({
    url: url,
    params
})