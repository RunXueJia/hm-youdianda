import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/layout/home'),
      },
      {
        path: 'my',
        component: () => import('@/views/layout/my'),
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
  },
  {
    path: '/reg',
    component: () => import('@/views/reg'),
  }
]

const router = new VueRouter({
  routes
})

export default router
