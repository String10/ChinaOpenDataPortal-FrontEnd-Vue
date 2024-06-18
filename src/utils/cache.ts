import { fetch_activities, fetch_filters, fetch_statistics } from '@/utils/fetch'
import type { Activity, FilterSet, Statistic } from '@/utils/types'

type CacheObject = {
  timestamp: number
  object: any
}

const TIME_HOUR = 1000 * 60 * 60

const cache_func_factory =
  (key: string, fetch_func: Function, default_value: object) =>
  async (force = false) => {
    const cache = localStorage.getItem(key)
    if (cache && !force) {
      const { timestamp, object } = JSON.parse(cache) as CacheObject
      if (Date.now() - timestamp < TIME_HOUR) {
        return object
      }
    }
    const object = await fetch_func()
    if (object != null) {
      localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), object }))
      return object
    }
    return default_value
  }

export const cached_filters = cache_func_factory('Websoft-CODP-Filters', fetch_filters, {
  locations: {},
  industries: []
} as FilterSet)
export const cached_statistics = cache_func_factory(
  'Websoft-CODP-Statistics',
  fetch_statistics,
  [] as Statistic[]
)
export const cached_activities = cache_func_factory(
  'Websoft-CODP-Activities',
  fetch_activities,
  [] as Activity[]
)
