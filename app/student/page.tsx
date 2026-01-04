"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Link from "next/link"
import { FileText, Ticket } from "lucide-react"

interface Application {
  id: string
  studentName: string
  rollNumber: string
  examName: string
  status: "pending" | "approved"
}

export default function StudentDashboard() {
  const router = useRouter()
  const [hasApprovedApplication, setHasApprovedApplication] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "student") {
      router.push("/login")
      return
    }

    // Check if student has approved application
    const applications = localStorage.getItem("applications")
    if (applications) {
      const parsed = JSON.parse(applications)
      const userEmail = localStorage.getItem("userEmail")
      const hasApproved = parsed.some((app: Application) => app.status === "approved")
      setHasApprovedApplication(hasApproved)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <Navbar />

      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-foreground">Student Dashboard</h1>
          <p className="text-muted-foreground">Apply for exams and manage your applications</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Apply for Exam Card */}
          <Link href="/student/apply">
            <Card className="h-full cursor-pointer border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all bg-gradient-to-br from-card via-card to-secondary/5">
              <CardHeader className="space-y-4">
                <div className="p-3 bg-secondary/15 rounded-lg w-fit">
                  <FileText className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Apply for Exam</CardTitle>
                <CardDescription>Submit your exam application</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="text-secondary hover:text-secondary hover:bg-secondary/10">
                  Apply Now →
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Hall Ticket Card */}
          <Link href={hasApprovedApplication ? "/student/hall-ticket" : "#"}>
            <Card
              className={`h-full cursor-pointer border-0 shadow-lg transition-all bg-gradient-to-br from-card via-card to-accent/5 ${!hasApprovedApplication ? "opacity-60" : "hover:shadow-xl hover:-translate-y-1"}`}
            >
              <CardHeader className="space-y-4">
                <div className={`p-3 rounded-lg w-fit ${hasApprovedApplication ? "bg-accent/15" : "bg-muted"}`}>
                  <Ticket className={`w-6 h-6 ${hasApprovedApplication ? "text-accent" : "text-muted-foreground"}`} />
                </div>
                <CardTitle>Hall Ticket</CardTitle>
                <CardDescription>
                  {hasApprovedApplication ? "View your exam hall ticket" : "Requires approved application"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {hasApprovedApplication && (
                  <Button variant="ghost" className="text-accent hover:text-accent hover:bg-accent/10">
                    View Ticket →
                  </Button>
                )}
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}
