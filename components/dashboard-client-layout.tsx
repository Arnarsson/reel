"use client"

import React, { useState, ReactNode } from "react"
import Link from "next/link"
import {
  Brain,
  BookOpen,
  BarChart3,
  User,
  Menu,
  X,
  Search,
  Bell,
  Settings,
  Home,
  Bookmark,
  Award,
  MessageSquare,
  LayoutGrid,
  List,
  Filter,
  CheckCircle,
  Clock,
  Circle,
  Trophy,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { SidebarItem } from "@/components/sidebar-item"
import { ModuleItem, ModuleProps } from "@/components/module-item"
import { cn } from "@/lib/utils"

interface DashboardClientLayoutProps {
  userName: string;
  modules: ModuleProps[];
  overallProgress: number;
  activeCourses: number;
  hoursSpent: number;
  achievements: number;
  children?: ReactNode; // Keep children prop if needed, though content is now managed here
}

export function DashboardClientLayout({ 
  userName,
  modules,
  overallProgress,
  activeCourses,
  hoursSpent,
  achievements,
}: DashboardClientLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const mobileSidebarId = "mobile-sidebar"

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
                <div className="text-sm font-medium text-foreground">{userName}</div>
                <div className="text-xs text-muted-foreground">View Profile</div>
              </div>
            </div>
          </Link>
        </div>
      </aside>

      {/* --- Mobile Header & Sidebar --- */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-card px-4 md:hidden">
        {/* Mobile Header Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">HARKA</span>
        </div>
        {/* Mobile Menu Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover-lift"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-controls={mobileSidebarId}
          aria-expanded={isSidebarOpen}
          aria-label={isSidebarOpen ? "Luk sidebar" : "Åbn sidebar"}
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Sidebar Panel */}
      {isSidebarOpen && (
        <div 
          id={mobileSidebarId}
          className="fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-card p-4 transition-transform duration-300 ease-in-out md:hidden"
          style={{ transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        >
          <nav className="mt-16 flex-1 space-y-1 overflow-auto">
             {/* Mobile Nav Items - identical to desktop for now */}
            <SidebarItem icon={<Home className="h-5 w-5" />} label="Dashboard" href="/dashboard" active />
            <SidebarItem icon={<BookOpen className="h-5 w-5" />} label="My Courses" href="/courses" />
            <SidebarItem icon={<BarChart3 className="h-5 w-5" />} label="Progress" href="/profile#progress" />
            <SidebarItem icon={<MessageSquare className="h-5 w-5" />} label="Discussion" href="/discussion" />
            <SidebarItem icon={<Bookmark className="h-5 w-5" />} label="Resources" href="/resources" />
            <SidebarItem icon={<Award className="h-5 w-5" />} label="Certificates" href="/profile#certificates" />
          </nav>
          <div className="mt-auto border-t border-border pt-3">
            <SidebarItem icon={<Settings className="h-5 w-5" />} label="Settings" href="/profile#settings" />
            <Link href="/profile" className="block mt-2 rounded-md hover:bg-muted/50 cursor-pointer">
               {/* Mobile Profile Link */}
               <div className="flex items-center gap-3 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{userName}</div>
                  <div className="text-xs text-muted-foreground">View Profile</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* --- Main Content Area --- */}
      <main className="flex-1 overflow-y-auto bg-background pt-16 md:pt-0">
        {/* Dashboard Header */}
        <div className="sticky top-0 z-30 border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {userName}!</p>
            </div>
            {/* Header Actions (Search, Bell, Profile Icon) */}
            <div className="flex items-center space-x-4">
              <Input type="search" placeholder="Search courses..." className="hidden md:block w-64" />
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Link href="/profile">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Course Modules */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Course: AI Fundamentals</CardTitle> {/* TODO: Make dynamic */}
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Overall Progress</span>
                    <span>{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Modules</h3>
                  {/* View/Filter Buttons */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm"><List className="h-4 w-4 mr-1"/> List View</Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground"><LayoutGrid className="h-4 w-4 mr-1"/> Grid View</Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground"><Filter className="h-4 w-4 mr-1"/> Filter</Button>
                  </div>
                </div>
                {/* Module List */}
                <div className="space-y-4">
                  {modules.length > 0 ? (
                    modules.map((module) => (
                      <Card key={module.id ?? module.title} className="hover-lift">
                        <CardHeader>
                          <CardTitle>{module.title}</CardTitle>
                          <CardDescription>{module.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {module.lessons.map((lesson) => (
                              <div key={lesson.id ?? lesson.title} className="flex items-center justify-between">
                                <span className="text-sm">{lesson.title}</span>
                                {lesson.status === 'completed' ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : lesson.status === 'in-progress' ? (
                                  <Clock className="h-5 w-5 text-yellow-500" />
                                ) : (
                                  <Circle className="h-5 w-5 text-gray-300" />
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No modules available for this course yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Stats & Resources */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* TODO: Fetch real stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <Card className="hover-lift">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
                      <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{overallProgress}%</div>
                    </CardContent>
                  </Card>
                  <Card className="hover-lift">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{activeCourses}</div>
                    </CardContent>
                  </Card>
                  <Card className="hover-lift">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Hours Spent</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{hoursSpent}</div>
                    </CardContent>
                  </Card>
                  <Card className="hover-lift">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{achievements}</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Bookmarked Resources</CardTitle>
              </CardHeader>
              <CardContent>
                 {/* TODO: Fetch real bookmarks */}
                 {/* NOTE: Example only - Replace with actual data and loop */}
                 {[{id: 'react', title: 'React Fundamentals', desc: 'Core concepts and hooks'}, {id:'next', title:'Next.js App Router', desc:'Server and Client Components'}, {id:'tw', title:'Tailwind CSS Guide', desc:'Utility-first CSS framework'}].map((bookmark) => (
                  <Card key={bookmark.id} className="hover-lift">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <CardTitle className="text-sm font-medium">{bookmark.title}</CardTitle>
                      <Bookmark className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">{bookmark.desc}</p>
                    </CardContent>
                  </Card>
                 ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 