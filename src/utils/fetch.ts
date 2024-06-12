import axios from 'axios'

import { isString, pickBy } from 'lodash'

import {
  FilterOpenness,
  type Activity,
  type FilterSet,
  type Filters,
  type SearchResult,
  type Statistic
} from '@/utils/types'

function load_backend_host() {
  const backend_host = import.meta.env.VITE_BACKEND_HOST
  if (!backend_host) {
    console.error('VUE_APP_BACKEND_HOST is not set')
    return undefined
  }
  return backend_host
}

export async function search(query: string, filters?: Filters, rerank?: boolean) {
  const backend_host = load_backend_host()
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
        openness:
          openness &&
          {
            [FilterOpenness.All]: undefined,
            [FilterOpenness.Open]: '无条件开放',
            [FilterOpenness.Cond]: '有条件开放',
            [FilterOpenness.None]: undefined
          }[openness],
        rerank: rerank ? '1' : '0',
        ...pickBy(rest_filters, isString)
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
  return default_value
}

export async function explain(query: string, metadata: SearchResult) {
  const backend_host = load_backend_host()
  const default_value = ''
  if (!backend_host) {
    return default_value
  }
  try {
    const response = await axios.get<string>(`${backend_host}/explain`, {
      params: {
        q: query,
        docid: metadata.doc_id
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
  return default_value
}

export async function fetch_filters() {
  const backend_host = load_backend_host()
  if (!backend_host) {
    return null
  }
  try {
    const response = await axios.get<FilterSet>(`${backend_host}/filters`)
    return response.data
  } catch (error) {
    console.error(error)
  }
  return null
}

export async function fetch_statistics() {
  const backend_host = load_backend_host()
  if (!backend_host) {
    return null
  }
  try {
    const response = await axios.get<Statistic[]>(`${backend_host}/statistics`)
    return response.data
  } catch (error) {
    console.error(error)
  }
  return null
}

export async function fetch_activities() {
  const backend_host = load_backend_host()
  if (!backend_host) {
    return null
  }
  try {
    const response = await axios.get<Activity[]>(`${backend_host}/activities`)
    return response.data
  } catch (error) {
    console.error(error)
  }
  return null
}
