import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
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
  },
  {
    path: '/my/articles',
    component: () => import('@/views/layout/my/articles'),
    meta: {
      needLogin: true
    }
  },
  {
    path: '/my/collect',
    component: () => import('@/views/layout/my/collect'),
    meta: {
      needLogin: true
    }
  },
  {
    path: '/my/like',
    component: () => import('@/views/layout/my/like'),
    meta: {
      needLogin: true
    }
  },
]

const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location, onResolve, onReject) {

  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)

  return originalPush.call(this, location).catch(err => err)

}


router.beforeEach((to, from, next) => {
  /* must call `next` */
  if (to.meta.needLogin && !store.getters.token) return next('/login?url=' + to.path)
  next()

});
export default router
