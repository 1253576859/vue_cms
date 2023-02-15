<template>
  <div class="search" v-if="isQuery">
    <!--输入搜索关键词的表单-->
    <el-form :model="searchForm" size="large" ref="formRef">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder"></el-input>
              </template>
              <template v-if="item.type === 'data-picker'">
                <el-date-picker
                    type="daterange"
                    range-separator=" - "
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    v-model="searchForm[item.prop]"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!--重置和搜搜按钮！-->
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button size="large" type="primary" icon="Search" @click="handleQueryClick">搜索</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import usePermissions from '@/hooks/usePermissons'

// 自定义事件|接受的属性
interface IProps {
  searchConfig: {
    pageName: string
    labelWidth?: string
    formItems: any[]
  }
}

const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<IProps>()

const isQuery = usePermissions(`${ props.searchConfig.pageName }:query`)

// 定义form的数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)
const formRef = ref<InstanceType<typeof ElForm>>()

// 重置按钮
function handleResetClick () {
  // 1.form中的数据进行重置
  formRef.value?.resetFields()
  
  // 2.将事件发送出去，content内部重新发送网络请求
  emit('resetClick')
}

// 查询按钮
function handleQueryClick () {
  emit('queryClick', searchForm)
}

</script>

<style scoped lang="less">
.search {
  background-color: #fff;
  padding: 20px;
  
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
  
  .btns {
    display: flex;
    justify-content: flex-end;
    padding: 0 50px 10px 0;
  }
}
</style>
