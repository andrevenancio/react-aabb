import { type Item, items } from "./items"

const observers: ((elements: Item[]) => void)[] = []

export const subscribe = (observer: (elements: Item[]) => void) => {
  observers.push(observer)
}

export const unsubscribe = (observer: (elements: Item[]) => void) => {
  const index = observers.indexOf(observer)
  if (index !== -1) {
    observers.splice(index, 1)
  }
}

export const notifyObservers = () => {
  observers.forEach((observer) => observer(items))
}
