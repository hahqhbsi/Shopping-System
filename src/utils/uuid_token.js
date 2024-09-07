import {v4 as uuidv4} from 'uuid'
//要生成一个随机字符串，且每次执行不能发生变化。游客身份持久存储
export const getUUID = ()=>{
    //先看本地存储中的id是否已存在
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if(!uuid_token){
        //没有就生成
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}