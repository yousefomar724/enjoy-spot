/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { AdvancedFilter } from "@/types/listings"

export type QueryParamValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | string[]
  | number[]
  | AdvancedFilter[]

interface FetchOptions {
  method?: "GET" | "POST" | "PUT"
  headers?: Record<string, string>
  body?: any
  params?: Record<string, QueryParamValue>
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Add request interceptor to add auth token and language
api.interceptors.request.use((config) => {
  // Add auth token if available
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // Add language header based on current locale
  const locale = localStorage.getItem("locale") || "en"
  config.headers["Accept-Language"] = locale

  return config
})

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors (401)
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export const createQueryString = (params: Record<string, QueryParamValue>) => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, v.toString()))
      } else {
        searchParams.append(key, value.toString())
      }
    }
  })

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ""
}

export const fetchData = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const { method = "GET", headers = {}, body, params } = options
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
  const url = `${baseUrl}${endpoint}${params ? createQueryString(params) : ""}`

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export default api
