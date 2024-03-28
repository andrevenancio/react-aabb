"use client"

import { useEffect, useRef } from "react"

import { registerUpdate, unregisterUpdate, view } from "./animation"
import { getDocumentHeight, getDocumentWidth, getElementRectangle } from "./dom"
import { type Item } from "./items"
import { subscribe, unsubscribe } from "./observers"
import { registerResize, unregisterResize } from "./resize"

let scale = 1

export const Debug = () => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const tree = useRef<Item[]>([])

  useEffect(() => {
    let ctx = canvas.current?.getContext("2d")

    const change = (items: Item[]) => {
      tree.current = items.map((item) => {
        const nextRect = getElementRectangle(item.element)
        item.rectangle.x = nextRect.x
        item.rectangle.y = nextRect.y
        item.rectangle.width = nextRect.width
        item.rectangle.height = nextRect.height

        item.inView = item.rectangle.intersects(view)

        return item
      })

      setTimeout(resize, 0)
    }

    const resize = () => {
      const ratio = Math.max(Math.min(window.devicePixelRatio, 2), 1)
      const realWidth = getDocumentWidth()
      const realHeight = getDocumentHeight()
      const maxWidth = 100

      scale = (maxWidth * ratio) / realWidth

      const targetWidth = Math.round(realWidth * scale)
      const targetHeight = Math.round(realHeight * scale)

      if (canvas.current) {
        canvas.current.width = targetWidth
        canvas.current.height = targetHeight
        canvas.current.style.width = `${targetWidth / ratio}px`
        canvas.current.style.height = `${targetHeight / ratio}px`
      }
    }

    const update = () => {
      if (canvas.current && ctx) {
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)

        ctx.beginPath()
        ctx.strokeStyle = "#ccc"
        ctx.lineWidth = 2
        ctx.rect(
          ~~(view.x * scale),
          ~~(view.y * scale),
          ~~(view.width * scale),
          ~~(view.height * scale)
        )
        ctx.stroke()

        if (tree.current) {
          tree.current.forEach((element: Item) => {
            const { rectangle, inView } = element

            if (ctx) {
              ctx.beginPath()
              ctx.strokeStyle = inView ? "#0f0" : "#ff0"
              ctx.rect(
                ~~rectangle.x * scale,
                ~~rectangle.y * scale,
                ~~rectangle.width * scale,
                ~~rectangle.height * scale
              )
              ctx.stroke()
            }
          })
        }
      }
    }

    registerUpdate(update)
    registerResize(resize)
    subscribe(change)

    resize()

    return () => {
      unregisterUpdate(update)
      unregisterResize(resize)
      unsubscribe(change)

      ctx = null
    }
  }, [])

  return (
    <canvas
      ref={canvas}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 1,
        height: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}
    />
  )
}
