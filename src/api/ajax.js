import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from'@/store'


const requests = axios.create({
    baseURL: "http://gmall-h5-api.atguigu.cn/api", // 注意去掉URL前的空格
    timeout: 5000,
});

requests.interceptors.request.use((config) => {
    if(store.state.detail.uuid_token){
        //请求头添加一个字段，和后台商量好
        config.headers.userTempId = store.state.detail.uuid_token
        //config 是一个对象，它包含了即将发送的请求的配置信息。当一个请求被创建并发送到服务器之前，axios 允许你通过拦截器(interceptors)来修改这些配置,拦截器检查了 store.state.detail.uuid_token 是否存在，如果存在，它将添加一个自定义的请求头 userTempId
    }
    //需要token带给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }


    // 进度条开始
    nprogress.start();
    return config;
});

requests.interceptors.response.use(
    (res) => {
        // 进度条结束
        nprogress.done();
        return res.data; // 通常我们只关心响应体中的数据部分
    },
    (error) => {
        // 进度条结束，即使在错误情况下也应该结束进度条
        nprogress.done();
        // 这里可以添加更详细的错误处理逻辑
        console.error('请求失败:', error);
        return Promise.reject(new Error('请求失败'));
    }
);

export default requests;
