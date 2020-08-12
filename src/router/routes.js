/* 
所有路由配置的数组
*/

import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

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
    }
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
    component: Detail
  },
  {
    path: '/addcartsuccess',
    component: AddCartSuccess
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
]