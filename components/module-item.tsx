"use client"

import React, { useState, ReactNode } from "react"
import {
  CheckCircle,
  Clock,
  Lock,
  ChevronDown,
  PlayCircle,
  FileText,
  CheckSquare,
  Code,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Define lesson and module types
type LessonType = "video" | "reading" | "quiz" | "exercise";
type ModuleStatus = "completed" | "in_progress" | "locked";

interface Lesson {
  title: string;
  type: LessonType;
  duration: string;
  completed: boolean;
}

export interface ModuleProps { // Export ModuleProps if needed elsewhere
  title: string;
  description: string;
  duration: string;
  status: ModuleStatus;
  lessons: Lesson[];
  expanded?: boolean;
}

// Icon map for lessons
const lessonIcons: Record<LessonType, ReactNode> = {
  video: <PlayCircle className="h-4 w-4" />,
  reading: <FileText className="h-4 w-4" />,
  quiz: <CheckSquare className="h-4 w-4" />,
  exercise: <Code className="h-4 w-4" />,
}

// Module Component
export function ModuleItem({ module }: { module: ModuleProps }) {
  const [isExpanded, setIsExpanded] = useState(module.expanded || false)

  const statusIndicator = {
    completed: <CheckCircle className="h-4 w-4 text-success" />,
    in_progress: <Clock className="h-4 w-4 text-primary" />,
    locked: <Lock className="h-4 w-4 text-muted-foreground" />,
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* Module Header */}
      <div
        className="flex cursor-pointer items-center justify-between p-4 hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {statusIndicator[module.status]}
          <span className="font-medium text-foreground">{module.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{module.lessons.length} lessons</span>
          <span className="text-xs text-muted-foreground">{module.duration}</span>
          <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform", isExpanded && "rotate-180")} />
        </div>
      </div>

      {/* Expanded Lessons List */}
      {isExpanded && (
        <div className="border-t border-border bg-background/50 px-4 py-3">
          <ul className="space-y-2">
            {module.lessons.map((lesson, i) => (
              <li key={i} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  {React.cloneElement(lessonIcons[lesson.type] as React.ReactElement<{ className?: string }>, {
                    className: cn("h-4 w-4", lesson.completed ? "text-success" : "text-muted-foreground"),
                  })}
                  <span className={cn("text-sm", lesson.completed ? "text-foreground line-through" : "text-muted-foreground")}>
                    {lesson.title}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{lesson.duration}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} 