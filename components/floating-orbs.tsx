"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Orb {
  id: number
  size: number
  x: number
  y: number
  duration: number
  delay: number
  opacity: number
  color: string
}

export function FloatingOrbs({ count = 10 }) {
  const [orbs, setOrbs] = useState<Orb[]>([])

  useEffect(() => {
    const newOrbs: Orb[] = []
    for (let i = 0; i < count; i++) {
      newOrbs.push({
        id: i,
        size: Math.random() * 100 + 50,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.1,
        color: getRandomColor(),
      })
    }
    setOrbs(newOrbs)
  }, [count])

  const getRandomColor = () => {
    const colors = [
      "rgba(77, 171, 247, 0.2)", // blue
      "rgba(151, 117, 250, 0.2)", // purple
      "rgba(255, 135, 135, 0.2)", // coral
      "rgba(255, 255, 255, 0.1)", // white
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            opacity: orb.opacity,
            background: orb.color,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  )
}
