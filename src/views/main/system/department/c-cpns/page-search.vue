<template>
  <div class="search">
    <!--输入搜索关键词的表单-->
    <el-form :model="searchForm" size="large" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" label-width="100px" prop="name">
            <el-input placeholder="请输入查询的部门名称" v-model="searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" label-width="100px" prop="leader">
            <el-input placeholder="请输入查询的部门领导" v-model="searchForm.leader"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" label-width="100px" prop="createAt">
            <el-date-picker
                type="daterange"
                range-separator=" - "
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                v-model="searchForm.createAt"
            />
          </el-form-item>
        </el-col>
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

// 自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

// 定义form的数据
const searchForm = reactive({
  name: '',
  leader: '',
  createAt: ''
})
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
