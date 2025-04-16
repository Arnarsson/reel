"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Check, ChevronDown, Moon, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const themes = [
  {
    id: "theme-deep-space",
    name: "Deep Space",
    icon: <Moon className="h-4 w-4" />,
  },
  {
    id: "theme-midnight-forest",
    name: "Midnight Forest",
    icon: <Moon className="h-4 w-4" />,
  },
  {
    id: "theme-graphite",
    name: "Graphite",
    icon: <Moon className="h-4 w-4" />,
  },
  {
    id: "theme-original-dark",
    name: "Original Dark",
    icon: <Moon className="h-4 w-4" />,
  },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const currentTheme = themes.find((t) => t.id === theme) || themes[0]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
          <Palette className="h-4 w-4" />
          <span className="hidden md:inline">{currentTheme.name}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => {
              setTheme(t.id)
              setOpen(false)
            }}
            className="flex items-center gap-2"
          >
            {t.icon}
            <span>{t.name}</span>
            {theme === t.id && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
