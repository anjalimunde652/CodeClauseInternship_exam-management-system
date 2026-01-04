"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import { CheckCircle, Clock } from "lucide-react"

interface Application {
  id: string
  studentName: string
  rollNumber: string
  examName: string
  status: "pending" | "approved"
}

export default function ApplicationsPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "admin") {
      router.push("/login")
      return
    }

    // Load applications
    const storedApplications = localStorage.getItem("applications")
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications))
    }
  }, [router])

  const handleApprove = (id: string) => {
    const updatedApplications = applications.map((app) =>
      app.id === id ? { ...app, status: "approved" as const } : app,
    )
    setApplications(updatedApplications)
    localStorage.setItem("applications", JSON.stringify(updatedApplications))
  }

  const pendingCount = applications.filter((app) => app.status === "pending").length
  const approvedCount = applications.filter((app) => app.status === "approved").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-foreground">Student Applications</h1>
          <p className="text-muted-foreground">Manage exam applications from students</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-secondary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Applications</p>
                  <p className="text-3xl font-bold text-secondary">{pendingCount}</p>
                </div>
                <Clock className="w-8 h-8 text-secondary opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved Applications</p>
                  <p className="text-3xl font-bold text-primary">{approvedCount}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>All Applications</CardTitle>
            <CardDescription>Review and approve student exam applications</CardDescription>
          </CardHeader>

          <CardContent>
            {applications.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No applications yet</p>
            ) : (
              <div className="space-y-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{app.studentName}</p>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        <span>Roll: {app.rollNumber}</span>
                        <span>{app.examName}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {app.status === "pending" ? (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                          Pending
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          Approved
                        </span>
                      )}

                      {app.status === "pending" && (
                        <Button
                          onClick={() => handleApprove(app.id)}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground h-9"
                        >
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
