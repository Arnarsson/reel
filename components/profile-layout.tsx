"use client"

import React, { useState } from "react"
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
  User, Award, BookOpen, Settings, Bell, Lock, Mail, Globe, CheckCircle, Clock, Star, Edit
} from "lucide-react"

// Types (assuming shared or defined here)
interface Achievement { id: string; title: string; description: string; icon: React.ReactNode; }
interface CourseProgress { id: string; title: string; progress: number; status: string; lastAccessed: string; }
interface Certificate { id: string; title: string; issueDate: string; image: string; }
interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  joinDate: string;
  progress: { coursesCompleted: number; coursesInProgress: number; totalHoursLearned: number; certificatesEarned: number; };
  achievements: Achievement[];
  courses: CourseProgress[];
  certificates: Certificate[];
}

interface ProfileLayoutProps {
  initialUserData: UserData;
}

export function ProfileLayout({ initialUserData }: ProfileLayoutProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(initialUserData)

  // TODO: Implement proper form handling if needed, potentially with react-hook-form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    // TODO: Implement API call/Server Action to save profile changes
    console.log("Saving profile:", user);
    try {
      // await saveUserProfile(user); 
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
      // Show error message
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Profile Header */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <Input 
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="text-3xl font-bold h-auto p-0 border-0 shadow-none focus-visible:ring-0"
              />
            ) : (
              <h1 className="text-3xl font-bold">{user.name}</h1>
            )}
            <Badge variant="outline">{user.role}</Badge>
          </div>
          {isEditing ? (
             <Input 
                name="email"
                type="email"
                value={user.email}
                onChange={handleInputChange}
                className="text-muted-foreground h-auto p-0 border-0 shadow-none focus-visible:ring-0 mt-1"
              />
          ) : (
            <p className="text-muted-foreground">{user.email}</p>
          )}
          <p className="text-sm text-muted-foreground">Member since {user.joinDate}</p>
        </div>
        <div>
          {isEditing && (
             <Button onClick={handleSaveProfile} className="mr-2">Save Changes</Button>
          )}
          <Button variant={isEditing ? "ghost" : "outline"} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : <><Edit className="mr-2 h-4 w-4"/> Edit Profile</>}
          </Button>
        </div>
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

        {/* Overview Tab Content */}
        <TabsContent value="overview">
          {/* ... Overview content using user state ... */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card>
              <CardHeader><CardTitle>Learning Progress</CardTitle></CardHeader>
              <CardContent>
                 <div className="grid grid-cols-2 gap-4">
                  {/* Progress stats */}
                  <div className="space-y-1"><p className="text-sm text-muted-foreground">Completed</p><p className="text-2xl font-bold">{user.progress.coursesCompleted}</p></div>
                  <div className="space-y-1"><p className="text-sm text-muted-foreground">In Progress</p><p className="text-2xl font-bold">{user.progress.coursesInProgress}</p></div>
                  <div className="space-y-1"><p className="text-sm text-muted-foreground">Hours Learned</p><p className="text-2xl font-bold">{user.progress.totalHoursLearned}</p></div>
                  <div className="space-y-1"><p className="text-sm text-muted-foreground">Certificates</p><p className="text-2xl font-bold">{user.progress.certificatesEarned}</p></div>
                </div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                   {/* Recent activity list */}
                   {user.courses.slice(0, 3).map(course => (
                      <div key={course.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"><BookOpen className="h-5 w-5 text-primary" /></div><div><p className="font-medium">{course.title}</p><p className="text-xs text-muted-foreground">Last accessed {course.lastAccessed}</p></div></div>
                        <Badge variant={course.status === "completed" ? "default" : "outline"}>{course.status === "completed" ? "Completed" : `${course.progress}%`}</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
             <Card className="md:col-span-2">
               <CardHeader><CardTitle>Achievements</CardTitle></CardHeader>
               <CardContent>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                   {/* Achievements grid */}
                  {user.achievements.map(achievement => (
                    <div key={achievement.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">{achievement.icon}</div>
                      <div><p className="font-medium">{achievement.title}</p><p className="text-xs text-muted-foreground">{achievement.description}</p></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Courses Tab Content */}
        <TabsContent value="courses">
           {/* ... My Courses content using user state ... */}
           <Card>
            <CardHeader><CardTitle>My Courses</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                 {user.courses.map(course => (
                  <div key={course.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border">
                     {/* Course details */}
                    <div className="flex items-center gap-3 mb-4 md:mb-0"><div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"><BookOpen className="h-5 w-5 text-primary" /></div><div><p className="font-medium">{course.title}</p><p className="text-xs text-muted-foreground">Last accessed {course.lastAccessed}</p></div></div>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="w-full md:w-40"><div className="flex items-center justify-between mb-1"><span className="text-xs text-muted-foreground">Progress</span><span className="text-xs font-medium">{course.progress}%</span></div><Progress value={course.progress} className="h-1" /></div>
                      <Badge variant={course.status === "completed" ? "default" : course.status === "in_progress" ? "outline" : "secondary"}>{course.status === "completed" ? "Completed" : course.status === "in_progress" ? "In Progress" : "Not Started"}</Badge>
                      <Button variant="outline" size="sm">{course.status === "completed" ? "Review" : "Continue"}</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab Content */}
        <TabsContent value="achievements">
           {/* ... Achievements content using user state ... */}
            <Card>
              <CardHeader><CardTitle>Achievements</CardTitle><CardDescription>Milestones and badges you've earned</CardDescription></CardHeader>
              <CardContent>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.achievements.map(achievement => (
                    <Card key={achievement.id}>
                      <CardHeader className="items-center pb-2"><div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">{React.cloneElement(achievement.icon as React.ReactElement, { className: "h-8 w-8" })}</div><CardTitle className="text-center text-lg">{achievement.title}</CardTitle></CardHeader>
                      <CardContent><p className="text-sm text-muted-foreground text-center">{achievement.description}</p></CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
          </Card>
        </TabsContent>

        {/* Certificates Tab Content */}
        <TabsContent value="certificates">
           {/* ... Certificates content using user state ... */}
           <Card>
            <CardHeader><CardTitle>Certificates</CardTitle><CardDescription>Download your earned certificates</CardDescription></CardHeader>
            <CardContent>
               {user.certificates.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.certificates.map(cert => (
                    <Card key={cert.id} className="overflow-hidden">
                       {/* Placeholder Image - replace with actual certificate image/preview */}
                       <div className="aspect-video bg-muted flex items-center justify-center"><Award className="h-16 w-16 text-muted-foreground/50"/></div> 
                      <CardContent className="p-4">
                        <p className="font-medium">{cert.title}</p>
                        <p className="text-sm text-muted-foreground">Issued: {cert.issueDate}</p>
                        <Button variant="outline" size="sm" className="mt-2">Download</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
               ) : (
                 <p className="text-muted-foreground">No certificates earned yet.</p>
               )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab Content */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Settings */}
            <Card className="md:col-span-2">
              <CardHeader><CardTitle>Profile Settings</CardTitle><CardDescription>Update your personal information</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                {/* TODO: Replace with react-hook-form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1"><Label htmlFor="name">Full Name</Label><Input id="name" name="name" value={user.name} onChange={handleInputChange} disabled={!isEditing}/></div>
                  <div className="space-y-1"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" value={user.email} onChange={handleInputChange} disabled={!isEditing}/></div>
                </div>
                 {/* Add other fields like bio, website etc. */} 
              </CardContent>
              {isEditing && <CardFooter><Button onClick={handleSaveProfile}>Save Profile</Button></CardFooter>}
            </Card>

             {/* Account Settings */}
             <Card>
              <CardHeader><CardTitle>Account Settings</CardTitle><CardDescription>Manage account preferences</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between"><Label htmlFor="dark-mode">Dark Mode</Label><Switch id="dark-mode" /></div>
                <div className="flex items-center justify-between"><Label htmlFor="email-notifications">Email Notifications</Label><Switch id="email-notifications" defaultChecked /></div>
                {/* Add language, timezone etc. */} 
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
               <CardHeader><CardTitle>Security</CardTitle><CardDescription>Manage password and security</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline">Change Password</Button>
                {/* Add 2FA settings etc. */} 
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 