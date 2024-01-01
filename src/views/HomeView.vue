<script setup lang="ts">
import StatisticTable from '@/components/StatisticTable.vue'
import { ref } from 'vue'

const items = ref([
  { name: '覆盖的省级行政区', value: 1000 },
  { name: '接入的公共数据开放平台', value: 2000 },
  { name: '索引的数据集', value: 2000 }
])
</script>

<template>
  <div class="page-wrapper">
    <div class="page-body">
      <div class="container-xl">
        <StatisticTable :items="items" />
      </div>
    </div>
  </div>
</template>
