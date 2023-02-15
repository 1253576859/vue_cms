<template>
  <div class="charts-card">
    <div class="header">
      <span class="title">卡片的头部标题</span>
    </div>
    <div class="main" ref="echartsRef" style="width:300px;height:240px">
      <span class="content">默认内容</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts';

const echartsRef = ref<HTMLElement>()

onMounted(() => {
  const myChart = echarts.init(echartsRef.value!, 'light', {
    renderer: 'canvas'
  });
  
  const option = {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [20, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          { value: 28, name: 'rose 5' },
          { value: 26, name: 'rose 6' },
          { value: 22, name: 'rose 7' },
          { value: 18, name: 'rose 8' }
        ]
      }
    ]
  };
  option && myChart.setOption(option);
})

</script>

<style scoped lang="less">
.charts-card {
  height: 300px;
  margin: 10px 5px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  .header {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f0f0f0;
    
    .title {
      margin: 10px;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.8);
      
    }
  }
  
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 260px;
    font-size: 16px;
    line-height: 20px;
    margin: 10px 20px;
  }
}
</style>
