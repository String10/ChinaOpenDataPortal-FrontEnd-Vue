<script setup lang="ts">
import { ref } from 'vue'

import AboutCanvas from '@/components/AboutCanvas.vue'
import CenteredDivider from '@/components/CenteredDivider.vue'
import FeedbackCanvas from '@/components/FeedbackCanvas.vue'
import PortalFooter from '@/components/PortalFooter.vue'
import RecentActivities from '@/components/RecentActivities.vue'
import StatisticTable from '@/components/StatisticTable.vue'

import { cached_activities, cached_statistics } from '@/utils/cache'
import type { Activity, CanvasList, Footer, Statistic } from '@/utils/types'

defineProps<{
  canvas: CanvasList
  footer: Footer
}>()

const statistic_items = ref<Statistic[]>([])
cached_statistics().then((res) => {
  statistic_items.value = res
})

const activity_items = ref<Activity[]>([])
cached_activities().then((res) => {
  activity_items.value = res
})
</script>

<template>
  <div class="page-wrapper">
    <div class="page-body">
      <div class="container-xl">
        <div class="col-12">
          <StatisticTable :items="statistic_items" />
        </div>
        <CenteredDivider text="近期动态" />
        <div class="col-12 mt-3">
          <RecentActivities :items="activity_items" />
        </div>
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
