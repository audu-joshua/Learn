"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import type { School, Class } from "@/lib/supabase-schema"
import { Users, BookOpen, FileText, Award, PlusCircle } from "lucide-react"

export default function SchoolDashboard() {
  const [school, setSchool] = useState<School | null>(null)
  const [classes, setClasses] = useState<Class[]>([])
  const [studentCount, setStudentCount] = useState(0)
  const [examCount, setExamCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchSchoolData() {
      setLoading(true)

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      // Get school data
      const { data: schoolData } = await supabase.from("schools").select("*").eq("admin_id", user.id).single()

      if (schoolData) {
        setSchool(schoolData)

        // Get classes
        const { data: classesData } = await supabase.from("classes").select("*").eq("school_id", schoolData.id)

        if (classesData) {
          setClasses(classesData)
        }

        // Get student count
        const { count: studentCountData } = await supabase
          .from("school_students")
          .select("*", { count: "exact", head: true })
          .eq("school_id", schoolData.id)
          .eq("status", "active")

        if (studentCountData !== null) {
          setStudentCount(studentCountData)
        }

        // Get exam count
        const { count: examCountData } = await supabase
          .from("school_exams")
          .select("*", { count: "exact", head: true })
          .eq("school_id", schoolData.id)

        if (examCountData !== null) {
          setExamCount(examCountData)
        }
      }

      setLoading(false)
    }

    fetchSchoolData()
  }, [router])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!school) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>School Not Found</CardTitle>
            <CardDescription>
              You don't have a registered school. Please complete the registration process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/school-portal/register")}>Register Your School</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-purple-800">{school.name}</h1>
          <p className="text-muted-foreground">School Dashboard</p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create New Exam
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <Users className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="text-2xl font-bold">{studentCount}</h3>
            <p className="text-muted-foreground">Students</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <BookOpen className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-2xl font-bold">{classes.length}</h3>
            <p className="text-muted-foreground">Classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-yellow-100 p-3 rounded-full mb-4">
              <FileText className="h-6 w-6 text-yellow-700" />
            </div>
            <h3 className="text-2xl font-bold">{examCount}</h3>
            <p className="text-muted-foreground">Exams</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-purple-100 p-3 rounded-full mb-4">
              <Award className="h-6 w-6 text-purple-700" />
            </div>
            <h3 className="text-2xl font-bold">{school.subscription_tier}</h3>
            <p className="text-muted-foreground">Subscription</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest activities in your school</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Activity content would go here */}
              <p>No recent activities to display.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>Manage your school's students</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Student management interface would go here */}
              <Button>Add New Student</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab contents would follow the same pattern */}
      </Tabs>
    </div>
  )
}

