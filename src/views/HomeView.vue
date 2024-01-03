<script setup lang="ts">
import CenteredDivider from '@/components/CenteredDivider.vue'
import PortalFooter from '@/components/PortalFooter.vue'
import RecentActivities from '@/components/RecentActivities.vue'
import StatisticTable from '@/components/StatisticTable.vue'
import { ref } from 'vue'
import AboutCanvas from '@/components/AboutCanvas.vue'
import FeedbackCanvas from '@/components/FeedbackCanvas.vue'
import type { CanvasList, Footer } from '@/utils/types'

defineProps<{
  canvas: CanvasList
  footer: Footer
}>()

const statistic_items = ref([
  { name: '覆盖的省级行政区', value: 1000 },
  { name: '接入的公共数据开放平台', value: 2000 },
  { name: '索引的数据集', value: 2000 }
])
const activity_items = ref([
  {
    title: '系统更新',
    detail: '新增24个平台，索引数据集增加到489,882个。',
    date: new Date('2023.10.14')
  },
  {
    title: '论文上线',
    detail:
      "系统论文 Dataset Search over Integrated Metadata from China's Public Data Open Platforms 被 CCF BigData 2023 接收。",
    date: new Date('2023.08.16')
  },
  {
    title: '系统上线',
    detail: '全国公共数据一站式搜索系统上线，接入124个公共数据开放平台。',
    date: new Date('2023.07.29')
  }
])
</script>

<template>
  <div class="page-wrapper">
    <div class="page-body">
      <div class="container-xl">
        <StatisticTable :items="statistic_items" />
        <CenteredDivider text="近期动态" />
        <RecentActivities :items="activity_items" />
      </div>
    </div>
    <AboutCanvas
      :id="canvas.about.id"
      :label="`${canvas.about.id}-label`"
      :content="canvas.about.content || '暂无内容'"
    />
    <FeedbackCanvas :id="canvas.feedback.id" :label="`${canvas.feedback.id}-label`" />
    <PortalFooter :left_part="footer.left_part" :right_part="footer.right_part" />
  </div>
</template>
