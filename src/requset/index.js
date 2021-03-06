import axios from "axios";
import store from "@/store";
import { Toast } from 'vant';
import router from "@/router";
const instance = axios.create({
    baseURL: process.env.VUE_APP_ApiUrl
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config);
    config.headers.token = store.getters.token
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response);
    if (response.data.errno === 9997) {
        Toast.fail('登录过期请重新登录')
        router.push('/login')
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    // console.log(error);
    return Promise.reject(error);
});
export default instance

///home/user/userDataHandle?type=2&article_id=54&action=del