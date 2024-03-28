import { getElementRectangle } from "./dom"
import { notifyObservers } from "./observers"
import { Rectangle } from "./rectangle"

export type Item = {
  element: HTMLElement
  rectangle: Rectangle
  inView?: boolean
}

export const items: Item[] = []
const resizeObservers: Map<HTMLElement, ResizeObserver> = new Map()

export const addItem = (element: HTMLElement) => {
  const { x, y, width, height } = getElementRectangle(element)
  const rectangle = new Rectangle(x, y, width, height)
  const nextElement = { element, rectangle }

  items.push(nextElement)
  notifyObservers()
}

export const modifyItem = (
  element: HTMLElement,
  options: Partial<Rectangle>
) => {
  const found = items.find((item) => item.element === element)

  if (found) {
    const { x, y, width, height } = options
    if (x !== undefined) found.rectangle.x = x
    if (y !== undefined) found.rectangle.y = y
    if (width !== undefined) found.rectangle.width = width
    if (height !== undefined) found.rectangle.height = height

    // only update observers if the rectangle has changed
    if (
      (x !== undefined && found.rectangle.x !== x) ||
      (y !== undefined && found.rectangle.y !== y) ||
      (width !== undefined && found.rectangle.width !== width) ||
      (height !== undefined && found.rectangle.height !== height)
    ) {
      notifyObservers()
    }
  }
}

export const removeItem = (element: HTMLElement) => {
  const index = items.findIndex((item) => item.element === element)
  if (index !== -1) {
    items.splice(index, 1)
    notifyObservers()
  }
}

export const registerItemResize = (element: HTMLElement) => {
  if (!resizeObservers.has(element)) {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        modifyItem(element, {
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      })
    })

    resizeObservers.set(element, resizeObserver)
    resizeObserver.observe(element)
  }
}

export const unregisterItemResize = (element: HTMLElement) => {
  const resizeObserver = resizeObservers.get(element)
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObservers.delete(element)
  }
}
