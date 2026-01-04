"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"admin" | "student">("student")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    // Save role to localStorage
    localStorage.setItem("userRole", role)
    localStorage.setItem("userEmail", email)

    // Redirect based on role
    if (role === "admin") {
      router.push("/admin")
    } else {
      router.push("/student")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ExamHub
          </CardTitle>
          <CardDescription className="text-base">Sign in to your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Select Role</Label>
              <div className="flex gap-4">
                <label
                  className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border-2 border-transparent transition-all hover:border-secondary hover:bg-secondary/5"
                  style={{
                    borderColor: role === "student" ? "var(--color-secondary)" : "transparent",
                    backgroundColor: role === "student" ? "var(--color-secondary)" + "08" : "transparent",
                  }}
                >
                  <input
                    type="radio"
                    value="student"
                    checked={role === "student"}
                    onChange={(e) => setRole(e.target.value as "student")}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">Student</span>
                </label>

                <label
                  className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border-2 border-transparent transition-all hover:border-primary hover:bg-primary/5"
                  style={{
                    borderColor: role === "admin" ? "var(--color-primary)" : "transparent",
                    backgroundColor: role === "admin" ? "var(--color-primary)" + "08" : "transparent",
                  }}
                >
                  <input
                    type="radio"
                    value="admin"
                    checked={role === "admin"}
                    onChange={(e) => setRole(e.target.value as "admin")}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">Admin</span>
                </label>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 bg-input border-input"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 bg-input border-input"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-4">Demo: Use any email and password to login</p>
        </CardContent>
      </Card>
    </div>
  )
}
