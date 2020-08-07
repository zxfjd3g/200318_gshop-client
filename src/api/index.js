/* 
包含项目中所有接口的请求函数: 接口请求函数
每个函数的返回值都是promise
*/
import ajax from './ajax'

/* 
登陆
/api/user/passport/login POST  mobile/password
*/
export function reqLogin ({mobile, password}) {
  return ajax.post('/user/passport/login', {mobile, password})
  // return ajax({
  //   url: '/user/passport/login',
  //   method: 'POST',
  //   // params: {}, // 指定query参数
  //   data: {mobile, password}, // 指定body参数
  // })
}

/* 
首页三级分类
/api/product/getBaseCategoryList GET
*/
export const reqCategoryList = () => ajax('/product/getBaseCategoryList')
// export const reqCategoryList = () => ajax.get('/product/getBaseCategoryList')
