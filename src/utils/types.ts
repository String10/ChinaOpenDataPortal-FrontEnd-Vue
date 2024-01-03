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
