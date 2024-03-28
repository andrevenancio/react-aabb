import { items } from "./items"
import { Rectangle } from "./rectangle"

let animationFrameId: number | null = null

const animationFrameCallbacks: (() => void)[] = []

export const view: Rectangle = new Rectangle()

export const registerUpdate = (callback: () => void) => {
  animationFrameCallbacks.push(callback)
  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(loop)
  }
}

export const unregisterUpdate = (callback: () => void) => {
  const index = animationFrameCallbacks.indexOf(callback)
  if (index !== -1) {
    animationFrameCallbacks.splice(index, 1)
  }
  if (animationFrameCallbacks.length === 0 && animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

const loop = () => {
  const { top, left } = document.body.getBoundingClientRect()

  view.x = left * -1
  view.y = top * -1
  view.width = window.innerWidth
  view.height = window.innerHeight

  items.filter((item) => {
    const inView = item.rectangle.intersects(view)
    item.inView = inView
    return inView
  })

  animationFrameCallbacks.forEach((callback) => {
    callback()
  })

  if (animationFrameCallbacks.length > 0) {
    animationFrameId = requestAnimationFrame(loop)
  }
}
