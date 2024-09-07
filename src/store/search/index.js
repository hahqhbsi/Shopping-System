import { reqGetSearchInfo } from "@/api"

//search模块的小仓库
const state = {
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,searchList){ 
        state.searchList = searchList
    },
}
const actions = {
    //获取search的模块数据
   async getSearchList({commit},params){
    //至少要传递一个空对象
    //params是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    //由于actions和mutations不支持传递多个参数，这里的参数称为载荷。
    //所以，一般传递的第二个参数payload可以是一个参数，也可以是一个对象，还可以是一个数组。多个参数选数组
      let result =  await reqGetSearchInfo(params)
      if(result.code==200){//mockserve的
        commit('GETSEARCHLIST',result.data)
       }
    }
}
//为了简化仓库数据而生
//可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
    goodsList(state){//是当前仓库的state
            return state.searchList.goodsList || [] //万一没网就给人家一个空的
    },
    trademarkList(state){
        return state.searchList.trademarkList || [] 
    },
    attrsList(state){
        return state.searchList.attrsList || [] 
            
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
