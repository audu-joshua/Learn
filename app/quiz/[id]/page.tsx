"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, Home } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function QuizPage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  // This would normally be fetched based on the quiz ID
  const quizTitle = "Math Challenge"
  const quizQuestions = [
    {
      question: "What is 7 × 8?",
      options: ["54", "56", "64", "72"],
      correctAnswer: "56",
    },
    {
      question: "What is 12 × 5?",
      options: ["50", "60", "65", "70"],
      correctAnswer: "60",
    },
    {
      question: "What is 9 × 9?",
      options: ["72", "81", "90", "99"],
      correctAnswer: "81",
    },
    {
      question: "What is 6 × 7?",
      options: ["36", "42", "48", "54"],
      correctAnswer: "42",
    },
    {
      question: "What is 4 × 8?",
      options: ["24", "28", "32", "36"],
      correctAnswer: "32",
    },
  ]

  useEffect(() => {
    if (quizCompleted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleQuizComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizCompleted])

  const handleSelectAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answer
    setSelectedAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleQuizComplete()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleQuizComplete = () => {
    let correctAnswers = 0
    quizQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correctAnswers++
      }
    })

    setScore(correctAnswers)
    setQuizCompleted(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
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
        {!quizCompleted ? (
          <>
            <div className="mb-6">
              <Link href="/dashboard/quizzes" className="text-purple-600 hover:underline flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Quizzes
              </Link>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-purple-800">{quizTitle}</h1>
                <div className="flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Question {currentQuestion + 1}</CardTitle>
                <CardDescription>{quizQuestions[currentQuestion].question}</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedAnswers[currentQuestion] || ""} onValueChange={handleSelectAnswer}>
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="cursor-pointer p-2 w-full">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                  Previous
                </Button>

                {currentQuestion < quizQuestions.length - 1 ? (
                  <Button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestion]}>
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleQuizComplete}
                    disabled={!selectedAnswers[currentQuestion]}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Finish Quiz
                  </Button>
                )}
              </CardFooter>
            </Card>

            <div className="flex justify-between">
              <div className="flex gap-1">
                {quizQuestions.map((_, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      index === currentQuestion
                        ? "bg-purple-600 text-white"
                        : selectedAnswers[index]
                          ? "bg-purple-200 text-purple-800"
                          : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle>Quiz Completed!</CardTitle>
              <CardDescription>
                You scored {score} out of {quizQuestions.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2 text-purple-600">
                    {Math.round((score / quizQuestions.length) * 100)}%
                  </div>
                  <p className="text-muted-foreground">
                    {score === quizQuestions.length
                      ? "Perfect score! Amazing job!"
                      : score >= quizQuestions.length / 2
                        ? "Good job! Keep practicing to improve."
                        : "Keep practicing! You'll get better."}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Your Answers:</h3>
                  {quizQuestions.map((q, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        selectedAnswers[index] === q.correctAnswer ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <p className="font-medium">
                        {index + 1}. {q.question}
                      </p>
                      <div className="flex justify-between text-sm mt-1">
                        <span>Your answer: {selectedAnswers[index] || "Not answered"}</span>
                        {selectedAnswers[index] !== q.correctAnswer && (
                          <span className="font-medium">Correct: {q.correctAnswer}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/dashboard/quizzes">Back to Quizzes</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

