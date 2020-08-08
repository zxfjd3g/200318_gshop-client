/* 
对axios进行二次包装 (专门针对mock接口)
1. 配置通用的基础路径和超时
2. 显示请求进度条
  显示进度条: 请求拦截器回调
  结束进度条: 响应拦截器回调
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false }) // 隐藏右侧的旋转进度条

// 创建instance
const instance = axios.create({
  // baseURL: 'http://182.92.128.115/api',
  baseURL: '/mock',
  timeout: 20000
})

// 指定请求拦截器
instance.interceptors.request.use(config => {
  // 显示进度条: 请求拦截器回调
  NProgress.start()

  return config // 必须返回config
}) 


// 指定响应拦截器
instance.interceptors.response.use(
  response => { // 成功的回调
    // 结束进度条: 响应拦截器回调
    NProgress.done()
    // 成功返回的数据不再是response, 而直接是响应体数据response.data
    return response.data
  },

  error => { // 失败的回调
    // 结束进度条: 响应拦截器回调
    NProgress.done()
    // 统一处理请求错误, 具体请求也可以选择处理或不处理
    alert('请求出错: ' + error.message||'未知错误')

    // throw error
    return Promise.reject(error) // 将错误向下传递
  }
)

// 向外暴露instance
export default instance