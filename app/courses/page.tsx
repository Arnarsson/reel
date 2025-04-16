"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CoursesPage() {
  // TODO: Fetch and display actual course list
  const courses = [
    { id: "1", title: "AI Fundamentals" },
    { id: "2", title: "Machine Learning Basics" },
    { id: "3", title: "Data Science Essentials" },
    { id: "4", title: "Python for AI" },
    { id: "5", title: "Deep Learning" },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>
      <p className="text-muted-foreground mb-8">Browse and access all your enrolled courses.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            {/* Add more course details here later */}
            <Button asChild variant="outline" className="mt-4">
              <Link href={`/courses/${course.id}`}>Go to Course</Link>
            </Button>
          </div>
        ))}
      </div>
      {/* We can add filtering/sorting options here later */}
    </div>
  )
} 