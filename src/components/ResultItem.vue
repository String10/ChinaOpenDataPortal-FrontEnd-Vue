<script setup lang="ts">
import { ref } from 'vue'

import type { SearchResult } from '@/utils/types'

const props = defineProps<{
  result: SearchResult
  expanded: boolean
}>()

const copy_success = ref(false)

const copyUrl = async () => {
  try {
    const url = new URL(window.location.href)
    url.searchParams.set('doc_id', `${props.result.doc_id}`)
    await navigator.clipboard.writeText(url.href)
    copy_success.value = true
    setTimeout(() => {
      copy_success.value = false
    }, 3000)
  } catch (error) {
    console.error(error)
  }
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
          <a class="nav-link" @click.stop="copyUrl">
            <!-- Download SVG icon from http://tabler-icons.io/i/share -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-share"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="{
                'icon-tada': copy_success
              }"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M8.7 10.7l6.6 -3.4" />
              <path d="M8.7 13.3l6.6 3.4" />
            </svg>
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
          <div class="datagrid-title">重点领域</div>
          <div class="datagrid-content">{{ result.category }}</div>
        </div>
        <div class="datagrid-item">
          <div class="datagrid-title">相关行业</div>
          <div class="datagrid-content">{{ result.industry }}</div>
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
