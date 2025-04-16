"use client"
import { Brain, User } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function SidebarItem({ icon, label, active = false, href = "#", badge = null }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        active
          ? "bg-gradient-to-r from-primary to-purple text-white"
          : "text-muted-foreground hover:bg-black-lighter hover:text-white",
      )}
    >
      {icon}
      <span>{label}</span>
      {badge && (
        <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium">
          {badge}
        </span>
      )}
    </Link>
  )
}

export function Sidebar({ items, learningPathItems, user }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-muted bg-black-soft md:flex">
      <div className="flex h-16 items-center gap-2 border-b border-muted px-6">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-purple flex items-center justify-center">
          <Brain className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-medium">AI Training Platform</span>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <nav className="space-y-1">
          {items.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              active={item.active}
              badge={item.badge}
              href={item.href}
            />
          ))}
        </nav>

        <div className="mt-8">
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">Learning Path</h3>
          <nav className="space-y-1">
            {learningPathItems.map((item, index) => (
              <SidebarItem key={index} icon={item.icon} label={item.label} active={item.active} href={item.href} />
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-muted p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-black-lighter flex items-center justify-center">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.role}</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
