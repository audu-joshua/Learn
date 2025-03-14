"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import type { Profile, School } from "@/lib/supabase-schema"
import { BookOpen, Award, FileText, Calendar } from "lucide-react"

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [school, setSchool] = useState<School | null>(null)
  const [loading, setLoading] = useState(true)
  const [upcomingExams, setUpcomingExams] = useState<any[]>([])
  const [recentResults, setRecentResults] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    async function fetchStudentData() {
      setLoading(true)

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      setUser(user)

      // Get profile
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (profileData) {
        setProfile(profileData)

        // Check if student is registered with a school
        const { data: schoolStudentData } = await supabase
          .from("school_students")
          .select("school_id")
          .eq("user_id", user.id)
          .eq("status", "active")
          .single()

        if (schoolStudentData) {
          // Get school data
          const { data: schoolData } = await supabase
            .from("schools")
            .select("*")
            .eq("id", schoolStudentData.school_id)
            .single()

          if (schoolData) {
            setSchool(schoolData)

            // Get upcoming exams for this student's school and class
            const { data: examsData } = await supabase
              .from("school_exams")
              .select(`
                id, title, subject_id, start_time, end_time, duration_minutes,
                subjects:subject_id (name)
              `)
              .eq("school_id", schoolData.id)
              .gt("start_time", new Date().toISOString())
              .order("start_time", { ascending: true })
              .limit(5)

            if (examsData) {
              setUpcomingExams(examsData)
            }

            // Get recent results
            const { data: resultsData } = await supabase
              .from("student_results")
              .select(`
                id, exam_id, total_score, max_score, percentage, grade, created_at,
                exams:exam_id (title, subject_id),
                subjects:exams(subject_id(name))
              `)
              .eq("student_id", user.id)
              .order("created_at", { ascending: false })
              .limit(5)

            if (resultsData) {
              setRecentResults(resultsData)
            }
          }
        }
      }

      setLoading(false)
    }

    fetchStudentData()
  }, [router])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-3xl font-bold text-purple-600 mb-4">
                  {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "S"}
                </div>
                <h2 className="text-xl font-bold">{profile?.full_name || "Student"}</h2>
                <p className="text-muted-foreground">{school?.name || "Independent Student"}</p>
              </div>

              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  My Courses
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  My Exams
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="mr-2 h-4 w-4" />
                  My Results
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Progress</CardTitle>
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
                    <span>60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Science</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="exams">Exams</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Exams</CardTitle>
                    <CardDescription>Exams scheduled for you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {upcomingExams.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingExams.map((exam) => (
                          <div key={exam.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{exam.title}</h4>
                              <p className="text-sm text-muted-foreground">{exam.subjects.name}</p>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {new Date(exam.start_time).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No upcoming exams scheduled.</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Results</CardTitle>
                    <CardDescription>Your latest exam results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentResults.length > 0 ? (
                      <div className="space-y-4">
                        {recentResults.map((result) => (
                          <div key={result.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{result.exams.title}</h4>
                              <p className="text-sm text-muted-foreground">{result.subjects.name}</p>
                            </div>
                            <div className="text-center">
                              <div
                                className={`text-lg font-bold ${
                                  result.percentage >= 70
                                    ? "text-green-600"
                                    : result.percentage >= 50
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                }`}
                              >
                                {result.grade}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {result.total_score}/{result.max_score} ({result.percentage}%)
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No results available yet.</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Recommended Learning</CardTitle>
                    <CardDescription>Based on your performance and upcoming exams</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Recommended learning content would go here */}
                      <Button className="h-auto py-6 flex flex-col items-center text-center">
                        <BookOpen className="h-8 w-8 mb-2" />
                        <span className="text-lg">Mathematics: Algebra Fundamentals</span>
                      </Button>
                      <Button className="h-auto py-6 flex flex-col items-center text-center">
                        <BookOpen className="h-8 w-8 mb-2" />
                        <span className="text-lg">English: Essay Writing</span>
                      </Button>
                      <Button className="h-auto py-6 flex flex-col items-center text-center">
                        <BookOpen className="h-8 w-8 mb-2" />
                        <span className="text-lg">Science: Chemical Reactions</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Other tab contents would follow the same pattern */}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

