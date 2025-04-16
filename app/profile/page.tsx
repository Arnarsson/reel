"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  User, 
  Award, 
  BookOpen, 
  Settings, 
  Bell, 
  Lock, 
  Mail, 
  Globe, 
  CheckCircle, 
  Clock, 
  Star,
  Edit
} from "lucide-react"

// Sample user data (replace with actual data fetching)
const userData = {
  id: "1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "/placeholder.svg",
  role: "Student",
  joinDate: "January 2023",
  progress: {
    coursesCompleted: 3,
    coursesInProgress: 2,
    totalHoursLearned: 24,
    certificatesEarned: 2,
  },
  achievements: [
    { id: "1", title: "Quick Learner", description: "Completed 3 courses in a month", icon: <Star className="h-5 w-5 text-yellow-500" /> },
    { id: "2", title: "Perfect Score", description: "Achieved 100% on a quiz", icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
    { id: "3", title: "Early Bird", description: "Completed a course before the deadline", icon: <Clock className="h-5 w-5 text-blue-500" /> },
  ],
  courses: [
    { id: "1", title: "AI Fundamentals", progress: 100, status: "completed", lastAccessed: "2 days ago" },
    { id: "2", title: "Machine Learning Basics", progress: 45, status: "in_progress", lastAccessed: "Today" },
    { id: "3", title: "Data Science Essentials", progress: 100, status: "completed", lastAccessed: "1 week ago" },
    { id: "4", title: "Python for AI", progress: 30, status: "in_progress", lastAccessed: "3 days ago" },
    { id: "5", title: "Deep Learning", progress: 0, status: "not_started", lastAccessed: "Never" },
  ],
  certificates: [
    { id: "1", title: "AI Fundamentals", issueDate: "March 15, 2023", image: "/placeholder.svg" },
    { id: "2", title: "Data Science Essentials", issueDate: "April 22, 2023", image: "/placeholder.svg" },
  ],
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(userData)

  const handleSaveProfile = () => {
    // In a real app, save the profile changes to the database
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto py-8">
      {/* Profile Header */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <Badge variant="outline">{user.role}</Badge>
          </div>
          <p className="text-muted-foreground">{user.email}</p>
          <p className="text-sm text-muted-foreground">Member since {user.joinDate}</p>
        </div>
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Progress Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Your learning journey so far</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Courses Completed</p>
                    <p className="text-2xl font-bold">{user.progress.coursesCompleted}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Courses In Progress</p>
                    <p className="text-2xl font-bold">{user.progress.coursesInProgress}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Hours Learned</p>
                    <p className="text-2xl font-bold">{user.progress.totalHoursLearned}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Certificates Earned</p>
                    <p className="text-2xl font-bold">{user.progress.certificatesEarned}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.courses
                    .filter(course => course.status === "in_progress" || course.status === "completed")
                    .sort((a, b) => {
                      if (a.lastAccessed === "Today") return -1;
                      if (b.lastAccessed === "Today") return 1;
                      if (a.lastAccessed === "Never") return 1;
                      if (b.lastAccessed === "Never") return -1;
                      return 0;
                    })
                    .slice(0, 3)
                    .map(course => (
                      <div key={course.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{course.title}</p>
                            <p className="text-xs text-muted-foreground">Last accessed {course.lastAccessed}</p>
                          </div>
                        </div>
                        <Badge variant={course.status === "completed" ? "default" : "outline"}>
                          {course.status === "completed" ? "Completed" : `${course.progress}%`}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Milestones you've reached</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {user.achievements.map(achievement => (
                    <div key={achievement.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {achievement.icon}
                      </div>
                      <div>
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>All your enrolled courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.courses.map(course => (
                  <div key={course.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3 mb-4 md:mb-0">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-xs text-muted-foreground">Last accessed {course.lastAccessed}</p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="w-full md:w-40">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1" />
                      </div>
                      <Badge variant={course.status === "completed" ? "default" : course.status === "in_progress" ? "outline" : "secondary"}>
                        {course.status === "completed" ? "Completed" : course.status === "in_progress" ? "In Progress" : "Not Started"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {course.status === "completed" ? "Review" : "Continue"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Milestones and badges you've earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {user.achievements.map(achievement => (
                  <Card key={achievement.id}>
                    <CardHeader className="pb-2">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        {achievement.icon}
                      </div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates">
          <Card>
            <CardHeader>
              <CardTitle>Certificates</CardTitle>
              <CardDescription>Your earned certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.certificates.map(certificate => (
                  <Card key={certificate.id} className="overflow-hidden">
                    <div className="aspect-[1.414/1] relative">
                      <img 
                        src={certificate.image} 
                        alt={certificate.title} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-bold text-white">{certificate.title}</h3>
                        <p className="text-sm text-gray-300">Issued on {certificate.issueDate}</p>
                      </div>
                    </div>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Download</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={user.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue={user.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatar">Avatar URL</Label>
                    <Input id="avatar" defaultValue={user.avatar} />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Profile Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{user.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Role</p>
                        <p className="font-medium">{user.role}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Join Date</p>
                        <p className="font-medium">{user.joinDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive updates about your courses</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Get notified about new content</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Dark Mode</Label>
                          <p className="text-sm text-muted-foreground">Use dark theme</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Security</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <Lock className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="mr-2 h-4 w-4" />
                        Two-Factor Authentication
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 