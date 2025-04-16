import type React from "react"
import "./globals.css"
import "./satoshi.css"
import "./cursor-styles.css"
import "./cursor-animations.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ForceTheme } from "@/components/force-theme"
import { CustomCursor } from "@/components/custom-cursor"

export const metadata = {
  title: "HARKA - AI der leverer reel forretningsværdi",
  description: "Transformer jeres virksomhed på 2 dage – fra abstrakt potentiale til konkrete resultater.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da" suppressHydrationWarning>
      <body className="font-satoshi antialiased bg-black text-white">
        <ForceTheme />
        <ThemeProvider>{children}</ThemeProvider>
        <CustomCursor />
      </body>
    </html>
  )
}


import './globals.css'