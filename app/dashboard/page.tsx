"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Award, Zap, Bell, Settings, LogOut, Video, FileText } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import type { Profile } from "@/lib/supabase"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function getUser() {
      setLoading(true)

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        router.push("/login")
        return
      }

      setUser(user)

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profile) {
        setProfile(profile)
      }

      setLoading(false)
    }

    getUser()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto"></div>
          <p className="mt-4 text-purple-800">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-800">
            ExamPrep
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={profile?.avatar_url || "/placeholder.svg?height=32&width=32"}
                  alt={profile?.full_name || "User"}
                />
                <AvatarFallback>{profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <span className="font-medium hidden md:inline">{profile?.full_name || user?.email}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
          <Card>
            <CardContent className="p-4">
              <div className="mb-6 text-center">
                <Avatar className="h-20 w-20 mx-auto mb-2">
                  <AvatarImage
                    src={profile?.avatar_url || "/placeholder.svg?height=80&width=80"}
                    alt={profile?.full_name || "User"}
                  />
                  <AvatarFallback className="text-xl">
                    {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-medium text-lg">{profile?.full_name || "User"}</h3>
                <p className="text-sm text-muted-foreground">{profile?.school || "School not set"}</p>
                <div className="mt-1 inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  {getExamTypeLabel(profile?.exam_type)}
                </div>
              </div>

              <nav className="space-y-1">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("overview")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === "lessons" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("lessons")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Lessons
                </Button>
                <Button
                  variant={activeTab === "videos" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("videos")}
                >
                  <Video className="mr-2 h-4 w-4" />
                  Teacher Videos
                </Button>
                <Button
                  variant={activeTab === "practice" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("practice")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Past Questions
                </Button>
                <Button
                  variant={activeTab === "quizzes" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("quizzes")}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Mock Exams
                </Button>
                <Button
                  variant={activeTab === "achievements" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("achievements")}
                >
                  <Award className="mr-2 h-4 w-4" />
                  Achievements
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </nav>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Mathematics</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>English</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Science</span>
                    <span>90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Social Studies</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 md:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back, {profile?.full_name?.split(" ")[0] || "Student"}!</CardTitle>
                  <CardDescription>Continue your {getExamTypeLabel(profile?.exam_type)} preparation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Continue Learning</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <span className="text-3xl">🔢</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Algebra: Quadratic Equations</h4>
                            <p className="text-sm text-muted-foreground">75% complete</p>
                          </div>
                        </div>
                        <Progress value={75} className="h-2 mt-4" />
                        <Button className="w-full mt-4">Continue</Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Teacher's Video</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <div className="bg-green-100 p-3 rounded-lg">
                            <Video className="h-6 w-6 text-green-700" />
                          </div>
                          <div>
                            <h4 className="font-medium">English: Essay Writing</h4>
                            <p className="text-sm text-muted-foreground">Mr. Johnson, Your School</p>
                          </div>
                        </div>
                        <Button className="w-full mt-4">Watch Video</Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Mock Exam</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <div className="bg-yellow-100 p-3 rounded-lg">
                            <FileText className="h-6 w-6 text-yellow-700" />
                          </div>
                          <div>
                            <h4 className="font-medium">{getExamTypeLabel(profile?.exam_type)} Practice Test</h4>
                            <p className="text-sm text-muted-foreground">2 hours • 60 questions</p>
                          </div>
                        </div>
                        <Button className="w-full mt-4">Start Exam</Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Exams</CardTitle>
                  <CardDescription>Prepare for these important dates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Mathematics Mock Exam", date: "June 15, 2023", days: 12 },
                      { name: "English Language Test", date: "June 22, 2023", days: 19 },
                      { name: getExamTypeLabel(profile?.exam_type), date: "July 10, 2023", days: 37 },
                    ].map((exam, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{exam.name}</h4>
                          <p className="text-sm text-muted-foreground">{exam.date}</p>
                        </div>
                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {exam.days} days left
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>Recent badges and rewards you've earned</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 overflow-auto pb-2">
                    {["Math Whiz", "Science Explorer", "Reading Star", "Perfect Attendance", "Quiz Master"].map(
                      (badge) => (
                        <div key={badge} className="text-center flex-shrink-0 w-24">
                          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Award className="h-8 w-8 text-purple-600" />
                          </div>
                          <p className="text-sm font-medium">{badge}</p>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Teacher Videos from {profile?.school || "Your School"}</CardTitle>
                  <CardDescription>Learn directly from your school's teachers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      {
                        title: "Solving Quadratic Equations",
                        subject: "Mathematics",
                        teacher: "Mrs. Adeyemi",
                        duration: "15 mins",
                      },
                      {
                        title: "Essay Writing Techniques",
                        subject: "English",
                        teacher: "Mr. Johnson",
                        duration: "22 mins",
                      },
                      { title: "Chemical Bonding", subject: "Chemistry", teacher: "Dr. Okafor", duration: "18 mins" },
                      { title: "Nigerian Civil War", subject: "History", teacher: "Mrs. Bello", duration: "25 mins" },
                      {
                        title: "Photosynthesis Process",
                        subject: "Biology",
                        teacher: "Mr. Nwachukwu",
                        duration: "20 mins",
                      },
                      { title: "Vectors and Scalars", subject: "Physics", teacher: "Mr. Adebayo", duration: "17 mins" },
                    ].map((video, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                            <Video className="h-12 w-12 text-gray-400" />
                          </div>
                          <h4 className="font-medium">{video.title}</h4>
                          <div className="flex items-center justify-between mt-2 text-sm">
                            <span className="text-muted-foreground">{video.subject}</span>
                            <span className="text-muted-foreground">{video.duration}</span>
                          </div>
                          <div className="flex items-center mt-2">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarFallback>{video.teacher.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{video.teacher}</span>
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-3">
                            Watch Video
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practice" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Past Questions for {getExamTypeLabel(profile?.exam_type)}</CardTitle>
                  <CardDescription>Practice with real past exam questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { title: "Mathematics 2022", questions: 50, time: "2 hours", year: 2022 },
                      { title: "English Language 2022", questions: 60, time: "2 hours", year: 2022 },
                      { title: "Mathematics 2021", questions: 50, time: "2 hours", year: 2021 },
                      { title: "English Language 2021", questions: 60, time: "2 hours", year: 2021 },
                      { title: "Science 2022", questions: 60, time: "2 hours", year: 2022 },
                      { title: "Social Studies 2022", questions: 50, time: "1.5 hours", year: 2022 },
                    ].map((exam, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="bg-purple-100 p-3 rounded-lg">
                            <FileText className="h-6 w-6 text-purple-700" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{exam.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{exam.questions} questions</span>
                              <span>•</span>
                              <span>{exam.time}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Start
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

function getExamTypeLabel(examType: string | null): string {
  switch (examType) {
    case "common-entrance":
      return "Common Entrance"
    case "junior-waec":
      return "Junior WAEC"
    case "senior-waec":
      return "Senior WAEC"
    case "neco":
      return "NECO"
    case "jamb":
      return "JAMB/UTME"
    default:
      return "Exam Preparation"
  }
}

