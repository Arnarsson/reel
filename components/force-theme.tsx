"use client"

import { useEffect } from "react"

export function ForceTheme() {
  useEffect(() => {
    // Force the theme to be applied immediately
    document.documentElement.classList.add("theme-modern-dark")

    // Remove any other theme classes
    document.documentElement.classList.remove(
      "theme-original-dark",
      "theme-deep-space",
      "theme-midnight-forest",
      "theme-graphite",
    )
  }, [])

  return null
}
