import { isString } from 'lodash'

import type { SearchResult } from '@/utils/types'

export function toThousandFilter(num: number | string) {
  if (typeof num === 'string') {
    num = +num.replace(/,/g, '')
  }
  return (+num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

export function dateFilter(date: Date | string) {
  if (!date) {
    return undefined
  }
  if (typeof date === 'string') {
    date = new Date(date)
  }
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

export function searchResultFilter(res: SearchResult) {
  return {
    doc_id: res.doc_id,
    title: res.title || '-',
    description: res.description || '-',
    tags: res.tags,
    department: res.department || '-',
    publish_time: dateFilter(res.publish_time) || '-',
    update_time: dateFilter(res.update_time) || '-',
    is_open: isString(res.is_open) ? res.is_open.includes('无条件') : res.is_open, // TODO: temp fix
    data_volume: toThousandFilter(res.data_volume),
    industry: res.industry || '-',
    update_frequency: res.update_frequency || '-',
    data_formats: res.data_formats,
    url: res.url,
    province: res.province || '-',
    city: res.province === res.city ? undefined : res.city,
    portal_name: res.portal_name || '-',
    standard_industry: res.standard_industry || '-'
  } as SearchResult
}
