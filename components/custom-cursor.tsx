"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHidden, setIsHidden] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsHidden(false)
      
      // Update custom property for hover effect
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
      
      // Clear existing timeout and set new one
      clearTimeout(timeout)
      timeout = setTimeout(() => setIsHidden(true), 3000)
    }

    const handleMouseEnter = () => {
      setIsHovering(true)
      setIsHidden(false)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setIsHidden(true)
    }

    // Track hover state on interactive elements
    const interactiveElements = document.querySelectorAll('.hover-lift')
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })

    window.addEventListener('mousemove', updateCursorPosition)
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition)
      clearTimeout(timeout)
      document.body.style.cursor = 'auto'
      
      // Clean up hover listeners
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        className={`cursor-dot ${isHidden ? 'cursor-hidden' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        className={`cursor-dot-outline ${isHidden ? 'cursor-hidden' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  )
}
