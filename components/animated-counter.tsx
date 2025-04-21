"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

// Animated Counter Component
export function AnimatedCounter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const inView = useInView(countRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (inView) {
      const startTime = Date.now()
      const updateCount = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / duration, 1)
        const currentCount = Math.floor(progress * value)
        if (currentCount !== count) {
          setCount(currentCount)
        }
        if (progress < 1) {
          requestAnimationFrame(updateCount)
        } else {
          setCount(value)
        }
      }
      requestAnimationFrame(updateCount)
    }
  }, [inView, value, duration, count])

  return <span ref={countRef}>{count}</span>
} 