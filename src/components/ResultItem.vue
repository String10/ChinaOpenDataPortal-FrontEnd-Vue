<script setup lang="ts">
import { ref } from 'vue'

import { explain } from '@/utils/fetch'
import { setLoadingState } from '@/utils/loading'
import type { SearchResult } from '@/utils/types'

const props = defineProps<{
  query: string
  result: SearchResult
  expanded: boolean
}>()

const emit = defineEmits(['update:explanation'])

const explain_button = ref<HTMLElement>()

const update_explanation = () => {
  setLoadingState(true, 'explain')
  explain(props.query, props.result).then((exp: string) => {
    setLoadingState(false, 'explain')
    emit('update:explanation', exp)
  })
}
</script>

<template>
  <div
    class="card card-link card-link-pop card-link-highlight cursor-pointer"
    :class="{
      'bg-primary-lt': expanded
    }"
    style="
      margin-left: 0;
      transition:
        transform 0.1s ease-out,
        opacity 0.1s ease-out,
        box-shadow 0.1s ease-out;
    "
  >
    <div class="card-header">
      <h3 class="card-title" v-html="result.title" />
      <ul class="nav nav-pills card-header-pills">
        <li class="nav-item ms-auto">
          <button
            type="button"
            class="nav-link"
            ref="explain_button"
            data-bs-toggle="modal"
            data-bs-target="#modal-explanation"
            @click.stop="update_explanation"
          >
            <!-- Download SVG icon from http://tabler-icons.io/i/analyze -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-analyze"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M20 11a8.1 8.1 0 0 0 -6.986 -6.918a8.095 8.095 0 0 0 -8.019 3.918" />
              <path d="M4 13a8.1 8.1 0 0 0 15 3" />
              <path d="M19 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              <path d="M5 8m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            </svg>
            搜索结果解读
          </button>
        </li>
        <li class="nav-item">
          <a class="nav-link" target="_blank" @click.stop="" :href="result.url">
            <!-- Download SVG icon from http://tabler-icons.io/i/external-link -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-external-link"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
              <path d="M11 13l9 -9" />
              <path d="M15 4h5v5" />
            </svg>
            数据集原始链接
          </a>
        </li>
      </ul>
    </div>
    <div class="card-body">
      <ul class="nav nav-pills card-header-pills">
        <li class="nav-item">
          <div class="nav-link active user-select-none" href="#">{{ result.province }}</div>
        </li>
        <li class="nav-item">
          <div class="nav-link active user-select-none" href="#">
            {{ result.city || '省级平台' }}
          </div>
        </li>
        <li class="nav-item">
          <div class="nav-link active user-select-none" href="#">
            {{ result.is_open ? '无条件开放' : '有条件开放' }}
          </div>
        </li>
      </ul>
      <p
        class="text-secondary cursor-text mt-3"
        v-show="expanded"
        @click.stop
        v-html="result.description"
      />
      <div class="datagrid" v-show="expanded">
        <div class="datagrid-item">
          <div class="datagrid-title">来源部门</div>
          <div class="datagrid-content">{{ result.department }}</div>
        </div>
        <div class="datagrid-item">
          <div class="datagrid-title">相关行业</div>
          <div class="datagrid-content">{{ result.industry }}</div>
        </div>
        <div class="datagrid-item">
          <div class="datagrid-title">数据大小</div>
          <div class="datagrid-content">{{ result.data_volume }}</div>
        </div>
        <div class="datagrid-item">
          <div class="datagrid-title">发布日期</div>
          <div class="datagrid-content">{{ result.publish_time }}</div>
        </div>
        <div class="datagrid-item">
          <div class="datagrid-title">更新日期</div>
          <div class="datagrid-content">{{ result.update_time }}</div>
        </div>
        <div class="datagrid-item">
          <div class="datagrid-title">更新频率</div>
          <div class="datagrid-content">{{ result.update_frequency }}</div>
        </div>
        <div class="datagrid-item">
          <div class="datagrid-title">数据标签</div>
          <div class="datagrid-content">
            <span class="status status-indigo" v-for="(tag, index) in result.tags" :key="index">
              {{ tag }}
            </span>
          </div>
        </div>
        <div class="datagrid-item">
          <div class="datagrid-title">数据格式</div>
          <div class="datagrid-content">
            <span
              class="status status-azure"
              v-for="(fmt, index) in result.data_formats"
              :key="index"
            >
              {{ fmt }}
            </span>
          </div>
        </div>
        <div class="datagrid-item">
          <div class="datagrid-title">原始链接</div>
          <a class="datagrid-content" :href="result.url">{{ result.portal_name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-link-highlight:hover {
  --tblr-active-bg: rgba(var(--tblr-primary-rgb), 0.04);
  --tblr-card-bg: var(--tblr-active-bg);
}
</style>

<style>
.card > .card-header > .card-title > .server-set-highlight-title {
  color: var(--tblr-primary);
}
.card.bg-primary-lt > .card-header > .card-title > .server-set-highlight-title {
  text-decoration: underline dotted;
}
.card > .card-body > p > .server-set-highlight-description {
  text-decoration: underline dotted;
}
</style>
