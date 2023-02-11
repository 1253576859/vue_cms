import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'

function loadRoutes () {
  const localRoutes: RouteRecordRaw[] = []
  // 1.获取router/main下的所有ts文件
  const files: Record<string, any> = import.meta.globEager('../router/main/**/*.ts')

  // 1.2对加载的对象放到localRoutes里
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null

export function mapMenuToRoutes (userMenus: any[]) {
  // 加载本地路由
  const localRoutes = loadRoutes()

  // 2 根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find(item => item.path === subMenu.url)
      if (route) {
        // 给route的顶层菜单增加重定向功能（但是只增加一次即可）
        if (!routes.find(item => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route })
        }
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = subMenu
    }
  }
  return routes
}


/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的李靖
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu (path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu
      }
    }
  }
  return undefined
}

export function mapPathToBreadcrumb (path: string, userMenus: any[]) {
  // 1.定义面包屑的数组
  const breadcrumbs: any [] = []

  // 2.遍历获取面包屑的层级
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 *菜单映射到id列表
 * @param menuList
 */
export function mapMenuListToIds (menuList: any[]) {
  const ids: number[] = []

  function recurseGetIds (menus: any) {
    for (const item of menus) {
      if (item.children) {
        recurseGetIds(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }

  recurseGetIds(menuList)
  return ids
}
