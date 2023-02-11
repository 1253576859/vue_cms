<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px"/>
        <el-table-column align="center" type="index" label="序号" width="60px"/>
        <el-table-column align="center" label="部门名称" prop="name" width="120px"/>
        <el-table-column align="center" label="领导名称" prop="leader" width="120px"/>
        <el-table-column align="center" label="上级部门" prop="parentId" width="150px"/>
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
        <el-table-column align="center" label="操作" width="180px">
          <template #default="scope">
            <el-button size="small" icon="Edit" text type="primary" @click="handleEditBtnClick(scope.row)">编辑
            </el-button>
            <el-button size="small" icon="Delete" text type="danger" @click="handleDeleteBtnClick(scope.row.id)">删除
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
          :total="pageTotalCount"
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

// 新建用户的自定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 1.发起请求，获取usersList的数据 //页码相关的逻辑
const currentPage = ref<number>(1)
const pageSize = ref(10)
const systemStore = useSystemStore()
fetchPageListData()

// 2.获取usersLsit，进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

function handleSizeChange () {
  fetchPageListData()
}

function handleCurrentChange () {
  fetchPageListData()
}

// 4.定义函数，发送请求
function fetchPageListData (formData: any = {}) {
  // 1.获取offset和size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { offset, size }
  // 2.发送网络请求
  const queryInfo = { ...info, ...formData }
  systemStore.postPageListAction('department', queryInfo)
}

// 5.删除的操作
function handleDeleteBtnClick (id: number) {
  systemStore.deletePageByIdAction('department', id)
}

// 6.新建用户的按钮
function handleNewUserClick () {
  emit('newClick')
}

// 编辑按钮的点击
function handleEditBtnClick (itemData: any) {
  emit('editClick', itemData)
}

defineExpose({ fetchPageListData })
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
