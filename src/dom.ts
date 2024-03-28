export const getElementOffset = (element: HTMLElement) => {
  const value = { x: 0, y: 0 }

  do {
    value.x += element.offsetLeft || 0
    value.y += element.offsetTop || 0
    element = element.offsetParent as HTMLElement
  } while (element)

  return value
}

export const getElementRectangle = (element: HTMLElement) => {
  const position = getElementOffset(element)
  const dimensions = element.getBoundingClientRect()
  return {
    x: position.x,
    y: position.y,
    width: dimensions.width,
    height: dimensions.height,
  }
}
export const getDocumentWidth = () => {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth,
    window.innerWidth
  )
}

export const getDocumentHeight = () => {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
    window.innerHeight
  )
}
