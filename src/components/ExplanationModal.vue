<script setup lang="ts">
import { isLoading } from '@/utils/loading'

defineProps<{
  content: string
}>()

const is_loading = isLoading('explain')
</script>

<template>
  <div
    class="modal modal-blur fade"
    id="modal-explanation"
    tabindex="-1"
    style="display: none"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">搜索结果说明</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" style="white-space: pre-wrap">
          <div v-show="!is_loading">
            {{ content }}
          </div>
          <div class="spinner-border spinner-border-sm" v-show="is_loading"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn ms-auto" data-bs-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>
