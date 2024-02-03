import { ref } from 'vue'

export type ToastItem = {
  id: string
  title: string
  detail?: string
  shown: boolean
}

export const toasts = ref<ToastItem[]>([])

const TOASTS_MAX = 5
const toast_id = ref(0)

export function showToast(title: string, detail?: string) {
  if (toasts.value.length === TOASTS_MAX) {
    toasts.value.shift()
  }
  toasts.value.push({
    id: toast_id.value.toString(),
    title: title,
    detail: detail,
    shown: false
  } as ToastItem)
  toast_id.value++
}

export function removeToast(id: string) {
  toasts.value = toasts.value.filter((obj) => {
    return obj.id != id
  })
}
