"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle, Home } from "lucide-react"

export default function LessonPage({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  // This would normally be fetched based on the lesson ID
  const lessonTitle = "Multiplication Tables"
  const lessonSubject = "Math"

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-purple-800">
            LearnFun
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <Home className="h-4 w-4 mr-1" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link href="/dashboard/lessons" className="text-purple-600 hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Lessons
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-purple-800">{lessonTitle}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{lessonSubject}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              Step {currentStep}: {getLessonStepTitle(currentStep)}
            </CardTitle>
            <CardDescription>{getLessonStepDescription(currentStep)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">{renderLessonContent(currentStep)}</div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button className="bg-green-600 hover:bg-green-700">
                Complete Lesson
                <CheckCircle className="h-4 w-4 ml-2" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

function getLessonStepTitle(step: number): string {
  const titles = [
    "Introduction to Multiplication",
    "Understanding Multiplication as Repeated Addition",
    "Multiplication Tables 1-5",
    "Multiplication Tables 6-10",
    "Practice and Review",
  ]
  return titles[step - 1] || ""
}

function getLessonStepDescription(step: number): string {
  const descriptions = [
    "Learn what multiplication is and why it's important",
    "See how multiplication is just a faster way to add the same number multiple times",
    "Learn and practice the multiplication tables from 1 to 5",
    "Learn and practice the multiplication tables from 6 to 10",
    "Test your knowledge with practice problems",
  ]
  return descriptions[step - 1] || ""
}

function renderLessonContent(step: number) {
  switch (step) {
    case 1:
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">What is Multiplication?</h3>
            <p>
              Multiplication is a way to add a number to itself multiple times. It's a shortcut for repeated addition!
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-white p-4 rounded-lg border">
              <h4 className="font-medium mb-2">Example:</h4>
              <p className="mb-2">
                If you have 3 baskets with 4 apples in each basket, how many apples do you have in total?
              </p>
              <div className="flex items-center gap-2 text-lg">
                <span>3 × 4 = 12</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                This means 3 groups of 4 apples, which equals 12 apples total.
              </p>
            </div>

            <div className="flex-1 bg-white p-4 rounded-lg border">
              <h4 className="font-medium mb-2">Why is it important?</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Helps us count large groups quickly</li>
                <li>Used in everyday life (shopping, cooking, etc.)</li>
                <li>Foundation for more advanced math</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Multiplication Symbol</h3>
            <p>The symbol for multiplication is ×. We can also use * or · to represent multiplication.</p>
            <p className="mt-2">3 × 4 = 12</p>
            <p>3 * 4 = 12</p>
            <p>3 · 4 = 12</p>
          </div>
        </div>
      )
    case 2:
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Multiplication as Repeated Addition</h3>
            <p>Multiplication is just a faster way to add the same number multiple times.</p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium mb-2">Example:</h4>
            <div className="space-y-2">
              <p>3 × 4 means adding 4 three times:</p>
              <div className="text-lg">4 + 4 + 4 = 12</div>

              <p className="mt-4">5 × 2 means adding 2 five times:</p>
              <div className="text-lg">2 + 2 + 2 + 2 + 2 = 10</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium mb-2">Visual Example:</h4>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      i < 4 ? "bg-red-100" : i < 8 ? "bg-green-100" : "bg-blue-100"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">3 rows of 4 circles = 3 × 4 = 12 circles</p>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium mb-2">Try it yourself:</h4>
              <p>Think about 4 × 3 as adding 3 four times:</p>
              <div className="mt-2 p-2 bg-gray-50 rounded">
                <p>3 + 3 + 3 + 3 = ?</p>
              </div>
              <Button className="mt-4" variant="outline">
                Check Answer
              </Button>
            </div>
          </div>
        </div>
      )
    case 3:
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Multiplication Tables 1-5</h3>
            <p>Let's learn the multiplication tables for numbers 1 through 5.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <Card key={num}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{num}× Table</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((multiplier) => (
                      <li key={multiplier} className="flex justify-between">
                        <span>
                          {num} × {multiplier} =
                        </span>
                        <span className="font-medium">{num * multiplier}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Tips for Memorizing</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Practice a little bit every day</li>
              <li>Say the tables out loud</li>
              <li>Look for patterns (like how the 5× table ends in 0 or 5)</li>
              <li>Use flashcards or games to make it fun</li>
            </ul>
          </div>
        </div>
      )
    case 4:
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Multiplication Tables 6-10</h3>
            <p>Now let's learn the multiplication tables for numbers 6 through 10.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[6, 7, 8, 9, 10].map((num) => (
              <Card key={num}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{num}× Table</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((multiplier) => (
                      <li key={multiplier} className="flex justify-between">
                        <span>
                          {num} × {multiplier} =
                        </span>
                        <span className="font-medium">{num * multiplier}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Special Tricks</h3>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">9× trick:</span> For the 9 times table, the digits in the answer always
                add up to 9.
                <div className="text-sm mt-1">Example: 9 × 7 = 63, and 6 + 3 = 9</div>
              </li>
              <li>
                <span className="font-medium">10× trick:</span> Just add a 0 to the end of the number.
                <div className="text-sm mt-1">Example: 10 × 6 = 60</div>
              </li>
            </ul>
          </div>
        </div>
      )
    case 5:
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Practice and Review</h3>
            <p>Let's test your knowledge with some practice problems!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { question: "3 × 7 = ?", answer: 21 },
              { question: "8 × 4 = ?", answer: 32 },
              { question: "6 × 9 = ?", answer: 54 },
              { question: "5 × 5 = ?", answer: 25 },
              { question: "10 × 7 = ?", answer: 70 },
              { question: "2 × 8 = ?", answer: 16 },
            ].map((problem, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="text-lg font-medium mb-2">{problem.question}</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="flex-1">
                      Show Answer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Word Problems</h3>
            <div className="space-y-4">
              <div>
                <p className="mb-2">
                  1. If there are 6 students and each student has 4 pencils, how many pencils are there in total?
                </p>
                <Button variant="outline" size="sm">
                  Show Answer
                </Button>
              </div>
              <div>
                <p className="mb-2">
                  2. A bakery makes 8 trays of cookies. Each tray has 9 cookies. How many cookies did they make in
                  total?
                </p>
                <Button variant="outline" size="sm">
                  Show Answer
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Congratulations!</h3>
            <p>
              You've completed the lesson on multiplication tables. Keep practicing to become a multiplication master!
            </p>
          </div>
        </div>
      )
    default:
      return null
  }
}

