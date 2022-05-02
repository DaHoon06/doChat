import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/doChat',
  },
  {
    path:'/doChat',
    name: 'index',
    component: () => import('@/views/Home.vue'),
  },
  {
    path:'/chat',
    name: 'chat',
    component: () => import('@/views/chat/ChatList.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
