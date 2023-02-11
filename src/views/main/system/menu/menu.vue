<template>
  <div class="menu">
    <page-content :content-config="contentConfig"></page-content>
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from '@/views/main/system/menu/config/countent.config'

</script>

<style scoped></style>
