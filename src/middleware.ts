import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { routing } from "./i18n/routing"

const publicRoutes = ["/sign-in"]

function isPublicRoute(pathname: string) {
  return publicRoutes.some((route) => pathname.includes(route))
}

const intlMiddleware = createMiddleware(routing)

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Handle public routes
  if (isPublicRoute(pathname)) {
    return intlMiddleware(request)
  }

  // Check for authentication token in cookies or authorization header
  const token =
    request.cookies.get("token")?.value ||
    request.headers.get("authorization")?.split(" ")[1]

  if (!token) {
    const locale = request.cookies.get("locale")?.value || routing.locales[0]
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}/sign-in`
    return NextResponse.redirect(url)
  }

  // Add Accept-Language header based on current locale
  const response = await intlMiddleware(request)
  const currentLocale = routing.locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  )

  if (currentLocale) {
    response.headers.set("Accept-Language", currentLocale)
  }

  return response
}

export const config = {
  matcher: ["/", "/(en|ar)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
}
