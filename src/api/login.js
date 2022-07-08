import requset from '@/requset'

export const LoginIn = (data) => requset({
    method: 'post',
    url: '/home/index/login',
    data
})