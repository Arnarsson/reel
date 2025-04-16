"use client"

import type { ReactNode } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { useMagneticCursor } from "@/hooks/use-magnetic-cursor"

interface MagneticButtonProps extends ButtonProps {
  children: ReactNode
  strength?: number
  radius?: number
}

export function MagneticButton({ children, strength = 0.5, radius = 100, ...props }: MagneticButtonProps) {
  const buttonRef = useMagneticCursor({ strength, radius })

  return (
    <Button ref={buttonRef as any} className="magnetic-cursor" {...props}>
      {children}
    </Button>
  )
}
