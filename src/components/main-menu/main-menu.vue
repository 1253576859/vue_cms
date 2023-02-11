<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="">
      <h2 class="title" v-show="!isFold">后台管理系统</h2>
    </div>
    <div class="menu">
      
      <!--菜单 -->
      <el-menu
          :default-active="defaultActive"
          text-color="#b7bdc3"
          :collapse="isFold"
          active-text-color="#fff"
          background-color="#001529"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]"/>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleItemClick(subItem)">
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import userLoginStore from '@/store/login/login'
import { useRouter, useRoute } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const loginStore = userLoginStore()
const userMenus = loginStore.userMenus

function handleItemClick (item: any) {
  const url = item.url
  router.push(url)
}

// Elmenu得默认菜单
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})

</script>

<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: #001529;
  
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    
    .img {
      height: 100%;
      margin: 0 10px;
    }
    
    .title {
      font-size: 16px;
      font-size: 700;
      color: white;
      white-space: nowrap;
      padding-left: 3px;
    }
  }
}


.el-menu {
  border-right: none;
  user-select: none;
  
  
}

.el-sub-menu {
  
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }
  
  .el-menu-item:hover {
    color: #fff;
  }
  
  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}

</style>
