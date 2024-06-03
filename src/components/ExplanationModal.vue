<script setup lang="ts">
defineProps<{
  content: string
}>()
</script>

<template>
  <div
    class="modal modal-blur fade"
    id="modal-explanation"
    tabindex="-1"
    style="display: none"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
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
        <div class="modal-body">
          {{ content }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn ms-auto" data-bs-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>
