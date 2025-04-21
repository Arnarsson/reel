"use client"

import React, { useState } from "react"
import { useParams } from "next/navigation" // Keep useParams here
import { Module } from "@/components/dashboard/module" // Use the correct module component
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, BookOpen, BarChart3, Users, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Type for the fetched course data (can be shared or imported)
interface LessonData {
  id: string;
  title: string;
  type: string; // Consider making this a stricter type like LessonType
  duration: string;
  completed: boolean;
}

interface ModuleData {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: string; // Consider making this a stricter type like ModuleStatus
  lessons: LessonData[];
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  progress: number;
  instructor: string;
  duration: string;
  level: string;
  modules: ModuleData[];
}

interface CourseLayoutProps {
  courseData: CourseData | null; // Allow null if course isn't found
}

export function CourseLayout({ courseData }: CourseLayoutProps) {
  const params = useParams() // Get params on the client
  const [activeTab, setActiveTab] = useState("content")

  // Handle case where course data couldn't be fetched
  if (!courseData) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold text-destructive">Course Not Found</h1>
        <p className="text-muted-foreground">Could not load data for course ID: {params.courseId}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-8">
        <div className="space-y-4 rounded-lg border border-muted bg-black-soft p-6 hover:border-muted-foreground transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{courseData.title}</h1>
              <p className="text-muted-foreground">{courseData.description}</p>
            </div>
            <Button 
              size="lg" 
              className="hover:scale-105 transition-transform duration-200"
              onClick={() => console.log("Start next lesson")}
            >
              Start Next Lesson
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{courseData.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={courseData.progress} className="h-2 w-32" />
              <span className="text-sm text-muted-foreground">{courseData.progress}% Complete</span>
            </div>
          </div>
        </div>

        <div className="border-b border-muted">
          <div className="flex gap-4">
            {["content", "discussion", "resources"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative -mb-px p-3 text-sm font-medium hover:text-primary transition-colors duration-200",
                  activeTab === tab
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:border-b-2 hover:border-muted-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Content Tabs - State managed here */}
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
              // Pass expanded state if needed, or let Module manage it internally
            />
          ))}
        </TabsContent>

        {/* Placeholder Tab Content */}
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