"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, GraduationCap, Clock, BarChart3, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/context/auth-contex"
import { useQuery } from "../../hooks/use-query"
import { getSubjects, getUserQuizHistory } from "../../lib/api"

export default function DashboardPage() {
  const { user, profile, isLoading: isAuthLoading } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/login")
    }
  }, [user, isAuthLoading, router])

  // Fetch subjects
  const { data: subjects, isLoading: isSubjectsLoading } = useQuery({
    queryFn: getSubjects,
    enabled: !!user,
  })

  // Fetch user quiz history
  const { data: quizHistory, isLoading: isHistoryLoading } = useQuery({
    queryFn: () => getUserQuizHistory(user?.id || ""),
    enabled: !!user,
  })

  if (isAuthLoading) {
    return <DashboardSkeleton />
  }

  if (!user || !profile) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {profile.full_name.split(" ")[0]}</h1>
        <p className="text-muted-foreground">Track your progress, continue learning, and prepare for your exams</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Learning Progress</CardTitle>
            <CardDescription>Your overall learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">42%</p>
                  <p className="text-xs text-muted-foreground">Curriculum completed</p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-sm font-medium text-purple-700">12/28</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quiz Performance</CardTitle>
            <CardDescription>Your quiz and test results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">78%</p>
                  <p className="text-xs text-muted-foreground">Average score</p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-700">7/9</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Study Time</CardTitle>
            <CardDescription>Your learning activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">8.5h</p>
                  <p className="text-xs text-muted-foreground">This week</p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-sm font-medium text-green-700">+2.3h</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Continue Learning</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/lessons" className="flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isSubjectsLoading ? (
            Array(3)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-3 bg-gradient-to-r from-purple-500 to-blue-500" />
                  <CardHeader>
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))
          ) : subjects && subjects.length > 0 ? (
            subjects.slice(0, 3).map((subject) => (
              <Card key={subject.id} className="overflow-hidden">
                <div className="h-3 bg-gradient-to-r from-purple-500 to-blue-500" />
                <CardHeader>
                  <CardTitle>{subject.name}</CardTitle>
                  <CardDescription>
                    {subject.description || `Explore ${subject.name} topics and lessons`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      style={{ width: "35%" }}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href={`/dashboard/subjects/${subject.id}`}>Continue</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <p className="text-muted-foreground mb-4">No subjects available yet.</p>
              <Button asChild>
                <Link href="/dashboard/explore">Explore subjects</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Quiz Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Quiz Results</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/results" className="flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isHistoryLoading ? (
            Array(2)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                </Card>
              ))
          ) : quizHistory && quizHistory.length > 0 ? (
            quizHistory.slice(0, 2).map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <CardTitle>{session.quiz.title}</CardTitle>
                  <CardDescription>
                    {session.quiz.subject?.name || "General"} •{" "}
                    {new Date(session.completed_at || session.created_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {session.passed ? (
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Award className="h-5 w-5 text-green-600" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                          <BarChart3 className="h-5 w-5 text-amber-600" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{session.passed ? "Passed" : "Needs improvement"}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.completed_at ? "Completed" : "In progress"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{session.percentage ? `${session.percentage}%` : "—"}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.score ? `Score: ${session.score}` : "Not scored"}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/dashboard/results/${session.id}`}>
                      {session.completed_at ? "View details" : "Continue quiz"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2 py-12 text-center">
              <p className="text-muted-foreground mb-4">You haven't taken any quizzes yet.</p>
              <Button asChild>
                <Link href="/dashboard/quizzes">Take a quiz</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="container py-8 px-4">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-36 mb-2" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Skeleton className="h-8 w-8 rounded-full mr-3" />
                    <div>
                      <Skeleton className="h-8 w-16 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-9 w-24" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-3 bg-gray-200" />
                <CardHeader>
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}

