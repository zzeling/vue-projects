import Vue from 'vue'

import App from './App' //从当前目录下，引入组件 App
import router from "./router.js"

Vue.config.productionTip = false //关闭vue 的生产提示

new Vue({
  el: '#app', //挂载点：网页同 id 为 app 的元素节点
  router,     //路由 ****
  template: '<App/>',
  components: { App:App }  //定义组件并局部注册组件
})
