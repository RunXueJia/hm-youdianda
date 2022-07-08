import requset from '@/requset'

export const getUserApi = (token) => requset({

    url: '/home/user/getUserInfo',
    headers: {
        token
    }
})