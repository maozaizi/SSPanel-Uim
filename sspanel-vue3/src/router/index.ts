import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 路由配置
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/auth/Auth.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/auth/Login.vue'),
        meta: {
          title: '登录'
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../views/auth/Register.vue'),
        meta: {
          title: '注册'
        }
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: () => import('../views/auth/ResetPassword.vue'),
        meta: {
          title: '重置密码'
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/user/UserLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/user/Dashboard.vue'),
        meta: {
          title: '用户中心'
        }
      },
      {
        path: 'nodes',
        name: 'Nodes',
        component: () => import('../views/user/Nodes.vue'),
        meta: {
          title: '节点列表'
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/user/Profile.vue'),
        meta: {
          title: '个人资料'
        }
      },
      {
        path: 'shop',
        name: 'Shop',
        component: () => import('../views/user/Shop.vue'),
        meta: {
          title: '商店'
        }
      },
      {
        path: 'recharge',
        name: 'Recharge',
        component: () => import('../views/user/Recharge.vue'),
        meta: {
          title: '充值'
        }
      },
      {
        path: 'traffic-log',
        name: 'TrafficLog',
        component: () => import('../views/user/TrafficLog.vue'),
        meta: {
          title: '流量明细'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '页面未找到'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - SSPanel UIM` : 'SSPanel UIM'
  
  // 这里将来可以添加认证检查
  // if (to.meta.requiresAuth && !isAuthenticated) {
  //   next({ name: 'Login' })
  // } else {
  //   next()
  // }
  
  next()
})

export default router 