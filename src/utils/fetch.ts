import axios from 'axios'

import {
  FilterOpenness,
  type Activity,
  type Filters,
  type FilterSet,
  type SearchResult,
  type Statistic
} from '@/utils/types'

export async function search(query: string, filters?: Filters) {
  const backend_host = import.meta.env.VITE_BACKEND_HOST
  const default_value: SearchResult[] = []
  if (!backend_host) {
    console.error('VUE_APP_BACKEND_HOST is not set')
    return default_value
  }
  const { openness, ...rest_filters } = filters || {}
  try {
    const response = await axios.get<SearchResult[]>(`${backend_host}/search`, {
      params: {
        q: query,
        isopen:
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
  return default_value
}

export async function fetch_filters() {
  const backend_host = import.meta.env.VITE_BACKEND_HOST
  const default_value: FilterSet = {
    locations: {},
    industries: []
  }
  if (!backend_host) {
    console.error('VUE_APP_BACKEND_HOST is not set')
    return default_value
  }
  try {
    const response = await axios.get<FilterSet>(`${backend_host}/filters`)
    return response.data
  } catch (error) {
    console.error(error)
  }
  return default_value
}

export async function fetch_statistics() {
  const backend_host = import.meta.env.VITE_BACKEND_HOST
  const default_value: Statistic[] = []
  if (!backend_host) {
    console.error('VUE_APP_BACKEND_HOST is not set')
    return default_value
  }
  try {
    const response = await axios.get<Statistic[]>(`${backend_host}/statistics`)
    return response.data
  } catch (error) {
    console.error(error)
  }
  return default_value
}

export async function fetch_activities() {
  const backend_host = import.meta.env.VITE_BACKEND_HOST
  const default_value: Activity[] = []
  if (!backend_host) {
    console.error('VUE_APP_BACKEND_HOST is not set')
    return default_value
  }
  try {
    const response = await axios.get<Activity[]>(`${backend_host}/activities`)
    return response.data
  } catch (error) {
    console.error(error)
  }
  return default_value
}
