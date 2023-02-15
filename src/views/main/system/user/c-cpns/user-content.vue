<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick" v-if="isCreate">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px"/>
        <el-table-column align="center" type="index" label="序号" width="60px"/>
        <el-table-column align="center" label="用户名" prop="name" width="120px"/>
        <el-table-column align="center" label="真实姓名" prop="realname" width="120px"/>
        <el-table-column align="center" label="手机号码" prop="cellphone" width="150px"/>
        <el-table-column align="center" label="状态" prop="enable" width="80px">
          <!-- 作用域插槽-->
          <template #default="scope">
            <el-button size="small" :type="scope.row.enable ? 'primary': 'danger'" plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column v-if="isUpdate && isDelete" align="center" label="操作" width="180px">
          <template #default="scope">
            <el-button size="small" v-if="isUpdate" icon="Edit" text type="primary"
                       @click="handleEditBtnClick(scope.row)">编辑
            </el-button>
            <el-button size="small" v-if="isDelete" icon="Delete" text type="danger"
                       @click="handleDeleteBtnClick(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="usersTotalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
import usePermissons from '@/hooks/usePermissons'

// 新建用户的自定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 1.发起请求，获取usersList的数据 //页码相关的逻辑
const currentPage = ref<number>(1)
const pageSize = ref(10)
const systemStore = useSystemStore()
fetchUserListData()

const isCreate = usePermissons('users:create')
const isUpdate = usePermissons('users:update')
const isDelete = usePermissons('users:update')


// 2.获取usersLsit，进行展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

function handleSizeChange () {
  fetchUserListData()
}

function handleCurrentChange () {
  fetchUserListData()
}

// 4.定义函数，发送请求
function fetchUserListData (formData: any = {}) {
  // 1.获取offset和size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { offset, size }
  // 2.发送网络请求
  const queryInfo = { ...info, ...formData }
  systemStore.postUsersListAction(queryInfo)
}

// 5.删除的操作
function handleDeleteBtnClick (id: number) {
  systemStore.deleteUserByIdAction(id)
}

// 6.新建用户的按钮
function handleNewUserClick () {
  emit('newClick')
}

// 编辑按钮的点击
function handleEditBtnClick (itemData: any) {
  emit('editClick', itemData)
}

defineExpose({ fetchUserListData })
</script>

<style scoped lang="less">
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
    
    .title {
      font-size: 22px;
    }
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
