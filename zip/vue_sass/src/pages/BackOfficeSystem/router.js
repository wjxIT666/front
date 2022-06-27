import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  //登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('../BackOfficeSystem/views/Login/BLogin.vue'),
    meta: {
      auth: true
    }
  },
  //列表页
  {
    path: '/index',
    name: 'index',
    redirect: '/index/asideCP',
    component: () => import('../BackOfficeSystem/views/Index/Index.vue'),
    children: [
      //企业信息
      {
        path: 'asideCompany',
        name: 'asideCompany',
        component: () => import('../../components/Aside/asideCompanyInfo.vue')
      },
      //云化计划进度表
      {
        path: 'asideBusiness',
        anme: 'asideBusiness',
        component: () => import('../../components/Aside/asideBusiness.vue')
      },
      //运营云化管理
      {
        path: 'asideOperation',
        name: 'asideOperation',
        component: () => import('../../components/Aside/asideOperation.vue')
      },
      //CP云游戏库管理
      {
        path: 'asideCP',
        name: 'asideCP',
        component: () => import('../../components/Aside/asideCP.vue')
      },
      //用户列表
      {
        path: 'asideUser',
        name: 'asideUser',
        component: () => import('../../components/Aside/asideUser.vue')
      },
      //角色权限配置
      {
        path: 'asidePower',
        name: 'asidePower',
        component: () => import('../../components/Aside/asidePower.vue')
      }
    ]
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

router.beforeEach( (to, from, next) => {
  if (to.meta.auth) {
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
