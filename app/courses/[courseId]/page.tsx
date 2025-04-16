"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Module } from "@/components/dashboard/module"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, BookOpen, BarChart3, Users } from "lucide-react"

// Sample course data (replace with actual data fetching)
const courseData = {
  id: "1",
  title: "AI Fundamentals",
  description: "Learn the core concepts of artificial intelligence and machine learning",
  progress: 45,
  instructor: "Dr. Sarah Chen",
  duration: "8 weeks",
  level: "Beginner",
  modules: [
    {
      id: "1",
      title: "Introduction to AI",
      description: "Core concepts and terminology",
      duration: "45 min",
      status: "completed",
      lessons: [
        { id: "1", title: "What is Artificial Intelligence?", type: "video", duration: "10 min", completed: true },
        { id: "2", title: "History of AI Development", type: "reading", duration: "15 min", completed: true },
        { id: "3", title: "Types of AI Systems", type: "video", duration: "12 min", completed: true },
        { id: "4", title: "Knowledge Check: AI Fundamentals", type: "quiz", duration: "8 min", completed: true },
      ],
    },
    {
      id: "2",
      title: "Machine Learning Basics",
      description: "Understanding how machines learn",
      duration: "1h 15min",
      status: "in_progress",
      lessons: [
        { id: "5", title: "Supervised vs. Unsupervised Learning", type: "video", duration: "15 min", completed: true },
        { id: "6", title: "Neural Networks Explained", type: "reading", duration: "20 min", completed: true },
        { id: "7", title: "Training Models: Best Practices", type: "video", duration: "18 min", completed: false },
        { id: "8", title: "Your First Machine Learning Model", type: "exercise", duration: "22 min", completed: false },
      ],
    },
    {
      id: "3",
      title: "Language Models",
      description: "Deep dive into NLP and language models",
      duration: "1h 30min",
      status: "locked",
      lessons: [
        { id: "9", title: "Introduction to NLP", type: "video", duration: "12 min", completed: false },
        { id: "10", title: "How Language Models Work", type: "reading", duration: "15 min", completed: false },
        { id: "11", title: "Prompt Engineering Fundamentals", type: "video", duration: "20 min", completed: false },
        { id: "12", title: "Crafting Effective Prompts", type: "exercise", duration: "25 min", completed: false },
        { id: "13", title: "Module Assessment", type: "quiz", duration: "18 min", completed: false },
      ],
    },
  ],
}

export default function CoursePage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("content")

  return (
    <div className="container mx-auto py-8">
      {/* Course Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{courseData.title}</h1>
        <p className="mt-2 text-muted-foreground">{courseData.description}</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{courseData.instructor}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{courseData.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{courseData.level}</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Course Progress</span>
            <span className="text-sm font-medium">{courseData.progress}%</span>
          </div>
          <Progress value={courseData.progress} className="h-2" />
        </div>
      </div>

      {/* Course Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Course Content</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          {courseData.modules.map((module) => (
            <Module
              key={module.id}
              title={module.title}
              description={module.description}
              duration={module.duration}
              status={module.status}
              lessons={module.lessons}
            />
          ))}
        </TabsContent>

        <TabsContent value="discussion">
          <Card>
            <CardHeader>
              <CardTitle>Course Discussion</CardTitle>
              <CardDescription>Join the conversation with your peers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-48 text-muted-foreground">
                <MessageSquare className="h-8 w-8 mr-2" />
                <span>Discussion feature coming soon</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Course Resources</CardTitle>
              <CardDescription>Additional materials and references</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-48 text-muted-foreground">
                <BookOpen className="h-8 w-8 mr-2" />
                <span>Resources feature coming soon</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 