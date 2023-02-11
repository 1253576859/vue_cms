<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @resetClick="handleResetClick"></user-search>
    <div class="content">
      <user-content ref="contentRef" @new-click="handleNewBtnClick"
                    @edit-click="handleEditBtnClick"></user-content>
      <user-modal ref="modalRef"></user-modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'

// 对content组件进行操作
const contentRef = ref<InstanceType<typeof UserContent>>()

function handleQueryClick (formData: any) {
  contentRef.value?.fetchUserListData(formData)
}

function handleResetClick () {
  contentRef.value?.fetchUserListData()
}

// 新建用户的自定义事件
const modalRef = ref<InstanceType<typeof UserModal>>()

function handleNewBtnClick () {
  modalRef.value?.setModalVisible()
}

function handleEditBtnClick (itemData: any) {
  console.log(itemData)
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
