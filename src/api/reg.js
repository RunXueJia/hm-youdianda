import requset from '@/requset'

export const reg = (data) => requset({
    method: 'post',
    url: '/home/index/reg',
    data
})