/* 
包含项目中所有接口的请求函数: 接口请求函数
每个函数的返回值都是promise
*/
import ajax from './ajax'
import mockAjax from './mockAjax'
import { method } from 'lodash'

/* 
首页三级分类
/api/product/getBaseCategoryList GET
*/
export const reqCategoryList = () => ajax('/product/getBaseCategoryList')
// export const reqCategoryList = () => ajax.get('/product/getBaseCategoryList')

// 定义mock接口的请求函数
export const reqBanners = () => mockAjax('/banners')
export const reqFloors = () => mockAjax('/floors')


// 请求搜索匹配的商品相关数据
export const reqProductList = (searchParams) => ajax.post('/list', searchParams)

// 获取商品详情信息
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)

// 6.获取购物车列表 /api/cart/cartList
export const reqCartList = () => ajax.get('/cart/cartList')

// 7.添加到购物车(对已有物品进行数量改动)
/* 
skuId: 商品ID
skuNum: 变化的数量   如果增加用正数, 如果减少用负数
*/
export const reqAddToCart = (skuId, skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)

// 8.切换商品选中状态
/* 
0代表取消选中
1代表选中
*/
export const reqCheckCartItem = (skuId, isChecked) => ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)

// 9.删除购物车商品
export const reqDeleteCartItem = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)

/* 
登陆
/api/user/passport/login POST  mobile/password
*/
export function reqLogin (mobile, password) {
  return ajax.post('/user/passport/login', {mobile, password})
  // return ajax({
  //   url: '/user/passport/login',
  //   method: 'POST',
  //   // params: {}, // 指定query参数
  //   data: {mobile, password}, // 指定body参数
  // })
}

/* 
16.注册用户
/api/user/passport/register POST
mobile/password/code
userInfo是包含上面3个属性的对象
*/
export const reqRegister = (userInfo) => ajax.post('/user/passport/register', userInfo)

/* 
退出登陆
/api/user/passport/logout GET
*/
export const reqLogout = () => ajax('/user/passport/logout')