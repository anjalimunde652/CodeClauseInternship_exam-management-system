"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from "@/components/navbar"
import { AlertCircle, CheckCircle } from "lucide-react"

interface Exam {
  id: string
  name: string
  date: string
  duration: string
}

interface Application {
  id: string
  studentName: string
  rollNumber: string
  examName: string
  status: "pending" | "approved"
}

export default function ApplyPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [rollNumber, setRollNumber] = useState("")
  const [selectedExam, setSelectedExam] = useState("")
  const [exams, setExams] = useState<Exam[]>([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "student") {
      router.push("/login")
      return
    }

    // Load exams
    const storedExams = localStorage.getItem("exams")
    if (storedExams) {
      setExams(JSON.parse(storedExams))
    }

    // Load applications
    const storedApplications = localStorage.getItem("applications")
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications))
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName || !rollNumber || !selectedExam) {
      setError("Please fill in all fields")
      return
    }

    const examName = exams.find((e) => e.id === selectedExam)?.name

    const newApplication: Application = {
      id: Date.now().toString(),
      studentName: fullName,
      rollNumber: rollNumber,
      examName: examName || "",
      status: "pending",
    }

    const updatedApplications = [...applications, newApplication]
    localStorage.setItem("applications", JSON.stringify(updatedApplications))
    setApplications(updatedApplications)

    setSuccess("Application submitted successfully!")
    setFullName("")
    setRollNumber("")
    setSelectedExam("")
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
                <CardTitle className="text-2xl">Apply for Exam</CardTitle>
                <CardDescription>Submit your exam application form</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullname" className="font-semibold">
                      Full Name
                    </Label>
                    <Input
                      id="fullname"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-10 bg-input border-input"
                    />
                  </div>

                  {/* Roll Number */}
                  <div className="space-y-2">
                    <Label htmlFor="rollnumber" className="font-semibold">
                      Roll Number
                    </Label>
                    <Input
                      id="rollnumber"
                      placeholder="Enter your roll number"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      className="h-10 bg-input border-input"
                    />
                  </div>

                  {/* Select Exam */}
                  <div className="space-y-2">
                    <Label htmlFor="exam" className="font-semibold">
                      Select Exam
                    </Label>
                    <Select value={selectedExam} onValueChange={setSelectedExam}>
                      <SelectTrigger id="exam" className="h-10 bg-input border-input">
                        <SelectValue placeholder="Choose an exam" />
                      </SelectTrigger>
                      <SelectContent>
                        {exams.length === 0 ? (
                          <div className="p-2 text-sm text-muted-foreground">No exams available</div>
                        ) : (
                          exams.map((exam) => (
                            <SelectItem key={exam.id} value={exam.id}>
                              {exam.name} ({exam.date})
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
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
                    className="w-full h-10 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                  >
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Applications List */}
          <div>
            <Card className="border-0 shadow-lg h-fit">
              <CardHeader>
                <CardTitle className="text-lg">My Applications ({applications.length})</CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                {applications.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No applications submitted</p>
                ) : (
                  <div className="space-y-2">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className="p-3 bg-muted/50 rounded-lg border border-border hover:bg-muted transition-colors"
                      >
                        <p className="font-semibold text-sm">{app.examName}</p>
                        <p className="text-xs text-muted-foreground">Roll: {app.rollNumber}</p>
                        <p className="text-xs mt-2">
                          {app.status === "pending" ? (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">
                              Pending
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                              Approved
                            </span>
                          )}
                        </p>
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
