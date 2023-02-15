<template>
  <div class="role">
    <page-search
        :search-config="searchConfig"
        @query-click="handleQueryClick"
        @reset-click="handleResetClick"
    ></page-search>
    <page-content
        :content-config="contentConfig"
        ref="contentRef"
        @new-click="handleNewClick"
        @edit-click="handleEditClick"
    ></page-content>
    <page-modal
        :other-info="otherInfo"
        :modal-config="modalConfig"
        ref="modalRef"
    >
      <template #menuList>
        <el-tree
            ref="treeRef"
            :data="entireMenu"
            show-checkbox
            node-key="id"
            :props="{children:'children',label:'name'}"
            @check="handlerElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'
import { mapMenuListToIds } from '@/utils/map-menus'
import type { ElTree } from 'element-plus'
import useMainStore from '@/store/main/main'

import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from '@/views/main/system/role/config/search.config'
import contentConfig from '@/views/main/system/role/config/content.config'
import modalConfig from '@/views/main/system/role/config/modal.config'
import usePageModal from '@/hooks/usePageModal'
import usePageContent from '@/hooks/usePageContent'

// 逻辑管理
const { modalRef, handleNewClick, handleEditClick } = usePageModal(newCallback, editCallback)
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 获取完整的菜单
const mainStore = useMainStore()
const { entireMenu } = storeToRefs(mainStore)
const otherInfo = ref({})
const treeRef = ref<InstanceType<typeof ElTree>>()

function handlerElTreeCheck (data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

function newCallback () {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}

function editCallback (itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}

</script>

<style scoped>

</style>
