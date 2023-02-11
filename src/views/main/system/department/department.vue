<template>
  <div class="department">
    <page-search
        :searchConfig="searchConfig"
        @query-click="handleQueryClick"
        @reset-click="handleResetClick">
    </page-search>
    <page-content
        ref="contentRef"
        :content-config="contentConfig"
        @new-click="handleNewClick"
        @edit-click="handleEditClick">
    </page-content>
    <page-modal :modal-config="modalConfigRef" ref="modalRef"></page-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import useMainStore from '@/store/main/main'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from '@/views/main/system/department/config/search.config'
import contentConfig from '@/views/main/system/department/config/content.config'
import modalConfig from '@/views/main/system/department/config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      // @ts-ignore：
      item.options.push(...departments)
    }
  })
  
  return modalConfig
})

// 点击search，content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 点击modal的操作
const { modalRef, handleNewClick, handleEditClick } = usePageModal()


</script>

<style scoped>

</style>
