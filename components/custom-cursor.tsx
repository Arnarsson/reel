"use client"

import { useEffect, useState, useRef } from "react"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  if (mousePosition.x === -100 && mousePosition.y === -100) {
    return null
  }

  return (
    <div
      className="cursor-dot"
      style={{
        position: 'fixed',
        left: mousePosition.x,
        top: mousePosition.y,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )
}
