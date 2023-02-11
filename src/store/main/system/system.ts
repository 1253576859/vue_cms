import { defineStore } from 'pinia'
import {
  postUsersListData,
  deleteUserById,
  newUserData,
  editUserData,
  postPageListData,
  deletePageById, newPageData, editPageData
} from '@/service/main/system/system'

interface ISystemStste {
  usersList: any[]
  usersTotalCount: number
  pageList: any[]
  pageTotalCount: number
}

const useSystemStore = defineStore('system', {
  state: (): ISystemStste => {
    return {
      usersList: [],
      usersTotalCount: 0,
      pageList: [],
      pageTotalCount: 0
    }
  },
  actions: {
    async postUsersListAction (queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data

      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async deleteUserByIdAction (id: number) {
      // 1.删除数据的操作
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)

      // 2.重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction (userInfo: any) {
      // 创建新的用户
      const newResult = await newUserData(userInfo)
      console.log(newResult)
      // 重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction (id: number, userInfo: any) {
      // 1.更新用户数据
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)

      // 2.重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    //   针对页面的数据，进行增删改查
    async postPageListAction (pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction (pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)

      // 2.重新请求数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async newPageDataAction (pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)

      // 重新请求数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction (pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)

      // 重新请求数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
