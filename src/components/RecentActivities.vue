<script setup lang="ts">
import type { Activity } from '@/utils/types'
import { dateFilter } from '@/utils/filters'

defineProps<{
  items: Activity[]
}>()
</script>

<template>
  <ul class="timeline timeline-simple">
    <li class="timeline-event" v-for="(item, index) in items" :key="index">
      <div class="timeline-event-icon">
        <svg>...</svg>
      </div>
      <div class="card timeline-event-card">
        <div class="card-body">
          <div class="text-secondary float-end">{{ dateFilter(item.date) }}</div>
          <h4>{{ item.title }}</h4>
          <p class="text-secondary">{{ item.detail }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>
