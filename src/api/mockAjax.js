//对于axios进行二次封装

import axios from "axios";

//引入进度条
//start:进度条开始done:进度条结束
import nprogress from "nprogress";
import "nprogress/nprogress.css"//引入样式


//1.利用axios对象的方法create，去创建一个axios实例
//2.request就是axios，稍微配置一下而已
const requests = axios.create({
    //配置对象
    //基础路径。发请求的时候，路径会出现api
    baseURL:"/mock",
    //代表请求的时间，你发请求5秒没响应就代表失败
    timeout:5000,
});
// 请求拦截器在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有一个属性很重要，header请求头

    //进度条开始
    nprogress.start()
    return config;
})
// 响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情

    //进度条结束
    nprogress.done()
    return res.data
},(error)=>{
    //失败,就停止
    return Promise.reject(new Error('false'))
})
//对外暴露
export default requests