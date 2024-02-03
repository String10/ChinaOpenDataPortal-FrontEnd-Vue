<script setup lang="ts">
import { onUpdated } from 'vue'
import { Toast } from 'bootstrap'

import { isMobile } from '@/utils/device'
import type { ToastItem } from '@/utils/toast'

const props = defineProps<{
  toasts: ToastItem[]
}>()

onUpdated(() => {
  props.toasts
    .filter((obj) => !obj.shown)
    .forEach((item: ToastItem) => {
      var toast_element = document.getElementById(item.id)!
      var toast = new Toast(toast_element)
      toast.show()
      item.shown = true
    })
})
</script>

<template>
  <div
    ref="container"
    :style="{
      'z-index': 999,
      'max-width': '350px',
      width: '100%',
      margin: '0 auto',
      position: 'fixed',
      padding: '1rem',
      bottom: 0,
      left: isMobile() ? '50%' : '0',
      transform: isMobile() ? 'translateX(-50%)' : 'none'
    }"
  >
    <div
      v-for="item in toasts"
      :key="item.id"
      :id="item.id"
      class="toast fade opacity-90"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-bs-delay="2000"
      @[`hidden.bs.toast`]="$emit('remove-toast', item.id)"
    >
      <div
        class="toast show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-autohide="false"
        data-bs-toggle="toast"
      >
        <div class="toast-header">
          <strong class="me-auto">{{ item.title }}</strong>
          <button
            type="button"
            class="ms-2 btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body" v-if="item.detail">{{ item.detail }}</div>
      </div>
    </div>
  </div>
</template>
