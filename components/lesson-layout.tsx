"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { LessonViewer } from "@/components/dashboard/lesson-viewer"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from "lucide-react"

// Types (assuming shared types or define here)
interface LessonData { 
  id: string;
  title: string;
  type: "video" | "reading" | "quiz" | "exercise";
  content: any;
  duration: string;
  completed: boolean;
}

interface LessonLayoutProps {
  lesson: LessonData;
  courseId: string;
  courseTitle: string; // Added for context
  moduleTitle: string; // Added for context
  lessonIndexInModule: number; // For progress display
  lessonsInModuleCount: number; // For progress display
  nextLessonId: string | null;
  previousLessonId: string | null;
}

export function LessonLayout({ 
  lesson: initialLesson,
  courseId,
  courseTitle, 
  moduleTitle,
  lessonIndexInModule,
  lessonsInModuleCount,
  nextLessonId,
  previousLessonId 
}: LessonLayoutProps) {
  const router = useRouter()
  const [lesson, setLesson] = useState(initialLesson) // Manage completion state locally

  const handleComplete = async () => {
    const newCompletedStatus = !lesson.completed
    // TODO: Implement actual API call/Server Action to update completion status
    console.log(`Updating lesson ${lesson.id} completed status to: ${newCompletedStatus}`);
    try {
      // Example: await updateLessonCompletion(lesson.id, newCompletedStatus);
      setLesson({ ...lesson, completed: newCompletedStatus })
    } catch (error) {
      console.error("Failed to update lesson status:", error);
      // Optionally show an error message to the user
    }
  }

  const handleNext = () => {
    if (nextLessonId) {
      router.push(`/courses/${courseId}/lessons/${nextLessonId}`)
    } else {
      // If no next lesson, go back to the course page
      router.push(`/courses/${courseId}`)
    }
  }

  const handlePrevious = () => {
    if (previousLessonId) {
      router.push(`/courses/${courseId}/lessons/${previousLessonId}`)
    } else {
      // If no previous lesson, go back to the course page
      router.push(`/courses/${courseId}`)
    }
  }
  
  const progressPercent = lessonsInModuleCount > 0 
    ? Math.round(((lessonIndexInModule + 1) / lessonsInModuleCount) * 100)
    : 0;

  return (
    <div className="container mx-auto py-8">
      {/* Back to Course Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href={`/courses/${courseId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {courseTitle}
          </Link>
        </Button>
      </div>

      {/* Module/Lesson Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {moduleTitle} - Lesson {lessonIndexInModule + 1} of {lessonsInModuleCount}
          </span>
          <span className="text-sm font-medium">
            {progressPercent}%
          </span>
        </div>
        <Progress 
          value={progressPercent} 
          className="h-2" 
        />
      </div>

      {/* Lesson Viewer and Navigation */}
      <LessonViewer
        lesson={lesson}
        onComplete={handleComplete} // Uses local state + mutation
        onNext={handleNext}         // Uses router + passed ID
        onPrevious={handlePrevious} // Uses router + passed ID
      />
    </div>
  )
} 