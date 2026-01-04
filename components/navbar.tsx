"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useState, useEffect } from "react"

export default function Navbar() {
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    setRole(userRole)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ExamHub
          </h1>
          {role && (
            <span className="ml-4 px-3 py-1 bg-muted rounded-full text-xs font-semibold text-muted-foreground capitalize">
              {role}
            </span>
          )}
        </div>

        <Button onClick={handleLogout} variant="outline" className="flex gap-2 h-9 bg-transparent">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </nav>
  )
}
