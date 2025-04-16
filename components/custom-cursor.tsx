"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useSpring } from "framer-motion"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [isInactive, setIsInactive] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Spring animation for smoother cursor movement
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const smoothMouseX = useSpring(mousePosition.x, springConfig)
  const smoothMouseY = useSpring(mousePosition.y, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Reset inactivity
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
      setIsInactive(false)
      inactivityTimerRef.current = setTimeout(() => setIsInactive(true), 2000)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }
    
    // Hide cursor on mouse out of window
    const handleMouseOut = () => {
      setIsInactive(true)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseout", handleMouseOut)

    // Initial inactivity timer
    inactivityTimerRef.current = setTimeout(() => setIsInactive(true), 2000)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseout", handleMouseOut)
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
    }
  }, [])

  return (
    <div className="custom-cursor-container">
      <motion.div
        style={{
          position: 'fixed',
          left: 0, 
          top: 0,
          x: smoothMouseX,
          y: smoothMouseY,
          pointerEvents: 'none',
          zIndex: 9999,
        }}
        animate={{ opacity: isInactive ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Ring Element */}
        <motion.div
          className="cursor-ring"
          animate={{ scale: isClicking ? 1.2 : 1 }}
          transition={{ type: "spring", ...springConfig, damping: 30, stiffness: 200 }}
        />
        {/* Dot Element */}
        <motion.div
          className="cursor-dot"
          animate={{ scale: isClicking ? 0.8 : 1 }}
          transition={{ type: "spring", ...springConfig }}
        />
      </motion.div>
    </div>
  )
}
