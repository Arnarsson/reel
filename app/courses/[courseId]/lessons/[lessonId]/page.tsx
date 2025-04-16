"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { LessonViewer } from "@/components/dashboard/lesson-viewer"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Sample lesson data (replace with actual data fetching)
const lessonData = {
  id: "1",
  title: "What is Artificial Intelligence?",
  type: "video",
  duration: "10 min",
  completed: false,
  content: {
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
}

// Sample course data (replace with actual data fetching)
const courseData = {
  id: "1",
  title: "AI Fundamentals",
  modules: [
    {
      id: "1",
      title: "Introduction to AI",
      lessons: [
        { id: "1", title: "What is Artificial Intelligence?", type: "video", duration: "10 min", completed: false },
        { id: "2", title: "History of AI Development", type: "reading", duration: "15 min", completed: false },
        { id: "3", title: "Types of AI Systems", type: "video", duration: "12 min", completed: false },
        { id: "4", title: "Knowledge Check: AI Fundamentals", type: "quiz", duration: "8 min", completed: false },
      ],
    },
    {
      id: "2",
      title: "Machine Learning Basics",
      lessons: [
        { id: "5", title: "Supervised vs. Unsupervised Learning", type: "video", duration: "15 min", completed: false },
        { id: "6", title: "Neural Networks Explained", type: "reading", duration: "20 min", completed: false },
        { id: "7", title: "Training Models: Best Practices", type: "video", duration: "18 min", completed: false },
        { id: "8", title: "Your First Machine Learning Model", type: "exercise", duration: "22 min", completed: false },
      ],
    },
  ],
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const [currentLesson, setCurrentLesson] = useState(lessonData)
  const [course, setCourse] = useState(courseData)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)

  // Find the current lesson and module
  useEffect(() => {
    const courseId = params.courseId as string
    const lessonId = params.lessonId as string
    
    // In a real app, fetch the course and lesson data from an API
    // For now, we'll use the sample data
    
    // Find the lesson in the course modules
    let foundLesson = null
    let foundLessonIndex = -1
    let foundModuleIndex = -1
    
    course.modules.forEach((module, moduleIndex) => {
      const lessonIndex = module.lessons.findIndex(lesson => lesson.id === lessonId)
      if (lessonIndex !== -1) {
        foundLesson = module.lessons[lessonIndex]
        foundLessonIndex = lessonIndex
        foundModuleIndex = moduleIndex
      }
    })
    
    if (foundLesson) {
      setCurrentLesson({
        ...foundLesson,
        content: lessonData.content, // In a real app, fetch the actual content
      })
      setCurrentLessonIndex(foundLessonIndex)
      setCurrentModuleIndex(foundModuleIndex)
    }
  }, [params.courseId, params.lessonId])

  const handleComplete = () => {
    // In a real app, update the lesson completion status in the database
    setCurrentLesson({
      ...currentLesson,
      completed: !currentLesson.completed,
    })
  }

  const handleNext = () => {
    const currentModule = course.modules[currentModuleIndex]
    
    // If there are more lessons in the current module
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      const nextLesson = currentModule.lessons[currentLessonIndex + 1]
      router.push(`/courses/${params.courseId}/lessons/${nextLesson.id}`)
    } 
    // If there are more modules
    else if (currentModuleIndex < course.modules.length - 1) {
      const nextModule = course.modules[currentModuleIndex + 1]
      const nextLesson = nextModule.lessons[0]
      router.push(`/courses/${params.courseId}/lessons/${nextLesson.id}`)
    }
    // If we're at the end of the course
    else {
      router.push(`/courses/${params.courseId}`)
    }
  }

  const handlePrevious = () => {
    // If there are previous lessons in the current module
    if (currentLessonIndex > 0) {
      const prevLesson = course.modules[currentModuleIndex].lessons[currentLessonIndex - 1]
      router.push(`/courses/${params.courseId}/lessons/${prevLesson.id}`)
    } 
    // If there are previous modules
    else if (currentModuleIndex > 0) {
      const prevModule = course.modules[currentModuleIndex - 1]
      const prevLesson = prevModule.lessons[prevModule.lessons.length - 1]
      router.push(`/courses/${params.courseId}/lessons/${prevLesson.id}`)
    }
    // If we're at the beginning of the course
    else {
      router.push(`/courses/${params.courseId}`)
    }
  }

  return (
    <div className="container mx-auto py-8">
      {/* Back to Course Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href={`/courses/${params.courseId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Link>
        </Button>
      </div>

      {/* Course Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {course.modules[currentModuleIndex].title} - Lesson {currentLessonIndex + 1} of {course.modules[currentModuleIndex].lessons.length}
          </span>
          <span className="text-sm font-medium">
            {Math.round((currentLessonIndex / course.modules[currentModuleIndex].lessons.length) * 100)}%
          </span>
        </div>
        <Progress 
          value={(currentLessonIndex / course.modules[currentModuleIndex].lessons.length) * 100} 
          className="h-2" 
        />
      </div>

      {/* Lesson Viewer */}
      <LessonViewer
        lesson={currentLesson}
        onComplete={handleComplete}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  )
} 