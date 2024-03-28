let resizeCallbacks: (() => void)[] = []

export const registerResize = (callback: () => void) => {
  resizeCallbacks.push(callback)
  if (resizeCallbacks.length === 1 && typeof window !== "undefined") {
    window.addEventListener("resize", handleResize)
  }
}

export const unregisterResize = (callback: () => void) => {
  const index = resizeCallbacks.indexOf(callback)
  if (index !== -1) {
    resizeCallbacks.splice(index, 1)
  }
  if (resizeCallbacks.length === 0 && typeof window !== "undefined") {
    window.removeEventListener("resize", handleResize)
  }
}

const handleResize = () => {
  resizeCallbacks.forEach((callback) => {
    callback()
  })
}
