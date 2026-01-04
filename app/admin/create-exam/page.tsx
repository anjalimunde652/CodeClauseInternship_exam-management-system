"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/navbar"
import { AlertCircle, CheckCircle } from "lucide-react"

interface Exam {
  id: string
  name: string
  date: string
  duration: string
}

export default function CreateExamPage() {
  const router = useRouter()
  const [examName, setExamName] = useState("")
  const [examDate, setExamDate] = useState("")
  const [duration, setDuration] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [exams, setExams] = useState<Exam[]>([])

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "admin") {
      router.push("/login")
      return
    }

    // Load existing exams
    const storedExams = localStorage.getItem("exams")
    if (storedExams) {
      setExams(JSON.parse(storedExams))
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!examName || !examDate || !duration) {
      setError("Please fill in all fields")
      return
    }

    const newExam: Exam = {
      id: Date.now().toString(),
      name: examName,
      date: examDate,
      duration: duration,
    }

    const updatedExams = [...exams, newExam]
    localStorage.setItem("exams", JSON.stringify(updatedExams))
    setExams(updatedExams)

    setSuccess("Exam created successfully!")
    setExamName("")
    setExamDate("")
    setDuration("")
    setError("")
    setTimeout(() => setSuccess(""), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Card */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Create New Exam</CardTitle>
                <CardDescription>Add a new examination to the system</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Exam Name */}
                  <div className="space-y-2">
                    <Label htmlFor="exam-name" className="font-semibold">
                      Exam Name
                    </Label>
                    <Input
                      id="exam-name"
                      placeholder="e.g., Mathematics Final"
                      value={examName}
                      onChange={(e) => setExamName(e.target.value)}
                      className="h-10 bg-input border-input"
                    />
                  </div>

                  {/* Exam Date */}
                  <div className="space-y-2">
                    <Label htmlFor="exam-date" className="font-semibold">
                      Exam Date
                    </Label>
                    <Input
                      id="exam-date"
                      type="date"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      className="h-10 bg-input border-input"
                    />
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="font-semibold">
                      Duration (in minutes)
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="e.g., 120"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="h-10 bg-input border-input"
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 text-red-700">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Success Message */}
                  {success && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3 text-green-700">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{success}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    Create Exam
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Exams List */}
          <div>
            <Card className="border-0 shadow-lg h-fit">
              <CardHeader>
                <CardTitle className="text-lg">Created Exams ({exams.length})</CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                {exams.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No exams created yet</p>
                ) : (
                  <div className="space-y-2">
                    {exams.map((exam) => (
                      <div
                        key={exam.id}
                        className="p-3 bg-muted/50 rounded-lg border border-border hover:bg-muted transition-colors"
                      >
                        <p className="font-semibold text-sm">{exam.name}</p>
                        <p className="text-xs text-muted-foreground">{exam.date}</p>
                        <p className="text-xs text-muted-foreground">{exam.duration} min</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
