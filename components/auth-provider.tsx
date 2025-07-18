"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  username: string
  role: "admin" | "security" | "dormitory" | "cafe" | "library" | "complaints" | "payment" | "deposit"
} | null

type AuthContextType = {
  user: User
  login: (username: string, password: string) => Promise<boolean>
  loginWithCard: (cardId: string) => Promise<boolean>
  logout: () => void
}

// Mock user database
const USERS = [
  { username: "admin", password: "admin", role: "admin", id: "a925ff77-a3f5-448a-8ac9-b4ffd1cd1402" },
  { username: "security", password: "security", role: "security", id: "b3e87a7f-3f20-4a96-b9d3-b996868db316" },
  { username: "dormitory", password: "dormitory", role: "dormitory", id: "9708049c-171a-4a11-8c90-974226156595" },
  { username: "cafe", password: "cafe", role: "cafe", id: "393c2b86-ee11-47b5-bf7a-ef23f398716d" },
  { username: "library", password: "library", role: "library" },
  { username: "complaints", password: "complaints", role: "complaints", id: "b3e87a7f-3f20-4a96-b9d3-b996868db316" },
  { username: "payment", password: "payment", role: "payment" },
  { username: "deposit", password: "deposit", role: "deposit" },
]

// Mock card database
const CARDS = [
  { cardId: "CARD-1001", userId: "admin", role: "admin" },
  { cardId: "CARD-1002", userId: "security", role: "security" },
  { cardId: "CARD-1003", userId: "dormitory", role: "dormitory" },
  { cardId: "CARD-1004", userId: "cafe", role: "cafe" },
  { cardId: "CARD-1005", userId: "library", role: "library" },
]

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Load user from localStorage on initial render
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    // Handle routing based on auth state
    if (!loading) {
      // If not logged in and not on login page, redirect to login
      if (!user && !pathname.includes("/login")) {
        router.push("/login")
      }

      // If logged in and on login page, redirect to appropriate dashboard
      if (user && pathname === "/login") {
        router.push(`/dashboard/${user.role}`)
      }
    }
  }, [user, loading, pathname, router])

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = USERS.find((u) => u.username === username && u.password === password)

    if (foundUser) {
      const userData = {
        username: foundUser.username,
        id: foundUser.id,
        role: foundUser.role as "admin" | "security" | "dormitory" | "cafe" | "library",
      }
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
      return true
    }

    return false
  }

  const loginWithCard = async (cardId: string): Promise<boolean> => {
    // // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundCard = CARDS.find((c) => c.cardId === cardId)

    if (foundCard) {
      const foundUser = USERS.find((u) => u.username === foundCard.userId)

      if (foundUser) {
        const userData = {
          username: foundUser.username,
          role: foundUser.role as "admin" | "security" | "dormitory" | "cafe" | "library",
        }
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        return true
      }
    }

    return false
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithCard, logout }}>{!loading && children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
