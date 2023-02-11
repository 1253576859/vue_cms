import { defineStore } from 'pinia'
import { getEntireDepartment, getEntireRoles } from '@/service/main/main'
import { getEntireMenus } from '@/service/main/system/system'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenu: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenu: []
  }),
  actions: {
    async fetchEntireData () {
      const rolesResult = await getEntireRoles()
      const departmentResult = await getEntireDepartment()
      const menuResult = await getEntireMenus()

      // 保存数据
      this.entireRoles = rolesResult.data.list
      this.entireDepartments = departmentResult.data.list
      this.entireMenu = menuResult.data.list
    }
  }
})

export default useMainStore
