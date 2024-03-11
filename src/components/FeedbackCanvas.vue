<script setup lang="ts">
import { computed, ref } from 'vue'

defineProps<{
  id: string
  label: string
}>()

const feedbackEmail = ref('')
const feedbackText = ref('')

const feedbackEmailValid = computed(() => {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(feedbackEmail.value)
})
</script>

<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" :id="id" :aria-labelledby="label">
    <div class="offcanvas-header">
      <h2 class="offcanvas-title" :id="label">向我们提交反馈</h2>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="mb-3">
        <label class="form-label required">联系方式</label>
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floating-input"
            autocomplete="off"
            v-model="feedbackEmail"
            :class="{
              'is-invalid': feedbackEmail.length > 0 && !feedbackEmailValid
            }"
          />
          <label for="floating-input">邮件地址</label>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label required"
          >体验反馈<span class="form-label-description">{{ feedbackText.length }}/300</span></label
        >
        <textarea
          class="form-control"
          name="example-textarea-input"
          rows="6"
          placeholder="描述您遇到的问题或提供建议"
          v-model="feedbackText"
        ></textarea>
      </div>
      <div class="mt-3">
        <button class="btn btn-primary" type="button" data-bs-dismiss="offcanvas">
          <!-- Download SVG icon from http://tabler-icons.io/i/message -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-message"
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
            <path d="M8 9h8"></path>
            <path d="M8 13h6"></path>
            <path
              d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"
            ></path>
          </svg>
          提交
        </button>
      </div>
    </div>
  </div>
</template>
