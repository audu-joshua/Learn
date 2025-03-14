"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import type { School, Class, Subject } from "@/lib/supabase-schema"
import { Download, Search, Filter } from "lucide-react"

export default function ResultsPage() {
  const [school, setSchool] = useState<School | null>(null)
  const [classes, setClasses] = useState<Class[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Filters
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    async function fetchData() {
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

      if (!schoolData) {
        router.push("/school-portal/dashboard")
        return
      }

      setSchool(schoolData)

      // Get classes
      const { data: classesData } = await supabase.from("classes").select("*").eq("school_id", schoolData.id)

      if (classesData) {
        setClasses(classesData)
      }

      // Get subjects
      const { data: subjectsData } = await supabase.from("subjects").select("*")

      if (subjectsData) {
        setSubjects(subjectsData)
      }

      // Get results
      await fetchResults(schoolData.id)

      setLoading(false)
    }

    fetchData()
  }, [router])

  const fetchResults = async (schoolId: string) => {
    let query = supabase
      .from("student_results")
      .select(`
        id, student_id, exam_id, class_id, total_score, max_score, percentage, grade, created_at,
        students:student_id(id, full_name),
        exams:exam_id(title, subject_id),
        subjects:exams(subject_id(name)),
        classes:class_id(name)
      `)
      .eq("school_id", schoolId)

    if (selectedClass) {
      query = query.eq("class_id", selectedClass)
    }

    if (selectedSubject) {
      query = query.eq("exams.subject_id", selectedSubject)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching results:", error)
      return
    }

    // Client-side filtering for search query
    let filteredResults = data || []
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredResults = filteredResults.filter(
        (result) =>
          Array.isArray(result.students)
            ? result.students.some((student) => student.full_name?.toLowerCase().includes(query))
            : (result.students as { full_name?: string })?.full_name?.toLowerCase().includes(query) ||
          Array.isArray(result.exams)
            ? result.exams.some((exam: { title?: string }) => exam.title?.toLowerCase().includes(query))
            : (result.exams as { title?: string })?.title?.toLowerCase().includes(query),
      )
    }

    setResults(filteredResults)
  }

  const handleFilter = () => {
    if (school) {
      fetchResults(school.id)
    }
  }

  const handleExportResults = () => {
    // Implementation for exporting results to CSV/Excel would go here
    alert("Export functionality would be implemented here")
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-800">Exam Results</h1>
        <Button onClick={handleExportResults}>
          <Download className="h-4 w-4 mr-2" />
          Export Results
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Results</CardTitle>
          <CardDescription>Filter by class, subject, or search for specific students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student or exam..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button onClick={handleFilter}>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
          <CardDescription>
            Showing {results.length} result{results.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {results.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Exam</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{result.students?.full_name || "Unknown"}</TableCell>
                    <TableCell>{result.classes?.name || "Unknown"}</TableCell>
                    <TableCell>{result.exams?.title || "Unknown"}</TableCell>
                    <TableCell>{result.subjects?.name || "Unknown"}</TableCell>
                    <TableCell>
                      {result.total_score}/{result.max_score}
                    </TableCell>
                    <TableCell>{result.percentage}%</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          result.grade === "A"
                            ? "bg-green-100 text-green-800"
                            : result.grade === "B"
                              ? "bg-blue-100 text-blue-800"
                              : result.grade === "C"
                                ? "bg-yellow-100 text-yellow-800"
                                : result.grade === "D"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-red-100 text-red-800"
                        }`}
                      >
                        {result.grade}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(result.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/school-portal/results/${result.id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No results found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

