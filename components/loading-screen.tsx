"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Brain } from "lucide-react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true)
    }, 2000)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  if (isComplete) return null

  return (
    <motion.div
      className="loading-container grid-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-logo">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <Brain className="h-8 w-8 text-white" />
          <span className="text-3xl font-bold text-white">mocha</span>
        </motion.div>
      </div>
      <div className="loading-progress mt-4">{progress}%</div>
    </motion.div>
  )
}
