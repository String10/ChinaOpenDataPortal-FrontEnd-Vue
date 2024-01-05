import { ref } from 'vue'

export const is_loading = ref(false   )
export function setLoadingState(st: boolean) {
  is_loading.value = st
}
