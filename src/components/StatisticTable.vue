<script setup lang="ts">
import { toThousandFilter } from '@/utils/filters'
import type { Statistic } from '@/utils/types'

defineProps<{
  items: Statistic[]
}>()
</script>

<template>
  <div class="row row-deck row-cards">
    <div class="col-sm-6 col-lg-4" v-for="(item, index) in items" :key="index">
      <div class="card card-sm">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col">
              <div class="h1 mb-0 me-2">{{ toThousandFilter(item.count) }}</div>
              <div class="text-secondary">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
