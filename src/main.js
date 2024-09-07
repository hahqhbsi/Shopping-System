import Vue from 'vue'
import App from './App.vue'

import TypeNav from '@/components/TypeNav'//三级联动组件---注册为全局组件
//注册全局组件轮播图
import Carousel from '@/components/Carousel'
//引入分页
import Pagination from '@/components/Pagination'

import { Button, MessageBox } from 'element-ui';

Vue.component(Carousel.name,Carousel)
Vue.component(TypeNav.name,TypeNav)//第一个参数:全局组件的名字  第二个参数:哪一个组件
Vue.component(Pagination.name,Pagination)
Vue.component(Button.name,Button)
//
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert


import router from '@/router'//引入路由
import store from './store' //引入仓库
//引入mock
import '@/mock/mockServe'
//引入swiper
import 'swiper/css/swiper.css'
Vue.config.productionTip = false

//统一接口api文件夹里面全部函数
import * as API from '@/api'
import atm from '@/assets/1.gif'
import '@/plugind/validate'
//引入插件
import VueLazyload from 'vue-lazyload' 
Vue.use(VueLazyload,{
  loading:atm
})


new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this //vm
    Vue.prototype.$API = API

  },
  //注册路由,底下的写法是kv一致省略v
  ///注册路由信息:当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  //组件实例的身上会多一个$store属性
  store
}).$mount('#app')
