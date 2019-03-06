import Vue from "vue";
import VueRouter from 'vue-router';

// 引入组件

import todolist from "./todolist.vue";
import Hello from "./Hello.vue";
// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
  {
    path:"/Hello",
    component: Hello
  },
  {
    path: "/todolist",
    component: todolist
  },
  // 重定向
  {
    path: "/",
    redirect: "/Hello"
  }
]

var router =  new VueRouter({
  routes
})
export default router;
