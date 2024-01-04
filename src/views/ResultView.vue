<script setup lang="ts">
import AboutCanvas from '@/components/AboutCanvas.vue'
import FeedbackCanvas from '@/components/FeedbackCanvas.vue'
import PortalFooter from '@/components/PortalFooter.vue'
import type { CanvasList, Footer } from '@/utils/types'
import { search } from '@/utils/fetch'
import { useRoute } from 'vue-router'

defineProps<{
  canvas: CanvasList
  footer: Footer
}>()

const route = useRoute()
const query = route.query.q
if (!query || Array.isArray(query) || query.trim() === '') {
  throw new Error('query is empty')
}

const results = search(query)
results.then((items) => {})
</script>

<template>
  <div class="page-wrapper">
    <div class="page-body">
      <div class="container-xl"></div>
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
