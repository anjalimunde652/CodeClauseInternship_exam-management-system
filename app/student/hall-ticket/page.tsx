"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import { Download } from "lucide-react"

interface Application {
  id: string
  studentName: string
  rollNumber: string
  examName: string
  status: "pending" | "approved"
}

interface Exam {
  id: string
  name: string
  date: string
  duration: string
}

export default function HallTicketPage() {
  const router = useRouter()
  const [application, setApplication] = useState<Application | null>(null)
  const [exam, setExam] = useState<Exam | null>(null)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "student") {
      router.push("/login")
      return
    }

    // Get approved application
    const applications = localStorage.getItem("applications")
    if (applications) {
      const parsed = JSON.parse(applications)
      const approvedApp = parsed.find((app: Application) => app.status === "approved")

      if (!approvedApp) {
        router.push("/student")
        return
      }

      setApplication(approvedApp)

      // Get exam details
      const exams = localStorage.getItem("exams")
      if (exams) {
        const examsParsed = JSON.parse(exams)
        const matchedExam = examsParsed.find((e: Exam) => e.name === approvedApp.examName)
        setExam(matchedExam)
      }
    }
  }, [router])

  const handleDownloadPDF = () => {
    alert("PDF download functionality would be implemented in production")
  }

  if (!application || !exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <p>Loading...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-foreground">Hall Ticket</h1>
          <p className="text-muted-foreground">Your exam admission ticket</p>
        </div>

        {/* Hall Ticket Card */}
        <Card className="border-0 shadow-lg max-w-2xl">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
            <CardTitle className="text-2xl text-center">Examination Hall Ticket</CardTitle>
          </CardHeader>

          <CardContent className="pt-8 pb-8">
            <div className="space-y-6">
              {/* Student Details */}
              <div className="grid grid-cols-2 gap-6 border-b border-border pb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Student Name</p>
                  <p className="text-lg font-semibold">{application.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Roll Number</p>
                  <p className="text-lg font-semibold">{application.rollNumber}</p>
                </div>
              </div>

              {/* Exam Details */}
              <div className="grid grid-cols-2 gap-6 border-b border-border pb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Exam Name</p>
                  <p className="text-lg font-semibold">{exam.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Exam Date</p>
                  <p className="text-lg font-semibold">{exam.date}</p>
                </div>
              </div>

              {/* Duration */}
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-lg font-semibold text-primary">{exam.duration} Minutes</p>
              </div>

              {/* Important Note */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-semibold text-yellow-900 mb-2">Important:</p>
                <p className="text-sm text-yellow-800">
                  Please arrive 15 minutes before the exam. Bring a valid ID and this hall ticket.
                </p>
              </div>

              {/* Download Button */}
              <Button
                onClick={handleDownloadPDF}
                className="w-full h-10 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold flex gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
