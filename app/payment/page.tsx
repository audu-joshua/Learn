"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowLeft, CheckCircle, CreditCard, Lock } from "lucide-react"

export default function PaymentPage() {
  const [plan, setPlan] = useState("monthly")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsComplete(true)
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-800">
            LearnFun
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="text-purple-600 hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>

        {!isComplete ? (
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Plan</CardTitle>
                  <CardDescription>Select the subscription plan that works best for you</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={plan} onValueChange={setPlan} className="space-y-4">
                    <div
                      className={`border rounded-lg p-4 ${plan === "monthly" ? "border-purple-500 bg-purple-50" : ""}`}
                    >
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <div className="flex-1">
                          <Label htmlFor="monthly" className="text-base font-medium">
                            Monthly Plan
                          </Label>
                          <div className="flex items-baseline mt-1">
                            <span className="text-2xl font-bold">$9.99</span>
                            <span className="text-muted-foreground ml-1">/month</span>
                          </div>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li>Access to all lessons</li>
                            <li>Unlimited quizzes</li>
                            <li>Progress tracking</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`border rounded-lg p-4 ${plan === "annual" ? "border-purple-500 bg-purple-50" : ""}`}
                    >
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value="annual" id="annual" />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <Label htmlFor="annual" className="text-base font-medium">
                              Annual Plan
                            </Label>
                            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Save 20%
                            </span>
                          </div>
                          <div className="flex items-baseline mt-1">
                            <span className="text-2xl font-bold">$95.88</span>
                            <span className="text-muted-foreground ml-1">/year</span>
                          </div>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li>Access to all lessons</li>
                            <li>Unlimited quizzes</li>
                            <li>Progress tracking</li>
                            <li>Priority support</li>
                            <li>Downloadable resources</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>Enter your payment information securely</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input id="card-name" placeholder="John Smith" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <div className="relative">
                        <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                        <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing ? "Processing..." : `Pay ${plan === "monthly" ? "$9.99" : "$95.88"}`}
                      </Button>
                    </div>

                    <div className="flex items-center justify-center text-xs text-muted-foreground mt-4">
                      <Lock className="h-3 w-3 mr-1" />
                      Secure payment processed by Stripe
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Payment Successful!</CardTitle>
              <CardDescription>Thank you for subscribing to LearnFun</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p>Your {plan === "monthly" ? "monthly" : "annual"} subscription has been activated.</p>
              <p className="mt-2">You now have full access to all lessons, quizzes, and features.</p>
            </CardContent>
            <CardFooter className="flex justify-center">
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

