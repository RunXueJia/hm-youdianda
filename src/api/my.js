import requset from '@/requset'

export const getUserApi = () => requset({
    url: '/home/user/getUserInfo',
})

