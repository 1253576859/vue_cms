<template>
  <div class="count-card">
    <div class="header">
      <span class="title">{{ title }}</span>
      <el-tooltip class="tips" :content="tips" placement="top" effect="light">
        <el-icon>
          <Warning/>
        </el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span v-if="amount === 'saleroom'">¥</span>
      <span calss="count" ref="number1Ref">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span class="subtitle">{{ subTitle }}</span>
      <span v-if="amount === 'saleroom'">¥</span>
      <span ref="number2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CountUp } from 'countup.js'
import { ref, onMounted } from 'vue'

interface IProps {
  amount?: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subTitle?: string
}

const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tips: '所有商品的总销量',
  count: 509989,
  subTitle: '商品总销量'
})

const number1Ref = ref<HTMLElement>()
const number2Ref = ref<HTMLElement>()
onMounted(() => {
  const countup1 = new CountUp(number1Ref.value!, props.number1!, {})
  countup1.start()
  const countup2 = new CountUp(number2Ref.value!, props.number2!, {})
  countup2.start()
})

</script>

<style scoped lang="less">
.count-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  .header {
    display: flex;
    height: 18px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }
  
  .content {
    display: flex;
    align-items: center;
    marfin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
    flex: 1;
  }
  
  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
