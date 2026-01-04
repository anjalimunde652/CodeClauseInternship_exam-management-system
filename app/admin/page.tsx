"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import { FileText, Users, Bell } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "admin") {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <Navbar />

      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage exams and student applications</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create Exam Card */}
          <Link href="/admin/create-exam">
            <Card className="h-full cursor-pointer border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all bg-gradient-to-br from-card via-card to-primary/5">
              <CardHeader className="space-y-4">
                <div className="p-3 bg-primary/15 rounded-lg w-fit">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Create Exam</CardTitle>
                <CardDescription>Set up new examinations</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
                  Create New →
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Applications Card */}
          <Link href="/admin/applications">
            <Card className="h-full cursor-pointer border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all bg-gradient-to-br from-card via-card to-secondary/5">
              <CardHeader className="space-y-4">
                <div className="p-3 bg-secondary/15 rounded-lg w-fit">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Student Applications</CardTitle>
                <CardDescription>Review and approve applications</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="text-secondary hover:text-secondary hover:bg-secondary/10">
                  View All →
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Notifications Card */}
          <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-card via-card to-accent/5">
            <CardHeader className="space-y-4">
              <div className="p-3 bg-accent/15 rounded-lg w-fit">
                <Bell className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Latest updates and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No new notifications</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
