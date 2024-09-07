//引入vue-router路由插件
import VueRouter from "vue-router";
//引入Vue
import Vue from "vue";
import routes from "./routes";
//使用插件
Vue.use(VueRouter);
//引入store
import store from "@/store";
//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function(location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function(location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//对外暴露VueRouter类的实例
let router = new VueRouter({
  //配置路由
  //第一:路径的前面需要有/(不是二级路由)
  //路径中单词都是小写的
  //component右侧V别给我加单引号【字符串：组件是对象（VueComponent类的实例）】
  routes,
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    //返回的这个y=0，代表的滚动条在最上方
    return { y: 0 };
  },
});

//全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;

  if (token) {
    console.log('已登录');
    // 用户已登录
    if (to.path === "/login" || to.path === '/register') {
      // 已登录用户不能去登录或注册页面，重定向到首页
      next('/');
    } else {
      // 已登录用户访问其他页面
      if (name) {
        // 已登录且用户信息存在，放行
        next();
      } else {
        // 已登录但用户信息不存在，尝试获取用户信息
        try {
          await store.dispatch('getUserInfo');
          next();
        } catch (error) {
          // 获取用户信息失败，可能是token失效，需要重新登录
          await store.dispatch('userLogout');
          next('/login');
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path === "/login" || to.path === '/register') {
      // 未登录用户访问登录或注册页面，放行
      next();
    } else {
      // 未登录用户访问其他页面
      console.log('未登录用户的路由守卫');
      console.log(123);
      
      let toPath = to.path;
      if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
        // 未登录用户不能访问受保护的页面，重定向到登录页面并携带redirect参数
        //没登录时候的信息存成·query
        next('/login?redirect=' + toPath);
      } else {
        // 未登录用户访问其他非受保护页面，放行
        next();
      }
    }
  }
});


export default router;
