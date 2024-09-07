import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
import {getUUID} from '@/utils/uuid_token'

const state = {
    goodInfo:{},
    //skuInfo:{}
    //游客临时身份
    uuid_token:getUUID()//utils里
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const actions ={
    //获取产品信息
   async getGoodInfo({commit},skuId){
       let result = await reqGoodsInfo(skuId)
       if(result.code==200){
        commit('GETGOODINFO',result.data)
       }
    },
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        //加入购物车返回的解构
    //加入购物车以后（发请求），前台将参数带给服务器
    //服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
    //因为服务器没有返回其余数据,因此咱们不需要三连环存储数据

        let result = await reqAddOrUpdateShopCart(skuId,skuNum)              
        //返回的是一个promise
        if(result.code==200){
           return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
     }
}
//简化数据
const getters =  {
    categoryView(state){
        //比如state.goodInfo初始状态空对象，空对象属性值undefined
        return state.goodInfo.categoryView || {}
    },
    //简化产品信息
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    //产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || {}
    }
}
export default {
    
    state,
    mutations,
    actions,
    getters
}