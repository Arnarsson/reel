"use client"

import React, { useState, ReactNode } from "react"
import {
  Brain,
  BookOpen,
  BarChart3,
  Shield,
  CheckCircle,
  User,
  Zap,
  Menu,
  X,
  Search,
  Bell,
  Settings,
  Home,
  Bookmark,
  Clock,
  Award,
  MessageSquare,
  ChevronDown,
  Lock,
  CheckSquare,
  PlayCircle,
  FileText,
  Code,
  LayoutGrid,
  List,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Input } from "@/components/ui/input"

// Define prop types
interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  href?: string;
}

// Sidebar Item Component
function SidebarItem({ icon, label, active = false, href = "#" }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

// Define lesson and module types
type LessonType = "video" | "reading" | "quiz" | "exercise";
type ModuleStatus = "completed" | "in_progress" | "locked";

interface Lesson {
  title: string;
  type: LessonType;
  duration: string;
  completed: boolean;
}

interface ModuleProps {
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
function ModuleItem({ module }: { module: ModuleProps }) {
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

// Main Dashboard Component
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Sample data (assuming ModuleProps includes necessary fields now)
  const modules: ModuleProps[] = [
    {
      title: "Module 1: Introduction to AI",
      description: "Core concepts and terminology",
      duration: "45 min",
      status: "completed",
      expanded: true,
      lessons: [
        { title: "What is Artificial Intelligence?", type: "video", duration: "10 min", completed: true },
        { title: "History of AI Development", type: "reading", duration: "15 min", completed: true },
        { title: "Types of AI Systems", type: "video", duration: "12 min", completed: true },
        { title: "Knowledge Check: AI Fundamentals", type: "quiz", duration: "8 min", completed: true },
      ],
    },
    {
      title: "Module 2: Machine Learning Basics",
      description: "Understanding how machines learn",
      duration: "1h 15min",
      status: "in_progress",
      expanded: false,
      lessons: [
        { title: "Supervised vs. Unsupervised Learning", type: "video", duration: "15 min", completed: true },
        { title: "Neural Networks Explained", type: "reading", duration: "20 min", completed: true },
        { title: "Training Models: Best Practices", type: "video", duration: "18 min", completed: false },
        { title: "Your First Machine Learning Model", type: "exercise", duration: "22 min", completed: false },
      ],
    },
    {
      title: "Module 3: Language Models",
      description: "Deep dive into NLP and language models",
      duration: "1h 30min",
      status: "locked",
      expanded: false,
      lessons: [
        { title: "Introduction to NLP", type: "video", duration: "12 min", completed: false },
        { title: "How Language Models Work", type: "reading", duration: "15 min", completed: false },
        { title: "Prompt Engineering Fundamentals", type: "video", duration: "20 min", completed: false },
        { title: "Crafting Effective Prompts", type: "exercise", duration: "25 min", completed: false },
        { title: "Module Assessment", type: "quiz", duration: "18 min", completed: false },
      ],
    },
  ]

  // Calculate overall progress (example)
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedLessons = modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0,
  )
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* --- Desktop Sidebar --- */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card">
        {/* Sidebar Header */}
        <div className="flex h-16 items-center gap-2 border-b border-border px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">HARKA</span>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 space-y-1 overflow-auto p-3">
          <SidebarItem icon={<Home className="h-5 w-5" />} label="Dashboard" href="/dashboard" active />
          <SidebarItem icon={<BookOpen className="h-5 w-5" />} label="My Courses" href="/courses" />
          <SidebarItem icon={<BarChart3 className="h-5 w-5" />} label="Progress" href="/profile#progress" />
          <SidebarItem icon={<MessageSquare className="h-5 w-5" />} label="Discussion" href="/discussion" />
          <SidebarItem icon={<Bookmark className="h-5 w-5" />} label="Resources" href="/resources" />
          <SidebarItem icon={<Award className="h-5 w-5" />} label="Certificates" href="/profile#certificates" />
          {/* Add Learning Path Section if needed */}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-border p-3">
          <SidebarItem icon={<Settings className="h-5 w-5" />} label="Settings" href="/profile#settings" />
          <Link href="/profile" className="block mt-2 rounded-md hover:bg-muted/50 cursor-pointer">
            <div className="flex items-center gap-3 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Alex Johnson</div>
                <div className="text-xs text-muted-foreground">View Profile</div>
              </div>
            </div>
          </Link>
        </div>
      </aside>

      {/* --- Mobile Header & Sidebar --- */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-card px-4 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">HARKA</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-border bg-card transition-transform duration-300 ease-in-out md:hidden",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Mobile Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">HARKA</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        {/* Mobile Sidebar Navigation */}
        <nav className="flex-1 space-y-1 overflow-auto p-3">
          <SidebarItem icon={<Home className="h-5 w-5" />} label="Dashboard" href="/dashboard" active />
          <SidebarItem icon={<BookOpen className="h-5 w-5" />} label="My Courses" href="/courses" />
          <SidebarItem icon={<BarChart3 className="h-5 w-5" />} label="Progress" href="/profile#progress" />
          <SidebarItem icon={<MessageSquare className="h-5 w-5" />} label="Discussion" href="/discussion" />
          <SidebarItem icon={<Bookmark className="h-5 w-5" />} label="Resources" href="/resources" />
          <SidebarItem icon={<Award className="h-5 w-5" />} label="Certificates" href="/profile#certificates" />
        </nav>
        {/* Mobile Sidebar Footer */}
        <div className="border-t border-border p-3">
          <SidebarItem icon={<Settings className="h-5 w-5" />} label="Settings" href="/profile#settings" />
          <Link href="/profile" className="block mt-2 rounded-md hover:bg-muted/50 cursor-pointer">
            <div className="flex items-center gap-3 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Alex Johnson</div>
                <div className="text-xs text-muted-foreground">View Profile</div>
              </div>
            </div>
          </Link>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0 grid-bg">
        {/* Main Header */}
        <header className="sticky top-0 z-10 hidden h-16 items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur-sm md:flex">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
            {/* Breadcrumbs or other context could go here */}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search modules, lessons..."
                className="h-9 w-full rounded-full bg-background pl-9 pr-4 text-sm"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Content Grid - Adjust padding and spacing */}
        <div className="p-8 space-y-8 md:p-10 md:space-y-10">
          {/* Welcome & Progress Summary */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">Welcome back, Alex!</CardTitle>
                  <p className="text-muted-foreground">Your learning journey overview.</p>
                </div>
                {/* Maybe add a primary action button here */}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                     <CheckSquare className="h-5 w-5" />
                   </div>
                   <div>
                     <div className="text-sm text-muted-foreground">Completed</div>
                     <div className="text-xl font-semibold">{completedLessons}</div>
                   </div>
                </div>
                 <div className="flex items-center gap-2">
                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                     <BookOpen className="h-5 w-5" />
                   </div>
                   <div>
                     <div className="text-sm text-muted-foreground">Total Lessons</div>
                     <div className="text-xl font-semibold">{totalLessons}</div>
                   </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Overall Progress</span>
                    <span className="text-sm font-semibold text-primary">{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Modules Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Current Course Modules</h2>
              <div className="flex items-center gap-2">
                 <Button variant="outline" size="sm" className="gap-1.5">
                   <Filter className="h-4 w-4" /> Filter
                 </Button>
                 <Button variant="outline" size="sm" className="gap-1.5">
                   <List className="h-4 w-4" /> List
                 </Button>
                 <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                   <LayoutGrid className="h-4 w-4" /> Grid
                 </Button>
              </div>
            </div>

            {/* Modules List */}
            <div className="space-y-3">
              {modules.map((module, i) => (
                <ModuleItem key={i} module={module} />
              ))}
            </div>
          </div>

          {/* Other sections like Recommended Courses can be added here using similar Card/styling */}

        </div>
      </main>
    </div>
  )
}
