<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { isLoading } from '@/utils/loading'

defineProps<{
  defaultQuery: string
}>()

const route = useRoute()
const query = ref(route.query?.q as string)
watch(
  () => route.path,
  () => {
    query.value = ''
  }
)
watch(
  () => route.query?.q,
  (new_query) => {
    query.value = new_query as string
  }
)
const router = useRouter()
const is_loading = isLoading()
</script>

<template>
  <form
    @submit.prevent="
      router.push({
        name: 'result',
        query: {
          ...route.query,
          q: query || defaultQuery
        }
      })
    "
  >
    <div class="row g-2">
      <div class="col">
        <div class="input-group input-group-flat">
          <input type="text" class="form-control" v-model="query" :placeholder="defaultQuery" />
          <span class="input-group-text cursor-pointer" @click="query = ''">
            <!-- Download SVG icon from http://tabler-icons.io/i/x -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-x"
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
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </span>
        </div>
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-icon" aria-label="Button">
          <!-- Download SVG icon from http://tabler-icons.io/i/search -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-search"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            v-show="!is_loading"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
          <div class="spinner-border spinner-border-sm" v-show="is_loading"></div>
        </button>
      </div>
    </div>
  </form>
</template>
