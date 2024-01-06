export type CanvasId = string
export type CanvasItem = {
  id: CanvasId
  content?: string
}
export type CanvasList = {
  [key: string]: CanvasItem
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
