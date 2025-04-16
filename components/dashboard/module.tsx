"use client"

import { useState } from "react"
import { Clock, ChevronDown, Lock, CheckCircle, PlayCircle, FileText, CheckSquare, Code, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Module({ title, description, duration, status, lessons, expanded = false }) {
  const [isExpanded, setIsExpanded] = useState(expanded)

  const statusIcons = {
    completed: <CheckCircle className="h-5 w-5 text-success" />,
    in_progress: <PlayCircle className="h-5 w-5 text-primary" />,
    locked: <Lock className="h-5 w-5 text-muted-foreground" />,
  }

  return (
    <div className="overflow-hidden rounded-lg border border-muted bg-black-soft hover:border-muted-foreground transition-all duration-300">
      <div className="flex cursor-pointer items-center justify-between p-4" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-3">
          {statusIcons[status]}
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
        </div>
      </div>
      {isExpanded && (
        <div className="border-t border-muted bg-black-pure p-4">
          <ul className="space-y-2">
            {lessons.map((lesson, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-md p-2 hover:bg-black-soft transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  {lesson.type === "video" && <PlayCircle className="h-4 w-4 text-primary" />}
                  {lesson.type === "reading" && <FileText className="h-4 w-4 text-purple" />}
                  {lesson.type === "quiz" && <CheckSquare className="h-4 w-4 text-success" />}
                  {lesson.type === "exercise" && <Code className="h-4 w-4 text-warning" />}
                  <span className={lesson.completed ? "text-gray-300" : "text-muted-foreground"}>{lesson.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                  {lesson.completed ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
