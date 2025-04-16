"use client"

import { ArrowRight, Clock, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CourseCard({ title, description, progress, image, category, duration, level, href = "#" }) {
  return (
    <Card className="overflow-hidden border-muted bg-black-soft transition-all hover:border-muted-foreground hover:shadow-lg hover-lift">
      <div className="relative aspect-video overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black-pure/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="mb-1 inline-flex items-center rounded-full bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
            {category}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <Clock className="h-3 w-3" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <Award className="h-3 w-3" />
              <span>{level}</span>
            </div>
          </div>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-1" />
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant={progress === 100 ? "outline" : "default"}>
          <Link href={href}>
            {progress === 100 ? "Review Course" : "Continue Learning"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
