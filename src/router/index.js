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
        pageTitle: 'Employees',
        parent: 'employees'
      }
    }]
  },
  {
    path: '/tickets',
    component: () => import('@/layouts/Main'),
    children: [{
        path: 'list',
        name: 'list tickets',
        component: () => import('@/views/Tickets/List'),
        meta: {
          requiredAuth: true,
          pageTitle: 'Tickets',
          parent: 'tickets'
        }
      },
      {
        path: 'create',
        name: 'create ticket',
        component: () => import('@/views/Tickets/Create'),
        meta: {
          requiredAuth: true,
          pageTitle: 'Create ticket',
          parent: 'tickets'
        }
      },
      {
        path: 'view/:id',
        name: 'view ticket',
        component: () => import('@/views/Tickets/View'),
        meta: {
          requiredAuth: true,
          pageTitle: 'View ticket',
          parent: 'tickets'
        }
      }
    ]
  },
  {
    path: '/reports',
    component: () => import('@/layouts/Main'),
    children: [{
      path: 'employees',
      name: 'employees report',
      component: () => import('@/views/Reports/Employees'),
      meta: {
        requiredAuth: true,
        pageTitle: 'Employees report',
        parent: 'reports'
      }
    }]
  },
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