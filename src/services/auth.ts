import { ApiAuthResponse, SignInRequest } from "@/types/auth"
import { fetchData } from "./api"

export const authService = {
  signIn: async (data: SignInRequest, locale: string) => {
    return fetchData<ApiAuthResponse>("/api/auth/token", {
      method: "POST",
      headers: {
        "Accept-Language": locale,
      },
      body: data,
    })
  },
}
