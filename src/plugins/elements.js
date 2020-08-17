/* 
引入element-ui并配置好
*/
import Vue from 'vue'
// import Element from 'element-ui'  // 完整引入 ==> 打包整个element所有组件
import {Pagination, Button, MessageBox, Message} from 'element-ui'

// Vue.use(Element)
// 注册全局组件
// Vue.component(Pagination.name, Pagination)   // el-pagination
Vue.use(Pagination) // 内部会执行 Vue.component(Pagination.name, Pagination) 
Vue.use(Button)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message



/* 
axios()
// 下面是axios的简写方式
axios.get() // 内部调用axios
axios.post()
*/
