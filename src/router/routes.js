/* 
所有路由配置的数组
*/

import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

export default [
  { // 一个路由
    path: '/',
    component: Home
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
]