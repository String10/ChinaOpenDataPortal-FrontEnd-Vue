import axios from 'axios'

import { FilterOpenness, type Filters } from '@/utils/types'

export async function search(query: string, filters?: Filters) {
  const backend_host = import.meta.env.VITE_BACKEND_HOST
  if (!backend_host) {
    console.error('VUE_APP_BACKEND_HOST is not set')
    return {}
  }
  const { openness, ...rest_filters } = filters || {}
  try {
    const response = await axios.get(`${backend_host}/search`, {
      params: {
        q: query,
        is_open:
          openness &&
          {
            [FilterOpenness.All]: undefined,
            [FilterOpenness.Open]: '无条件开放',
            [FilterOpenness.Cond]: '有条件开放',
            [FilterOpenness.None]: undefined
          }[openness],
        ...rest_filters
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
  return {}
}

export async function fetch_filters() {
  const backend_host = import.meta.env.VITE_BACKEND_HOST
  if (!backend_host) {
    console.error('VUE_APP_BACKEND_HOST is not set')
    return {}
  }
  try {
    const response = await axios.get(`${backend_host}/filters`)
    return response.data
  } catch (error) {
    console.error(error)
  }
  return {}
}
