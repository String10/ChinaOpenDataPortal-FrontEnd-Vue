<script setup lang="ts">
defineProps<{
  items: {
    title: string
    detail: string
    date: Date
  }[]
}>()

const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>

<template>
  <ul class="timeline timeline-simple">
    <li class="timeline-event" v-for="(item, index) in items" :key="index">
      <div class="timeline-event-icon">
        <svg>...</svg>
      </div>
      <div class="card timeline-event-card">
        <div class="card-body">
          <div class="text-secondary float-end">{{ formatDate(item.date) }}</div>
          <h4>{{ item.title }}</h4>
          <p class="text-secondary">{{ item.detail }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>
