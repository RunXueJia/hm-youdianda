import requset from '@/requset'

export const getUserApi = () => requset({
    url: '/home/user/getUserInfo',
})
export const UpdateUserInfoApi = (data) => requset({
    url: '/home/user/update',
    method: 'post',
    data
})

