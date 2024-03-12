import { ref } from 'vue'

/**
 *
 * @param curr_page page index you want to highlight
 * @param page_count total page count
 * @param item_size items you want to show in pagination
 * @returns
 */
export function page_items(curr_page: number, page_count: number, item_size: number) {
  if (page_count <= item_size) {
    return [...Array(page_count).keys()].map((i) => i + 1)
  }
  let page_items = [...Array(item_size).keys()].map(
    (i) => curr_page + i - Math.floor(item_size / 2)
  )
  if (page_items[0] < 1) {
    page_items = page_items.map((i) => i - page_items[0] + 1)
  }
  if (page_items[page_items.length - 1] > page_count) {
    page_items = page_items.map((i) => i - page_items[page_items.length - 1] + page_count)
  }
  return page_items
}

export const touch_start = ref<TouchEvent | null>(null)
export function swipe_up_handler_factory(handler: Function) {
  return (evt: TouchEvent) => {
    if (!touch_start.value) {
      return
    }
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    const { scrollHeight, clientHeight } = document.documentElement
    const tolerance = 120
    if (
      evt.changedTouches[0].clientY < touch_start.value.changedTouches[0].clientY &&
      scrollTop + clientHeight + tolerance >= scrollHeight
    ) {
      handler(evt)
    }

    touch_start.value = null
  }
}
