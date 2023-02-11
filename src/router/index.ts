import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { firstMenu } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系: path => component
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue'),
      children: []
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 用户进行刷新：判断用户是否登录以及是否包含userMenus菜单
// 导航守卫
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

// 如果进入到main中
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
