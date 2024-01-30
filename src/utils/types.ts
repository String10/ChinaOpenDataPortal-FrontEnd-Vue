export type CanvasId = string
export type CanvasItem = {
  id: CanvasId
  content?: string
}
export type CanvasList = {
  [key: string]: CanvasItem
}

export type Statistic = {
  title: string
  count: number
}

export type Activity = {
  title: string
  detail: string
  date: Date | string
}

export type FilterSet = {
  locations: { [key: string]: string[] }
  industries: string[]
}

export type Footer = {
  left_part: {
    logo_path: string
    org_name: string
    org_link: string
  }
  right_part: {
    name: string
    link: string
    toggle: boolean
  }[]
}

export enum FilterOpenness {
  All = 0b11,
  Open = 0b01,
  Cond = 0b10,
  None = 0b00
}
export type Filters = {
  province?: string
  city?: string
  industry?: string
  openness?: FilterOpenness
}

export type SearchResult = {
  title: string
  description: string
  tags: string[]
  department: string
  category: string
  industry: string
  publish_time: Date | string
  update_time: Date | string
  update_frequency: string
  is_open: boolean
  data_volume: number | string
  telephone: string
  email: string
  data_formats: string[]
  province: string
  city: string
  url: string
  portal_name: string
  standard_industry: string
}
