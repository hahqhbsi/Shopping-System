//home模块的小仓库
import { reqCategoryList, reqGetBannerList,reqFloorList } from "@/api"
const state = {
    
    categoryList:[],//home菜单中存储三级菜单的数据

    bannerList:[],//轮播图的
    floorList:[],
}
const mutations = {
    CATEGORYLIST(state,categoryList){ 
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
   async categoryList({commit}){//解构赋值，action的方法,{commit}就是把上下文对象中commit属性取出，赋值给同名变量commit，下面直接调用
        let result = await reqCategoryList()
        if(result.code == 200){
            commit("CATEGORYLIST",result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
       let result = await reqGetBannerList()
       if(result.code==200){//mockserve的
        commit('GETBANNERLIST',result.data)
       }
    },
    //获取floor数据
    async getFloorList({commit}){
        let result = await reqFloorList()
        if(result.code==200){//mockserve的
            commit('GETFLOORLIST',result.data)
           }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}
