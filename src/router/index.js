import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    redirect: '/auth/login'
  },
  {
    path: '/auth',
    component: () => import('@/layouts/Auth'),
    children: [{
      path: 'login',
      name: 'login',
      component: () => import('@/views/Auth/Login'),
      meta: {
        requiredAuth: false,
        pageTitle: 'Login'
      }
    }]
  },
  {
    path: '/employees',
    component: () => import('@/layouts/Main'),
    children: [{
      path: 'list',
      name: 'list employee',
      component: () => import('@/views/Employees/List'),
      meta: {
        requiredAuth: true,
        pageTitle: 'Employees'
      }
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.pageTitle;
  next()
})

export default router