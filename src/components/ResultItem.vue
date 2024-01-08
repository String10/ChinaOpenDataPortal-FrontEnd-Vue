<script setup lang="ts">
import { ref } from 'vue'

import type { SearchResult } from '@/utils/types'

defineProps<{
  result: SearchResult
  expanded: boolean
}>()

const hovering = ref(false)
</script>

<template>
  <div
    class="card cursor-pointer"
    :class="{
      'bg-primary-lt': expanded
    }"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="card-status-top bg-cyan" v-if="hovering && !expanded"></div>
    <div class="card-header">
      <h3 class="card-title">
        {{ result.title }}
      </h3>
      <ul class="nav nav-pills card-header-pills">
        <li class="nav-item ms-auto">
          <a class="nav-link" href="#">
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
      <p class="text-secondary cursor-text mt-3" v-if="expanded" @click.stop>
        {{ result.description }}
      </p>
      <div class="datagrid" v-if="expanded">
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
