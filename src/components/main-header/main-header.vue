<template>
  <div class="main-header">
    <div class="icon" @click="handleMenuIconClick">
      <el-icon size="25px">
        <component :is="isFold ? 'Expand' :'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumbs">
        <header-crumb></header-crumb>
      </div>
      <div class="info">
        <header-info></header-info>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import HeaderInfo from '@/components/main-header/c-cpns/header-info.vue'
import HeaderCrumbs from '@/components/main-header/c-cpns/header-crumb.vue'

const emit = defineEmits(['foldChange'])

const isFold = ref(false)

function handleMenuIconClick () {
  // 内部改变事件
  isFold.value = !isFold.value
  
  // 将事件传递出去
  emit('foldChange', isFold.value)
  
}

</script>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  
  .icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}

</style>
