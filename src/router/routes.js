import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupeOrder'
//路由配置信息
export default [
    {
        path:"/center",
        component:Center,
        meta:{show:true},
        children: [
            {

              path: 'myorder',
              component: MyOrder,
            },            
            {
              path: 'grouporder',
              component: GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
          ]
      
    },
    {
        path:"/shopcart",
        component:ShopCart,
        meta:{show:true}//显示footer
    },
    {
        name:'addcartsuccess',
        path:"/addcartsuccess",
        component:AddCartSuccess,
        meta:{show:true}//显示footer
    },
    {
        path:"/detail/:id?",
        component:Detail,
        meta:{show:true}
    },
    {
        path:"/home",
        component:Home,
        meta:{show:true}
    },
    {
        path:"/search/:keyword?",
        component:Search,
        meta:{show:true},
        name:'search',
        //路由组件传递props数据
        //布尔值写法：只有params参数
       // props:true
    //    对象写法:额外给路由组件传递一些props
        //props:{a:1,b:6}
        //函数写法可以params参数、query参数，通过props传递给路由组件
        /* props:(route)=>{
            return {
                keyWord:$route.params.keyWord,
                k:$route.query.k
            }
        } */

    },
    ,
    {
        path:"/login",
        component:Login,
        meta:{show:false}
    },
    ,
    {
        path:"/register",
        component:Register,
        meta:{show:false}
    },
    //重定向，跑起来的时候，当你访问/.立马定向到首页
    {
        path:'*',
        redirect:'/home'
    },
    
    {
        path:"/paysuccess",
        component:PaySuccess,
        meta:{show:true}//显示footer
    },
    {
        path:"/pay",
        component:Pay,
        meta:{show:true},//显示footer
        beforeEnter: (to, from, next) => {
            // ...
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:"/trade",
        component:Trade,
        meta:{show:true},//显示footer
        //路由独享
        beforeEnter: (to, from, next) => {
            // 去交易页，必须是从购物车去的
            if(from.path=='/shopCart'){
                next()
            }else{
                //其他的不让过
                next(false)
            }
        }
    },
]