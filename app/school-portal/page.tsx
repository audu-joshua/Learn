"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { School, Users, Video, Upload, FileText, PlusCircle } from "lucide-react"

export default function SchoolPortalPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-purple-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-800">
            ExamPrep
          </Link>
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">School Portal</span>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Exit Portal</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-purple-800">Lagos Grammar School</h1>
            <p className="text-muted-foreground">School Administrator Portal</p>
          </div>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Content
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Users className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold">156</h3>
              <p className="text-muted-foreground">Students</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <School className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-muted-foreground">Teachers</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-yellow-100 p-3 rounded-full mb-4">
                <Video className="h-6 w-6 text-yellow-700" />
              </div>
              <h3 className="text-2xl font-bold">48</h3>
              <p className="text-muted-foreground">Video Lessons</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-red-100 p-3 rounded-full mb-4">
                <FileText className="h-6 w-6 text-red-700" />
              </div>
              <h3 className="text-2xl font-bold">85%</h3>
              <p className="text-muted-foreground">Avg. Score</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Performance</CardTitle>
                  <CardDescription>Overview of student performance by subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gray-100 rounded-lg">
                    <p className="text-muted-foreground">Performance chart would appear here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest activities from your school</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        action: "New video uploaded",
                        subject: "Mathematics",
                        teacher: "Mrs. Adeyemi",
                        time: "2 hours ago",
                      },
                      { action: "Mock exam created", subject: "English", teacher: "Mr. Johnson", time: "Yesterday" },
                      { action: "New student registered", subject: "N/A", teacher: "N/A", time: "2 days ago" },
                      { action: "Content updated", subject: "Science", teacher: "Dr. Okafor", time: "3 days ago" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{activity.action}</h4>
                          <p className="text-sm text-muted-foreground">
                            {activity.subject} • {activity.teacher}
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="teachers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Teachers</CardTitle>
                  <CardDescription>Add and manage teachers who can create content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add New Teacher
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: "Mrs. Adeyemi", subject: "Mathematics", videos: 8, students: 45 },
                      { name: "Mr. Johnson", subject: "English", videos: 12, students: 60 },
                      { name: "Dr. Okafor", subject: "Chemistry", videos: 6, students: 38 },
                      { name: "Mrs. Bello", subject: "History", videos: 4, students: 25 },
                    ].map((teacher, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center">
                            <span className="font-medium text-purple-800">{teacher.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{teacher.name}</h4>
                            <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-medium">{teacher.videos}</div>
                            <div className="text-muted-foreground">Videos</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{teacher.students}</div>
                            <div className="text-muted-foreground">Students</div>
                          </div>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Content</CardTitle>
                  <CardDescription>Add videos, lessons, and practice questions for your students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                      <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                        <Upload className="h-6 w-6 text-purple-700" />
                      </div>
                      <h3 className="font-medium mb-1">Upload Video Lesson</h3>
                      <p className="text-sm text-muted-foreground mb-4">Drag and drop video files or click to browse</p>
                      <Button variant="outline">Select Files</Button>
                    </div>

                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Content Title</Label>
                        <Input id="title" placeholder="e.g., Solving Quadratic Equations" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input id="subject" placeholder="e.g., Mathematics" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="exam-type">Exam Type</Label>
                          <Input id="exam-type" placeholder="e.g., WAEC, JAMB" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" placeholder="Brief description of the content" />
                      </div>

                      <Button>Upload Content</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

