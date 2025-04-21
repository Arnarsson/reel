import { motion } from "framer-motion"
import { Brain } from "lucide-react"

// Animated Brain Component
export function AnimatedBrain() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-64 h-64 rounded-full bg-primary/10 animate-pulse"></div>
      <div
        className="absolute w-48 h-48 rounded-full bg-purple/20 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute w-32 h-32 rounded-full bg-primary/30 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <motion.div
        className="relative z-10"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        <Brain className="h-32 w-32 text-blue-light" strokeWidth={1} />
      </motion.div>
    </div>
  )
} 