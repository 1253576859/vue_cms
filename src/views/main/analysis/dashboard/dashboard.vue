<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6">
          <count-card v-bind="item"></count-card>
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="10">
      <template v-for="item in 3">
        <el-col :span="8">
          <charts-card></charts-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import CountCard from './c-cpns/count-card/count-card.vue'
import ChartsCard from '@/views/main/analysis/dashboard/c-cpns/chatrs-card/charts-card.vue'
import useAnalysisSytore from '@/store/main/analysis/analysis'
import { storeToRefs } from 'pinia'

// 发起请求，从store中获取数据
const analysisStore = useAnalysisSytore()
analysisStore.fetchAnalysisDataAction()

const { amountList } = storeToRefs(analysisStore)


</script>

<style scoped>

</style>
