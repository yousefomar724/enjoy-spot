import { useState } from "react"
import { toast } from "sonner"
import { authService } from "@/services/auth"
import { SignInRequest } from "@/types/auth"
import Cookies from "js-cookie"

export function useAuth() {
  const [loading, setLoading] = useState(false)

  const signIn = async (data: SignInRequest, locale: string) => {
    setLoading(true)

    try {
      const response = await authService.signIn(data, locale)

      if (response.isSuccess) {
        // Store the token in both cookies and localStorage
        Cookies.set("token", response.data.token)
        localStorage.setItem("token", response.data.token)

        // Store the locale
        Cookies.set("locale", locale)
        localStorage.setItem("locale", locale)

        // Store user data
        localStorage.setItem("user", JSON.stringify(response.data))

        // Show success message
        toast.success("Successfully signed in!")

        // Redirect to home page with locale
        window.location.href = `/${locale}`
        return true
      } else {
        toast.error(response.message || "Invalid credentials")
        return false
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Please try again.")
      return false
    } finally {
      setLoading(false)
    }
  }

  const isAuthenticated = () => {
    const token = Cookies.get("token")
    return token !== undefined
  }

  const signOut = () => {
    const locale = localStorage.getItem("locale") || "en"
    // Clear both cookies and localStorage
    Cookies.remove("token")
    Cookies.remove("locale")
    localStorage.removeItem("token")
    localStorage.removeItem("locale")
    localStorage.removeItem("user")
    window.location.href = `/${locale}/sign-in`
  }

  return {
    loading,
    signIn,
    signOut,
    isAuthenticated,
  }
}
