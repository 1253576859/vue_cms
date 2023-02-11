import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type editCallback = (data: any) => void

function usePageModal (editCallback?: editCallback) {
  const modalRef = ref<InstanceType<typeof PageModal>>()

  // 新建的操作
  function handleNewClick () {
    // @ts-ignore：
    modalRef.value?.setModalVisible()
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
