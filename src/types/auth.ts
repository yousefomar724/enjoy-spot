export interface Language {
  name: string
  code: string
}

export interface AuthResponse {
  isAuthenticated: boolean
  token: string
  email: string
  userName: string
  expiresOn: string
  roles: string[]
  userId: string
  supportedLanguages: Language[]
}

export interface SignInRequest {
  userNameOrEmail: string
  password: string
}

export interface ApiAuthResponse {
  isSuccess: boolean
  message: string
  data: AuthResponse
  errors: string[]
}
