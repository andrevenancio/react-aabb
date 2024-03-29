import React, { useEffect, useState } from "react"
import { Wrapper } from "react-aabb"

const dictionary = [
  "apple",
  "banana",
  "cherry",
  "orange",
  "pear",
  "grape",
  "kiwi",
]

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * dictionary.length)
  return dictionary[randomIndex]
}

export const Fruit = ({ onClick }: { onClick?: () => void }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const newPosition = {
      x: Math.random() * (window.innerWidth * 2 - 100),
      y: Math.random() * (window.innerHeight * 2 - 100),
    }
    setPosition(newPosition)
  }, [])

  return (
    <Wrapper>
      <div
        style={{
          position: "absolute",
          top: `${position.y}px`,
          left: `${position.x}px`,
          boxShadow: "0 0 0 1px red",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: 100,
          aspectRatio: "1 / 1",
        }}
      >
        <p>{getRandomWord()}</p>
        <button onClick={onClick}>remove</button>
      </div>
    </Wrapper>
  )
}
