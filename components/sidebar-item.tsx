import React, { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Define prop types
interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  href?: string;
}

// Sidebar Item Component
export function SidebarItem({ icon, label, active = false, href = "#" }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
} 