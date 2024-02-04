<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import AboutCanvas from '@/components/AboutCanvas.vue'
import FeedbackCanvas from '@/components/FeedbackCanvas.vue'
import PortalFooter from '@/components/PortalFooter.vue'
import ResultFilters from '@/components/ResultFilters.vue'
import EmptyResult from '@/components/EmptyResult.vue'
import ResultItem from '@/components/ResultItem.vue'

import { search } from '@/utils/fetch'
import { searchResultFilter, toThousandFilter } from '@/utils/filters'
import { setLoadingState, is_loading } from '@/utils/loading'
import { isMobile } from '@/utils/device'
import { page_items, swipe_up_handler_factory, touch_start } from '@/utils/pagination'
import {
  type Filters,
  type CanvasList,
  type Footer,
  type SearchResult,
  FilterOpenness
} from '@/utils/types'

defineProps<{
  canvas: CanvasList
  footer: Footer
}>()

const route = useRoute()

// search filters
const filters = ref<Filters>()
const update_filter = (new_filters: Filters) => {
  filters.value = new_filters

  const url = new URL(window.location.href)
  if (new_filters.province && new_filters.province != '全部') {
    url.searchParams.set('province', `${new_filters.province}`)
  } else {
    url.searchParams.delete('province')
  }
  if (new_filters.city && new_filters.city != '全部') {
    url.searchParams.set('city', `${new_filters.city}`)
  } else {
    url.searchParams.delete('city')
  }
  if (new_filters.industry && new_filters.industry != '全部') {
    url.searchParams.set('industry', `${new_filters.industry}`)
  } else {
    url.searchParams.delete('industry')
  }
  switch (new_filters.openness) {
    case FilterOpenness.Open:
      url.searchParams.set('openness', 'open')
      break
    case FilterOpenness.Cond:
      url.searchParams.set('openness', 'cond')
      break
    default:
      url.searchParams.delete('openness')
  }
  window.history.pushState({}, '', url.href)

  updateView()
}

// save current result index
const results = ref<SearchResult[]>([])
const curr_result = ref(-1)
watch(curr_result, (doc_id) => {
  const url = new URL(window.location.href)
  if (doc_id < 0) {
    url.searchParams.delete('doc_id')
    window.history.pushState({}, '', url.href)
    return
  }
  const result = results.value.filter((item) => item.doc_id === doc_id)
  if (result) {
    url.searchParams.set('doc_id', `${doc_id}`)
    window.history.pushState({}, '', url.href)
  }
})

// result pagination
const default_page_size = 5
const curr_page = ref(1)
const curr_page_size = ref(default_page_size)
const curr_page_count = computed(() => Math.ceil(results.value.length / curr_page_size.value))
const curr_page_items = computed(() =>
  page_items(curr_page.value, curr_page_count.value, curr_page_size.value)
)
const curr_page_start = computed(() => (curr_page.value - 1) * curr_page_size.value + 1)
const curr_page_end = computed(() =>
  Math.min(results.value.length, curr_page.value * curr_page_size.value)
)

// result pagination for mobile device
const swipe_up_handler = swipe_up_handler_factory(() => {
  if (!isMobile() || curr_page_size.value >= results.value.length) {
    return
  }
  curr_page_size.value += default_page_size
})

// calculate search time
let startTime: number
const searchTime = ref('0.00')
const timer = setInterval(() => {
  searchTime.value = ((Date.now() - startTime) / 1000).toFixed(2)
}, 1000)

// refetch results & update view
const updateView = () => {
  const query = route.query.q
  if (!query || Array.isArray(query) || query.trim() === '') {
    throw new Error('query is empty')
  }

  setLoadingState(true)

  startTime = Date.now()
  search(query, filters.value).then((items) => {
    clearInterval(timer)

    results.value = items

    const url = new URL(window.location.href)
    const doc_id = url.searchParams.get('doc_id')
    if (doc_id && items.length > 0) {
      const idx = items.findIndex((item) => item.doc_id === +doc_id)
      if (idx >= 0) {
        curr_result.value = items[idx].doc_id
        if (isMobile()) {
          curr_page_size.value = Math.ceil((idx + 1) / default_page_size) * default_page_size
        } else {
          curr_page.value = Math.ceil((idx + 1) / curr_page_size.value)
        }
        nextTick(() => {
          const element = document.getElementById(`result-item-${doc_id}`)!
          element.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
        })
      } else {
        url.searchParams.delete('doc_id')
        window.location.replace(url.href)
      }
    }

    setLoadingState(false)
  })
}
watch(route, updateView)

updateView()
</script>

<template>
  <div class="page-wrapper" @touchstart="touch_start = $event" @touchend="swipe_up_handler">
    <div class="page-header" v-show="!is_loading">
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
        <div class="row g-4">
          <div class="col-sm-6 col-lg-3">
            <ResultFilters @update:filters="update_filter" />
          </div>
          <div class="col-sm-6 col-lg-9">
            <div class="row row-cards">
              <EmptyResult v-if="!(is_loading || results.length > 0)" />
              <ResultItem
                v-for="(result, index) in results.slice(curr_page_start - 1, curr_page_end)"
                :key="index"
                :id="`result-item-${result.doc_id}`"
                :result="searchResultFilter(result)"
                :expanded="curr_result === result.doc_id"
                @click="curr_result = curr_result === result.doc_id ? -1 : result.doc_id"
              />
            </div>
            <div
              class="d-flex align-items-center mt-5"
              v-if="!(is_loading || isMobile()) && results.length > 0"
            >
              <p class="m-0 text-secondary">
                正在展示
                <span>{{ results.length }}</span>
                个数据集中的第
                <span>{{ curr_page_start }}</span>
                项到第
                <span>{{ curr_page_end }}</span>
                项
              </p>
              <ul class="pagination m-0 ms-auto">
                <li
                  class="page-item"
                  :class="{
                    disabled: curr_page <= 1
                  }"
                >
                  <a class="page-link" href="#" @click="(curr_result = -1), (curr_page -= 1)">
                    <!-- Download SVG icon from http://tabler-icons.io/i/chevron-left -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M15 6l-6 6l6 6"></path>
                    </svg>
                    上一页
                  </a>
                </li>
                <li
                  class="page-item"
                  v-for="page in curr_page_items"
                  :key="page"
                  :class="{
                    active: page === curr_page
                  }"
                >
                  <a class="page-link" href="#" @click="(curr_result = -1), (curr_page = page)">{{
                    page
                  }}</a>
                </li>
                <li
                  class="page-item"
                  :class="{
                    disabled: curr_page >= curr_page_count
                  }"
                >
                  <a class="page-link" href="#" @click="(curr_result = -1), (curr_page += 1)">
                    下一页
                    <!-- Download SVG icon from http://tabler-icons.io/i/chevron-right -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M9 6l6 6l-6 6"></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
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
