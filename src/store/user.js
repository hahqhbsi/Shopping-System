import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from "@/api"
import { setToken,getToken,removeToken } from "@/utils/token"


//登录与注册
const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token)
    {
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    //清除本地数据
    CLEAR(state){
        state.token=''
        state.userInfo={}
        //本地存储
        removeToken()
    }
}
const actions =  {
    //获取验证码
   async getCode({commit},phone){
    //会返回验证码
     let result = await reqGetCode(phone)
     if(result.code==200){
        commit('GETCODE',result.data)
        return 'ok'
     }else{
        return Promise.reject(new Error('failed'))
     }
     
    },
    //注册,user是一个对象。里面有三个
    async userRegister({commit},user){
      let result = await reqUserRegister(user)
      if(result.code==200){
        return 'ok'
     }else{
        return Promise.reject(new Error('failed'))
     }
      
    },
    //登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data)       
        if(result.code==200){
            commit('USERLOGIN',result.data.token)
            //持久化储存token
           setToken(result.data.token)
          return 'ok'
       }else{
          return Promise.reject(new Error('failed'))
       }
        
    },
    //获取用户信息·
    async getUserInfo({commit}) {
        let result = await reqUserInfo()
        if(result.code==200){
            //提交信息
            commit('GETUSERINFO',result.data)
          return 'ok'
       }  
    },
    //退出登录
    async userLogout({commit}) {
        //只是发请求通知token
        let result = await reqLogout()
        //action不能操作state，只能提交
        if(result.code==200){
            //提交信息
            commit('CLEAR')
            return 'ok'
        }else{
           return Promise.reject(new Error('failed'))
        }
    },
}
const getters =  {

}
export default{
    state,
    mutations,
    actions,
    getters
}