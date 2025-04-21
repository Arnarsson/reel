"use client"

import { useState } from "react"
import { Clock, ChevronDown, Lock, CheckCircle, PlayCircle, FileText, CheckSquare, Code, Play, Circle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Module({ title, description, duration, status, lessons, expanded = false }) {
  const [isExpanded, setIsExpanded] = useState(expanded)

  const statusIcons = {
    completed: <CheckCircle className="h-5 w-5 text-success" />,
    in_progress: <PlayCircle className="h-5 w-5 text-primary" />,
    locked: <Lock className="h-5 w-5 text-muted-foreground" />,
  }

  const statusIcon = statusIcons[status]

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between rounded-lg border border-muted bg-black-soft p-4 hover:border-muted-foreground transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          {statusIcon}
          <div className="text-left">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{duration}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="ml-4 space-y-2">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-muted p-3 hover:border-muted-foreground transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                {lesson.type === "video" ? (
                  <Play className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <FileText className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm">{lesson.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                {lesson.completed ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-3 hover:scale-105 transition-transform duration-200"
          >
            Start Module
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
