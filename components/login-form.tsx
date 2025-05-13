"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Lock, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import { CardScanner } from "@/components/card-scanner"

export default function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()
  const { login, loginWithCard } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(formData.username, formData.password)

      if (success) {
        toast({
          title: "Login successful",
          description: "Redirecting to your dashboard...",
        })
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCardScanned = async (cardId: string) => {
    setIsLoading(true)

    try {
      const success = await loginWithCard(cardId)

      if (success) {
        toast({
          title: "Card authentication successful",
          description: "Redirecting to your dashboard...",
        })
      } else {
        toast({
          title: "Card authentication failed",
          description: "Invalid or unregistered card",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Authentication error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <CreditCard className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl text-center">LogIn</CardTitle>
        <CardDescription className="text-center">NFC card system for multipurpose</CardDescription>
      </CardHeader>
      <Tabs defaultValue="credentials" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="credentials">Credentials</TabsTrigger>
          <TabsTrigger value="card">Scan Card</TabsTrigger>
        </TabsList>
        <TabsContent value="credentials">
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    className="pl-8"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-8"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        <TabsContent value="card">
          <CardContent className="space-y-4">
            <div className="space-y-2 text-center">
              <Label>Scan your NFC card</Label>
              <div className="py-6">
                <CardScanner onCardScanned={handleCardScanned} isLoading={isLoading} />
              </div>
              <p className="text-sm text-muted-foreground">Hold your NFC card near the reader to authenticate</p>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
