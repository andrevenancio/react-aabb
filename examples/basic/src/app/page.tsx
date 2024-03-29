"use client"

import { ReactNode, useState } from "react"
import { Debug } from "react-aabb"

import { Fruit } from "@/components/fruit"

interface ComponentData {
  uid: number
  component: ReactNode
}

export default function Home() {
  const [components, setComponents] = useState<ComponentData[]>([])
  const [uidCounter, setUidCounter] = useState(0)

  const handleRemove = (uid: number) => {
    setComponents((prevComponents) =>
      prevComponents.filter((component) => component.uid !== uid)
    )
  }

  const handleAdd = () => {
    const newUid = uidCounter + 1

    setUidCounter(newUid)
    setComponents((prevComponents) => [
      ...prevComponents,
      {
        uid: newUid,
        component: <Fruit key={newUid} onClick={() => handleRemove(newUid)} />,
      },
    ])
  }

  return (
    <main>
      <Debug />
      <button onClick={handleAdd}>Add</button>
      {components.map(({ component }) => component)}
    </main>
  )
}
