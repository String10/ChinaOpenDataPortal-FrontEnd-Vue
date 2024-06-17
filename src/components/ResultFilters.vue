<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { isString } from 'lodash'

import { cached_filters } from '@/utils/cache'
import { FilterOpenness, type FilterSet } from '@/utils/types'

defineEmits(['update:filters', 'update:rerank'])

// refer to "apply changes" button
const apply_filters = ref()

const locations = ref<{ [key: string]: string[] }>({})
const industries = ref<string[]>([])

const curr_province = ref()
const curr_city = ref()
const curr_industry = ref()
const type_open_selected = ref(true)
const type_cond_selected = ref(true)

const curr_filters = computed(() => {
  let filters = {
    province: curr_province.value,
    city: curr_city.value,
    industry: curr_industry.value,
    openness: FilterOpenness.None
  }
  if (type_open_selected.value) {
    filters.openness |= FilterOpenness.Open
  }
  if (type_cond_selected.value) {
    filters.openness |= FilterOpenness.Cond
  }
  return filters
})

const reset_filter = () => {
  curr_province.value = Object.keys(locations.value)[0]
  curr_city.value = undefined
  curr_industry.value = industries.value[0]
  type_open_selected.value = true
  type_cond_selected.value = true
}

const invalid_filters = computed(() => {
  return !(type_cond_selected.value || type_open_selected.value)
})

cached_filters().then((res: FilterSet) => {
  const sort_list = (list: string[], top_words: string | string[] = '') => {
    if (isString(top_words)) {
      if (top_words.length > 0 ? list.splice(list.indexOf(top_words), 1) : null) {
        top_words = [top_words]
      } else {
        top_words = []
      }
    } else {
      top_words = top_words.filter((item) => list.includes(item))
      top_words.forEach((word) => {
        list.splice(list.indexOf(word), 1)
      })
    }
    list.sort((a, b) => a.localeCompare(b, 'zh-CN'))
    top_words.forEach((word) => {
      list.unshift(word)
    })
    return list
  }

  let sorted_locations: { [key: string]: string[] } = {}
  sort_list(Object.keys(res.locations), '全部').forEach((key) => {
    var lst = sort_list(res.locations[key], [key, '全部'])
    if (lst.length < 3 && lst.includes('全部')) {
      lst.splice(lst.indexOf('全部'), 1)
    }
    sorted_locations[key] = lst
  })
  locations.value = sorted_locations
  industries.value = sort_list(res.industries, '全部')
  reset_filter()

  // set filter value from url
  const url = new URL(window.location.href)
  const province = url.searchParams.get('province')
  const city = url.searchParams.get('city')
  const industry = url.searchParams.get('industry')
  const openness = url.searchParams.get('openness')
  if (province && province in locations.value) {
    curr_province.value = province
  } else {
    url.searchParams.delete('province')
  }
  if (city && province && locations.value[province]?.includes(city)) {
    curr_city.value = city
  } else {
    url.searchParams.delete('city')
  }
  if (industry && industries.value.includes(industry)) {
    curr_industry.value = industry
  } else {
    url.searchParams.delete('industry')
  }
  switch (openness) {
    case '无条件开放':
      type_cond_selected.value = false
      break
    case '有条件开放':
      type_open_selected.value = false
      break
    default:
      url.searchParams.delete('openness')
  }
  if (window.location.href !== url.href) {
    window.location.replace(url.href)
  }

  // trigger "update:filters" event
  apply_filters.value.click()
})

const show_cites = computed(() => locations.value[curr_province.value]?.length > 0)
watch(curr_province, () => {
  curr_city.value = locations.value[curr_province.value][0]
})
</script>

<template>
  <form method="get" autocomplete="off" novalidate="false">
    <!-- Province -->
    <div class="subheader mb-2">省份</div>
    <div class="mb-3">
      <select name="" class="form-select" v-model="curr_province">
        <option v-for="(province, index) in Object.keys(locations)" :key="index">
          {{ province }}
        </option>
      </select>
    </div>
    <!-- City -->
    <div class="subheader mb-2" v-show="show_cites">城市</div>
    <div class="mb-3" v-show="show_cites">
      <select name="" class="form-select" v-model="curr_city">
        <option v-for="(city, index) in locations[curr_province]" :key="index">
          {{ city }}
        </option>
      </select>
    </div>
    <!-- Industry -->
    <div class="subheader mb-2">行业</div>
    <div class="mb-3">
      <select name="" class="form-select" v-model="curr_industry">
        <option v-for="(industry, index) in industries" :key="index">
          {{ industry }}
        </option>
      </select>
    </div>
    <!-- Openness Type -->
    <div class="subheader mb-2">开放类型</div>
    <div class="mb-3">
      <label class="form-check">
        <input
          type="checkbox"
          class="form-check-input"
          name="form-tags[]"
          value="open"
          :class="{
            'is-invalid': invalid_filters
          }"
          v-model="type_open_selected"
        />
        <span class="form-check-label">无条件开放</span>
      </label>
      <label class="form-check">
        <input
          type="checkbox"
          class="form-check-input"
          name="form-tags[]"
          value="cond"
          :class="{
            'is-invalid': invalid_filters
          }"
          v-model="type_cond_selected"
        />
        <span class="form-check-label">有条件开放</span>
      </label>
    </div>
    <div class="alert alert-danger m-0" v-show="invalid_filters">请选择至少一种开放类型</div>
    <div class="mt-5">
      <a
        class="btn btn-primary w-100"
        href="#"
        ref="apply_filters"
        @click="invalid_filters ? null : $emit('update:filters', curr_filters)"
      >
        <!-- Download SVG icon from https://tabler.io/i/filter -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-filter"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z"
          />
        </svg>
        过滤搜索结果
      </a>
    </div>
  </form>
</template>
