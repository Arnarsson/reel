"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PlayCircle, FileText, CheckSquare, Code, ArrowLeft, ArrowRight, Check } from "lucide-react"
import Link from "next/link"

interface LessonViewerProps {
  lesson: {
    id: string
    title: string
    type: "video" | "reading" | "quiz" | "exercise"
    content: any
    duration: string
    completed: boolean
  }
  onComplete: () => void
  onNext: () => void
  onPrevious: () => void
}

export function LessonViewer({ lesson, onComplete, onNext, onPrevious }: LessonViewerProps) {
  const [activeTab, setActiveTab] = useState("content")
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [exerciseCode, setExerciseCode] = useState("")

  const renderContent = () => {
    switch (lesson.type) {
      case "video":
        return (
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
            <iframe
              src={lesson.content.videoUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )
      case "reading":
        return (
          <div className="prose prose-invert max-w-none">
            {lesson.content.content}
          </div>
        )
      case "quiz":
        return (
          <div className="space-y-6">
            {lesson.content.questions.map((question: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{question.text}</CardTitle>
                  <CardDescription>{question.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {question.type === "multiple-choice" && (
                    <RadioGroup
                      value={quizAnswers[question.id]}
                      onValueChange={(value) =>
                        setQuizAnswers({ ...quizAnswers, [question.id]: value })
                      }
                    >
                      {question.options.map((option: string, optionIndex: number) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${question.id}-${optionIndex}`} />
                          <Label htmlFor={`${question.id}-${optionIndex}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  {question.type === "multiple-select" && (
                    <div className="space-y-2">
                      {question.options.map((option: string, optionIndex: number) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${question.id}-${optionIndex}`}
                            checked={quizAnswers[question.id]?.includes(option)}
                            onCheckedChange={(checked) => {
                              const currentAnswers = quizAnswers[question.id]?.split(",") || []
                              const newAnswers = checked
                                ? [...currentAnswers, option]
                                : currentAnswers.filter((a: string) => a !== option)
                              setQuizAnswers({
                                ...quizAnswers,
                                [question.id]: newAnswers.join(","),
                              })
                            }}
                          />
                          <Label htmlFor={`${question.id}-${optionIndex}`}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )
      case "exercise":
        return (
          <div className="space-y-4">
            <div className="prose prose-invert max-w-none">
              {lesson.content.instructions}
            </div>
            <div className="rounded-lg border border-border bg-black-soft p-4">
              <Textarea
                value={exerciseCode}
                onChange={(e) => setExerciseCode(e.target.value)}
                placeholder="Write your code here..."
                className="min-h-[200px] font-mono"
              />
            </div>
            {lesson.content.hints && (
              <div className="rounded-lg border border-border bg-black-soft p-4">
                <h4 className="mb-2 font-medium">Hints</h4>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  {lesson.content.hints.map((hint: string, index: number) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Lesson Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {lesson.type === "video" && <PlayCircle className="h-5 w-5 text-primary" />}
          {lesson.type === "reading" && <FileText className="h-5 w-5 text-purple" />}
          {lesson.type === "quiz" && <CheckSquare className="h-5 w-5 text-success" />}
          {lesson.type === "exercise" && <Code className="h-5 w-5 text-warning" />}
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{lesson.duration}</span>
          {lesson.completed && <Check className="h-5 w-5 text-success" />}
        </div>
      </div>

      {/* Lesson Content */}
      <div className="rounded-lg border border-border bg-black-soft p-6">
        {renderContent()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button onClick={onComplete}>
          {lesson.completed ? "Mark as Incomplete" : "Mark as Complete"}
        </Button>
        <Button onClick={onNext}>
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 