import type { ReactNode } from "react"
import { Inter } from 'next/font/google' // Example, replace if needed
import localFont from 'next/font/local'
import "./globals.css"
// import "./satoshi.css" // Remove direct CSS import
import "./cursor-styles.css"

import { Providers } from "@/components/providers"
import { Header } from "@/components/header"
import { CustomCursor } from "@/components/custom-cursor"
import { ClerkProvider } from '@clerk/nextjs'

// Setup Satoshi font with next/font/local
const fontSatoshi = localFont({
  src: [
    {
      path: 'fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/Satoshi-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: 'fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/Satoshi-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: 'fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'fonts/Satoshi-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: 'fonts/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: 'fonts/Satoshi-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-satoshi', // CSS variable name
  display: 'swap', // Optional: Adjust font display strategy
})

// Removed static metadata object
// export const metadata = { ... }

// Implement generateMetadata function
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  // In a root layout, metadata is usually static, but using the function allows future flexibility
  // and consistency with other layouts/pages.
  // You could add logic here later if needed (e.g., fetch global settings).
  return {
    title: "HARKA - AI der leverer reel forretningsværdi",
    description: "Transformer jeres virksomhed på 2 dage – fra abstrakt potentiale til konkrete resultater.",
    // Add other metadata fields as needed, e.g.:
    // metadataBase: new URL('https://yourdomain.com'),
    // openGraph: { ... },
  }
}


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="da" suppressHydrationWarning>
        {/* Apply the font variable to the body */}
        <body className={`${fontSatoshi.variable} font-satoshi antialiased min-h-svh bg-background text-foreground`}>
          <Providers>
            <Header />
            {/* Wrap children in main and add padding-top */}
            <main className="pt-16">
              {children}
            </main>
            <CustomCursor />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}