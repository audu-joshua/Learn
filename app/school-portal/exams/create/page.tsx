"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import { supabase } from "@/lib/supabase"
import type { School, Class, Subject } from "@/lib/supabase-schema"

export default function CreateExam() {
  const [school, setSchool] = useState<School | null>(null)
  const [classes, setClasses] = useState<Class[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subjectId, setSubjectId] = useState("")
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const [startTime, setStartTime] = useState<Date>(new Date())
  const [endTime, setEndTime] = useState<Date>(new Date(Date.now() + 2 * 60 * 60 * 1000)) // 2 hours from now
  const [duration, setDuration] = useState(60) // 60 minutes
  const [isPublished, setIsPublished] = useState(false)

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

      setLoading(false)
    }

    fetchData()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!school) return

    setSubmitting(true)

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("User not authenticated")

      // Create exam
      const { data: examData, error } = await supabase
        .from("school_exams")
        .insert({
          school_id: school.id,
          title,
          description,
          subject_id: subjectId,
          class_ids: selectedClasses,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          duration_minutes: duration,
          is_published: isPublished,
          created_by: user.id,
        })
        .select()
        .single()

      if (error) throw error

      // Redirect to exam questions page
      router.push(`/school-portal/exams/${examData.id}/questions`)
    } catch (error) {
      console.error("Error creating exam:", error)
      alert("Failed to create exam. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-purple-800 mb-6">Create New Exam</h1>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Exam Details</CardTitle>
              <CardDescription>
                Create a new exam for your school. You'll be able to add questions in the next step.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Exam Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., End of Term Mathematics Exam"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details about this exam"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={subjectId} onValueChange={setSubjectId} required>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Classes</Label>
                <div className="grid grid-cols-2 gap-2">
                  {classes.map((cls) => (
                    <div key={cls.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`class-${cls.id}`}
                        checked={selectedClasses.includes(cls.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedClasses([...selectedClasses, cls.id])
                          } else {
                            setSelectedClasses(selectedClasses.filter((id) => id !== cls.id))
                          }
                        }}
                      />
                      <Label htmlFor={`class-${cls.id}`}>{cls.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <DateTimePicker value={startTime} onChange={setStartTime} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <DateTimePicker value={endTime} onChange={setEndTime} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number.parseInt(e.target.value))}
                  min={1}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  checked={isPublished}
                  onCheckedChange={(checked) => setIsPublished(checked === true)}
                />
                <Label htmlFor="published">Publish immediately (students can see this exam)</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Creating..." : "Create Exam and Add Questions"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

