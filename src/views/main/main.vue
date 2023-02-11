<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isFold ?'60px':'210px'">
        <main-menu :is-fold="isFold"></main-menu>
      </el-aside>
      <el-container>
        <el-header height="60px">
          <main-header @fold-change="handleFoldChange"></main-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainMenu from "@/components/main-menu/main-menu.vue"
import MainHeader from "@/components/main-header/main-header.vue"

const isFold = ref(false)

function handleFoldChange (flag: boolean) {
  isFold.value = flag
}

</script>

<style lang="less" scoped>
.main-container {
  width: 100vw;
  height: 100vh;
  
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transtion: width 0.3s linear;
    scrollbar-width: none; // Firefox
    -ms-overflow-style: none; // IE10+
    transition: width 0.3s ease;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
