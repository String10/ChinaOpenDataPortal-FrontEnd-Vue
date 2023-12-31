<script setup lang="ts">
defineProps<{
  defaultQuery: string
}>()
</script>

<template>
  <div class="row g-2">
    <div class="col">
      <input type="text" class="form-control" :placeholder="defaultQuery" />
    </div>
    <div class="col-auto">
      <a href="#" class="btn btn-icon" aria-label="Button">
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
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </svg>
      </a>
    </div>
  </div>
</template>
