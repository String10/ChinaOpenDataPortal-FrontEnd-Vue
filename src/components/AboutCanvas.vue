<script setup lang="ts">
defineProps<{
  id: string
  label: string
  content: string
}>()
</script>

<template>
  <div class="offcanvas offcanvas-bottom" tabindex="-1" :id="id" :aria-labelledby="label">
    <div class="offcanvas-header">
      <h2 class="offcanvas-title" :id="label">关于我们</h2>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div>{{ content }}</div>
      <div class="mt-3">
        <button class="btn btn-primary" type="button" data-bs-dismiss="offcanvas">
          <!-- Download SVG icon from http://tabler-icons.io/i/article-off -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-article-off"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M8 4h11a2 2 0 0 1 2 2v11m-1.172 2.821a1.993 1.993 0 0 1 -.828 .179h-14a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 1.156 -1.814"
            ></path>
            <path d="M7 8h1m4 0h5"></path>
            <path d="M7 12h5m4 0h1"></path>
            <path d="M7 16h9"></path>
            <path d="M3 3l18 18"></path>
          </svg>
          关闭
        </button>
      </div>
    </div>
  </div>
</template>
