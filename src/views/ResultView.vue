<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { isEqual } from 'lodash'

import AboutCanvas from '@/components/AboutCanvas.vue'
import EmptyResult from '@/components/EmptyResult.vue'
import ExplanationModal from '@/components/ExplanationModal.vue'
import FeedbackCanvas from '@/components/FeedbackCanvas.vue'
import LLMLoadingResult from '@/components/LLMLoadingResult.vue'
import PortalFooter from '@/components/PortalFooter.vue'
import ResultFilters from '@/components/ResultFilters.vue'
import ResultItem from '@/components/ResultItem.vue'

import { isMobile } from '@/utils/device'
import { search } from '@/utils/fetch'
import { searchResultFilter, toThousandFilter } from '@/utils/filters'
import { isLoading, setLoadingState } from '@/utils/loading'
import { page_items, swipe_up_handler_factory, touch_start } from '@/utils/pagination'
import {
  FilterOpenness,
  type CanvasList,
  type Filters,
  type Footer,
  type SearchResult
} from '@/utils/types'

defineProps<{
  canvas: CanvasList
  footer: Footer
}>()

const route = useRoute()

// search filters
const filters = ref<Filters>()
const update_filter = (new_filters: Filters) => {
  if (isEqual(filters.value, new_filters)) {
    return
  }
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
      url.searchParams.set('openness', '无条件开放')
      break
    case FilterOpenness.Cond:
      url.searchParams.set('openness', '有条件开放')
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
const reached_bottom = computed(() => curr_page_size.value >= results.value.length)
const swipe_up_handler = swipe_up_handler_factory(() => {
  if (!isMobile() || reached_bottom.value) {
    return
  }
  curr_page_size.value += default_page_size
})

// calculate search time
const searchTime = ref('0.00')

// refetch results & update view
const is_loading = isLoading()
const rerank = ref(true)
const update_rerank = (new_rerank: boolean) => {
  let old_rerank = rerank.value
  rerank.value = new_rerank

  if (old_rerank != new_rerank) {
    updateView()
  }
}
const updateView = () => {
  const query = route.query.q
  if (!query || Array.isArray(query) || query.trim() === '') {
    throw new Error('query is empty')
  }

  setLoadingState(true)

  let startTime = Date.now()
  search(query, filters.value, rerank.value).then((items) => {
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
    } else {
      if (isMobile()) {
        curr_page_size.value = default_page_size
      } else {
        curr_page.value = 1
      }
    }

    searchTime.value = ((Date.now() - startTime) / 1000).toFixed(2)
    setLoadingState(false)
  })
}

// search result explanation
const explanation = ref<string>('')
const update_explanation = (new_explanation: string) => {
  explanation.value = new_explanation
}

watch(() => route.query?.q, updateView)
</script>

<template>
  <div class="page-wrapper" @touchstart="touch_start = $event" @touchend="swipe_up_handler">
    <div class="page-header">
      <div class="container-xl">
        <div class="row g-2 align-items-center">
          <div class="col">
            <h2 class="page-title">搜索结果</h2>
            <div class="text-secondary mt-1" v-show="!is_loading">
              发现 {{ toThousandFilter(results.length) }} 个数据集（用时 {{ searchTime }} 秒）
            </div>
          </div>
          <div class="col d-flex justify-content-end">
            <div class="text-secondary mt-1 ms-auto" v-show="rerank">
              大语言模型排序功能已启用（耗时可能较长）
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="container-xl">
        <div class="row g-4">
          <div class="col-sm-6 col-lg-3">
            <ResultFilters @update:filters="update_filter" @update:rerank="update_rerank" />
          </div>
          <div class="col-sm-6 col-lg-9">
            <div class="row row-cards">
              <EmptyResult v-if="!(is_loading || results.length > 0)" />
              <LLMLoadingResult v-show="is_loading && rerank" />
              <ResultItem
                v-show="(!is_loading && results.length > 0) || !rerank"
                v-for="(result, index) in results.slice(curr_page_start - 1, curr_page_end)"
                :key="index"
                :id="`result-item-${result.doc_id}`"
                :query="route.query.q as string"
                :result="searchResultFilter(result)"
                :expanded="curr_result === result.doc_id"
                @click="curr_result = curr_result === result.doc_id ? -1 : result.doc_id"
                @update:explanation="update_explanation"
              />
              <span v-show="isMobile() && reached_bottom" class="text-center text-secondary"
                >已经到底了...</span
              >
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
    <ExplanationModal :content="explanation" />
    <PortalFooter :left_part="footer.left_part" :right_part="footer.right_part" />
  </div>
</template>
