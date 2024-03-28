"use client"

import React, { Children, type ReactElement, useEffect, useRef } from "react"

import { getElementRectangle } from "./dom"
import {
  addItem,
  modifyItem,
  registerItemResize,
  removeItem,
  unregisterItemResize,
} from "./items"

type WrapperProps = {
  children: ReactElement
}

export const Wrapper = ({ children }: WrapperProps) => {
  const domElement = useRef<HTMLElement>(null)
  const child = Children.only(children)

  useEffect(() => {
    const domElementRef = domElement.current
    if (!domElementRef) return

    addItem(domElementRef)
    registerItemResize(domElementRef)

    return () => {
      if (domElementRef) {
        removeItem(domElementRef)
        unregisterItemResize(domElementRef)
      }
    }
  }, [])

  useEffect(() => {
    const domElementRef = domElement.current
    if (!domElementRef) return
    const nextRect = getElementRectangle(domElementRef)

    modifyItem(domElementRef, nextRect)
  }, [child])

  return React.cloneElement(child, {
    ref: domElement,
  })
}
