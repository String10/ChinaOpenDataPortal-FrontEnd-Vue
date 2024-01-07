<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import AboutCanvas from '@/components/AboutCanvas.vue'
import FeedbackCanvas from '@/components/FeedbackCanvas.vue'
import PortalFooter from '@/components/PortalFooter.vue'
import ResultFilters from '@/components/ResultFilters.vue'
import { search } from '@/utils/fetch'
import { toThousandFilter } from '@/utils/filters'
import { setLoadingState } from '@/utils/loading'

import type { Filters, CanvasList, Footer } from '@/utils/types'

defineProps<{
  canvas: CanvasList
  footer: Footer
}>()

const filters = ref<Filters>()
const update_filter = (new_filters: Filters) => {
  filters.value = new_filters
  updateView()
}

const route = useRoute()

const timer = setInterval(() => {
  searchTime.value = ((Date.now() - startTime) / 1000).toFixed(2)
}, 1000)

const results = ref([])
const hiddenHeader = ref(true)
const searchTime = ref('0.00')

let startTime: number

const updateView = () => {
  const query = route.query.q
  if (!query || Array.isArray(query) || query.trim() === '') {
    throw new Error('query is empty')
  }

  hiddenHeader.value = true
  setLoadingState(true)

  startTime = Date.now()
  search(query, filters.value).then((items) => {
    clearInterval(timer)

    results.value = items

    hiddenHeader.value = false
    setLoadingState(false)
  })
}
watch(route, updateView)

updateView()
</script>

<template>
  <div class="page-wrapper">
    <div
      class="page-header"
      :class="{
        'visually-hidden': hiddenHeader
      }"
    >
      <div class="container-xl">
        <div class="row g-2 align-items-center">
          <div class="col">
            <h2 class="page-title">搜索结果</h2>
            <div class="text-secondary mt-1">
              发现 {{ toThousandFilter(results.length) }} 个数据集（用时 {{ searchTime }} 秒）
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="container-xl">
        <ResultFilters @update:filters="update_filter" />
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
