<script setup lang="ts">
import { toThousandFilter } from '@/utils/filters'

defineProps<{
  items: {
    name: string
    value: number
  }[]
}>()
</script>

<template>
  <div class="row row-deck row-cards">
    <div class="col-sm-6 col-lg-4" v-for="(item, index) in items" :key="index">
      <div class="card card-sm">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col">
              <div class="h1 mb-0 me-2">{{ toThousandFilter(item.value) }}</div>
              <div class="text-secondary">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>
