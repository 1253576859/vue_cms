import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type callbackType = (data?: any) => void

function usePageModal (newCallback: callbackType, editCallback?: callbackType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()

  // 新建的操作
  function handleNewClick () {
    // @ts-ignore：
    modalRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }

// 编辑的操作
  function handleEditClick (itemData: any) {
    // @ts-ignore：
    modalRef.value?.setModalVisible(false, itemData)
    if (editCallback) editCallback(itemData)
  }

  return { modalRef, handleNewClick, handleEditClick }
}

export default usePageModal
