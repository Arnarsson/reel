"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"

export function FeatureCard({ icon, title, description, delay = 0, items = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="micro-card p-6 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="h-12 w-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 mb-6">{description}</p>

        {items.length > 0 && (
          <ul className="space-y-3 mb-6">
            {items.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
              >
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <span className="text-gray-300">{item}</span>
              </motion.li>
            ))}
          </ul>
        )}

        <a href="#" className="inline-flex items-center text-primary font-medium group">
          Learn more
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  )
}
