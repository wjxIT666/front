import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/index2',
    name: 'index2',
    component: () => import('../views/Index2.vue')
  },
  {
    path: '/index3',
    name: 'index3',
    component: () => import('../views/Index3.vue')
  },
  {
    path: '/index4/:id',
    name: 'index4',
    components: {
      default: () => import('../views/Index4.vue'),
      listOne: () => import('../components/listOne.vue'),
      listTwo: () => import('../components/listTwo.vue')
    },
    children: [
      {
        path: 'listOne',
        name: 'listOne',
        components: {
          listOne: () => import('../components/listOne.vue')
        }
      },
      {
        path: 'listTwo',
        name: 'listTwo',
        components: {
          listTwo: () => import('../components/listTwo.vue')
        }
      }
    ]
  },
  {
    path: '/index5',
    name: 'index5',
    component: () => import('../views/Index5.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/index6',
    name: 'index6',
    component: () => import('../views/Index6.vue')
  },
  {
    path: '/index7',
    name: 'index7',
    component: () => import('../views/Index7.vue')
  },
  {
    path: '/index8',
    name: 'index8',
    component: () => import('../views/Index8.vue')
  },
  {
    path: '/index9',
    name: 'index9',
    component: () => import('../views/Index9.vue')
  },
  {
    path: '/index10',
    name: 'index10',
    component: () => import('../views/Index10.vue')
  },
  {
    path: '/index11',
    name: 'index11',
    component: () => import('../views/Index11.vue')
  },
  {
    path: '/index12',
    name: 'index12',
    component: () => import('../views/Index12.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/index13',
    name: 'index13',
    component: () => import('../views/Index13.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/index14',
    name: 'index14',
    component: () => import('../views/Index14.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach( (to, from, next) => {
  if (to.meta.auth) {
    next();
  } else {
    let token = sessionStorage.getItem('token');
    if (token) {
      next();
    } else {
      next('/index12');
    }
  }
} )

export default router
