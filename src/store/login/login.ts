import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenuByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenuListToPermissions, mapMenuToRoutes } from '@/utils/map-menus'
import useMainStore from '@/store/main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction (account: IAccount) {
      // 账号登录, 获取token等信息
      const res = await accountLoginRequest(account)
      const id = res.data.id
      this.token = res.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 获取登录用户的角色信息
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 根据用户角色，获取管理权限
      const userMenuResult = await getUserMenuByRoleId(this.userInfo.role.id)
      const userMenus = userMenuResult.data
      this.userMenus = userMenus

      // 重要：获取登录用户的登录权限
      const permissions: string[] = mapMenuListToPermissions(userMenus)
      this.permissions = permissions


      // 进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 请求role/department的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireData()

      // 3.页面跳转
      router.push('/main')
    },
    loadLocalCacheAction () {
      // 用户进行刷新默认加载
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 1.请求role/department的数据
        const mainStore = useMainStore()
        mainStore.fetchEntireData()
        // 2.获取按钮的权限
        const permissions: string[] = mapMenuListToPermissions(userMenus)
        this.permissions = permissions
        // 3.动态添加路由
        const routes = mapMenuToRoutes(userMenus)
        routes.forEach((route) => {
          router.addRoute('main', route)
        })
      }
    }
  }
})

export default useLoginStore
