"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Force the theme to be applied immediately on mount
  useEffect(() => {
    document.documentElement.classList.add("theme-modern-dark")
  }, [])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="theme-modern-dark"
      forcedTheme="theme-modern-dark" // Force the theme
      themes={["theme-modern-dark"]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
