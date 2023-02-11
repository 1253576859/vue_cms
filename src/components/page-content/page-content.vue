<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handleNewUserClick">{{
          contentConfig?.header?.btnTitle ?? '新建数据'
        }}
      </el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%" row-key="id"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button size="small" icon="Edit" text type="primary" @click="handleEditBtnClick(scope.row)">编辑
                </el-button>
                <el-button size="small" icon="Delete" text type="danger" @click="handleDeleteBtnClick(scope.row.id)">删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item">
            </el-table-column>
          </template>
        </template>
      
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


interface IProps {
  contentConfig: {
    pageName: string,
    header?: {
      title?: string,
      btnTitle?: string
    },
    propsList: any[]
  }
}

const props = defineProps<IProps>()

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
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 5.删除的操作
function handleDeleteBtnClick (id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
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
