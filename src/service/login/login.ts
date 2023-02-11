import hyRequest from '..'
import type { IAccount } from '@/types'
// import { LOGIN_TOKEN } from '@/global/constants'
// import { localCache } from '@/utils/cache'

export function accountLoginRequest (account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById (id: number) {
  return hyRequest.get({
    url: `/users/${ id }`
    /* headers: {
       Authorization: localCache.getCache(LOGIN_TOKEN)
     }*/
  })
}

export function getUserMenuByRoleId (id: number) {
  return hyRequest.get({
    url: `/role/${ id }/menu`
  })
}
