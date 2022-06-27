import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // 登录路由
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login/Login.vue'),
    meta: {
      Authorization: true
    }
  },
  // 注册路由
  {
    path: '/register',
    name: 'register',
    component: () => import('./views/Register/Register.vue'),
    meta: {
      Authorization: true
    }
  },
  // 重置密码
  {
    path: '/password',
    name: 'password',
    component: () => import('./views/PassWord/PassWord.vue'),
    meta: {
      Authorization: true
    }
  },
  // 入驻信息
  {
    path: '/entry',
    name: 'entry',
    component: () => import('./views/Entry/Entry.vue')
  },
  // 入驻审核信息
  {
    path: '/auditEntry',
    name: 'auditEntry',
    component: () => import('./views/Entry/AuditEntry.vue')
  },
  // 入驻修改信息
  {
    path: '/updateEntry',
    name: 'updateEntry',
    component: () => import('./views/Entry/UpdateEntry.vue')
  },
  // 选择服务
  {
    path: '/service',
    name: 'service',
    component: () => import('./views/Service/Service.vue')
  },
  // 基本信息
  {
    path: '/baseInfo',
    name: 'baseInfo',
    component: () => import('./views/Info/BaseInfo.vue')
  },
  // 更改基本信息
  {
    path: '/updateBaseInfo',
    name: 'updateBaseInfo',
    component: () => import('./views/UpdateInfo/UpdateBaseInfo.vue')
  },
  // 联系人信息
  {
    path: '/customerInfo',
    name: 'customerInfo',
    component: () => import('./views/Info/CustomerInfo.vue')
  },
  // 更改联系人信息
  {
    path: '/updateCustomerInfo',
    name: 'updateCustomerInfo',
    component: () => import('./views/UpdateInfo/UpdateCustomerInfo.vue')
  },
  // 主页
  {
    path: '/index',
    name: 'index',
    redirect: '/index/asideIndexResource',
    component: () => import('./views/Index/Index.vue'),
    children: [
      // 资源管理子路由
      {
        path: 'asideIndexResource',
        name: 'asideIndexResource',
        component: () => import('../../components/Aside/IndexResource.vue')
      },
      // 云微端
      {
        path: 'asideIndexAndroid',
        name: 'asideIndexAndroid',
        component: () => import('../../components/Aside/IndexAndroid.vue')
      },
      // 云游戏URL
      {
        path: 'asideIndexURL',
        name: 'asideIndexURL',
        component: () => import('../../components/Aside/IndexURL.vue')
      }
    ]
  },
  // 帮助中心
  {
    path: '/answer',
    name: 'answer',
    redirect: '/answer/Acount',
    component: () => import('./views/Answer/Answer.vue'),
    children: [
      {
        path: 'Acount',
        name: 'Acount',
        component: () => import('../../components/Aside/Main.vue'),
        meta: {
          Authorization: true
        }
      },
      {
        path: 'H5',
        name: 'H5',
        component: () => import('../../components/Aside/MainH5.vue'),
        meta: {
          Authorization: true
        }
      },
      {
        path: 'other',
        name: 'other',
        component: () => import('../../components/Aside/MainOther.vue'),
        meta: {
          Authorization: true
        }
      }
    ],
    meta: {
      Authorization: true
    }
  },
  {
    path: '*',
    redirect: '/login'
  }
]

//解决vue跳转同一路径报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//解决在经过build/webpack.prod.conf.js的chunkhash打包后的JS文件hash值会有变更,因为每次更新代码到线上都会删除旧的dist目录,将最新的dist目录copy上传提供后台更新. 在更新代码的这个过程用户停留在页面上,当用户在更新完后重新操作就会导致报错
router.onError( err => {
  console.log(err);
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = err.message.match(pattern);
  if (isChunkLoadFailed) {
    let chunkBool = sessionStorage.getItem('chunkError');
    let nowTimes = Date.now();
    if (chunkBool === null || chunkBool && nowTimes - parseInt(chunkBool) > 60000) {//路由跳转报错,href手动跳转
      sessionStorage.setItem('chunkError', 'reload');
      const targetPath = routers.history.pending.fullPath;
      window.location.href = window.location.origin + targetPath;
    }else if(chunkBool === 'reload'){ //手动跳转后依然报错,强制刷新
      sessionStorage.setItem('chunkError', Date.now());
      window.location.reload(true);
    }
  }
});

//设置全局导航首位
router.beforeEach( (to, from, next) => {
  if (to.meta.Authorization) {
    next();
  } else {
    let token = sessionStorage.getItem('token');
    if (token) {
      next();
    } else {
      next('/login');
    };
  };
} ); 

export default router
