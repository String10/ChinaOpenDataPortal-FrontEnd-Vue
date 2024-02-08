import { fetch_activities, fetch_filters, fetch_statistics } from '@/utils/fetch'

type CacheObject = {
  timestamp: number
  object: any
}

const TIME_HOUR = 1000 * 60 * 60

const cache_func_factory =
  (key: string, fetch_func: Function) =>
  async (force = false) => {
    const cache = localStorage.getItem(key)
    if (cache && !force) {
      const { timestamp, object } = JSON.parse(cache) as CacheObject
      if (Date.now() - timestamp < TIME_HOUR) {
        return object
      }
    }
    const object = await fetch_func()
    localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), object }))
    return object
  }

export const cached_filters = cache_func_factory('filters', fetch_filters)
export const cached_statistics = cache_func_factory('statistics', fetch_statistics)
export const cached_activities = cache_func_factory('activities', fetch_activities)
