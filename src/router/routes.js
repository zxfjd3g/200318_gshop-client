/* 
所有路由配置的数组
*/

// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'


/* 
静态import: import Home from '@/pages/Home'  ==> 打包形成一个文件
动态import: import('@/pages/Home')  ==> 被引入的模块单独打包(生成另一个打包文件)


路由懒加载:
1. 使用动态import, 对路由组件进行单独打包(code split: 代码分割)
2. 配置的组件是一个函数, 只有访问对应路由时才会执行, 去请求加载对应的路由组件的打包文件
*/
const Home = () => import('@/pages/Home')
const Search = () => import('@/pages/Search')
// const Detail = () => import('@/pages/Detail')

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupBuy from '@/pages/Center/GroupBuy'

import store from '@/store'
import instance from '@/api/ajax'

export default [
  { // 一个路由
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'search', // 每个路由配置都可以指定一个标识名称
    path: '/search/:keyword?',  // 需要指定params参数, 标识名称是keyword
    // path: '/search/:keyword',  // 需要指定params参数, 标识名称是keyword
    component: Search,
    props: route => ({keyword3: route.params.keyword, keyword4: route.query.keyword2, xxx: 12})
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isHideFooter: true // 是否隐藏footer的标识
    },
    /* b.只有没有登陆, 才能查看登陆界面 */
    // beforeEnter (to, from, next) { // 路由前置守卫
    //   const token = store.state.user.userInfo.token
    //   // 如果已经登陆, 自动跳转到首页
    //   if (token) {
    //     next('/')
    //   } else {
    //     // 如果还没有登陆, 才放行显示
    //     next()
    //   }
    // }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      isHideFooter: true // 是否隐藏footer的标识
    }
  },

  {
    name: 'detail',
    path: '/detail/:id',
    component: () => import('@/pages/Detail')
  },
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    /* c.只有携带的skuNum以及sessionStorage中有skuInfo数据, 才能查看添加购物车成功的界面 */
    beforeEnter (to, from, next) {
      const skuNum = to.query.skuNum
      const skuInfo = JSON.parse(sessionStorage.getItem('SKU_INFO'))
      console.log(skuNum, skuInfo)
      if (skuNum && skuInfo instanceof Object) {
        next()
      } else {
        next('/shopcart')
      }
    }
  },
  {
    path: '/shopcart',
    component: ShopCart
  },

  {
    path: '/trade',
    component: Trade,
    beforeEnter (to, from, next) {
      if (from.path==='/shopcart') {
        next()
      } else {
        next('/shopcart')
      }
    }
  },
  {
    path: '/pay',
    component: Pay,
    beforeEnter (to, from, next) {
      if (from.path==='/trade') {
        next()
      } else {
        next('/trade')
      }
    }
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    beforeEnter (to, from, next) {
      if (from.path==='/pay') {
        next()
      } else {
        next('/pay')
      }
    }
  },
  {
    path: '/center',
    component: Center,
    children: [
      {
        path: 'myorder',
        component: MyOrder,
      },
      {
        path: '/center/groupbuy',
        component: GroupBuy,
      },
      {
        path: '',
        redirect: 'myorder'
      }
    ]
  },

  {
    path: '/communication',
    component: () => import('@/pages/Communication/Communication'),
    children: [
      {
        path: 'event',
        component: () => import('@/pages/Communication/EventTest/EventTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'model',
        component: () => import('@/pages/Communication/ModelTest/ModelTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'sync',
        component: () => import('@/pages/Communication/SyncTest/SyncTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'attrs-listeners',
        component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'children-parent',
        component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'scope-slot',
        component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'provide-inject',
        component: () => import('@/pages/Communication/ProvideInjectTest/ProvideInjectTest'),
        meta: {
          isHideFooter: true
        },
      },
    ],
  }
]