"use client"

import { useRef, useEffect } from "react"

interface MagneticCursorOptions {
  strength?: number
  radius?: number
}

export function useMagneticCursor({ strength = 0.5, radius = 100 }: MagneticCursorOptions = {}) {
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let animationFrameId: number
    let isHovering = false

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return

      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate distance from mouse to center of element
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      // Apply magnetic effect if within radius
      if (distance < radius) {
        // Calculate movement (stronger when closer to center)
        const magneticPull = (radius - distance) / radius
        const moveX = distanceX * strength * magneticPull
        const moveY = distanceY * strength * magneticPull

        // Apply transform
        element.style.transform = `translate(${moveX}px, ${moveY}px)`
      } else if (element.style.transform !== "") {
        // Reset position when outside radius
        element.style.transform = ""
      }
    }

    const handleMouseEnter = () => {
      isHovering = true
      document.body.classList.add("magnetic-active")
    }

    const handleMouseLeave = () => {
      isHovering = false
      document.body.classList.remove("magnetic-active")

      // Animate back to original position
      element.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      element.style.transform = ""

      // Remove transition after animation completes
      setTimeout(() => {
        if (element) {
          element.style.transition = ""
        }
      }, 500)
    }

    // Add event listeners
    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousemove", handleMouseMove)

    // Clean up
    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [strength, radius])

  return elementRef
}
