import { computed, ref } from 'vue'

const is_loading = ref<{ [key: string]: boolean }>({})

export function setLoadingState(st: boolean, key: string = '') {
  is_loading.value[key] = st
}

export function isLoading(key: string = '') {
  return computed(() => (key in is_loading.value ? is_loading.value[key] : false))
}
