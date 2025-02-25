import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { Locale } from "@/types"
import { ReactNode, Suspense } from "react"
import Loading from "@/components/loading"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { cn } from "@/lib/utils"
import { CircleCheckBig, CircleX } from "lucide-react"
import { Toaster } from "@/components/ui/sonner"

const zarid = localFont({
  src: "../../../public/zarid.woff",
  display: "swap",
  variable: "--font-zarid",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

type Props = {
  children: ReactNode
  params: { locale: Locale }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">) {
  const t = await getTranslations({ locale })

  return {
    title: t("metadata.title", { category: t("categories.yachts") }),
    description: t("metadata.description", {
      category: t("categories.yachts"),
    }),
  }
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${inter.variable} ${zarid.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <main
            dir={locale === "ar" ? "rtl" : "ltr"}
            className={cn(
              "select-none",
              locale === "ar" ? "font-zarid" : "font-inter"
            )}
          >
            <Suspense fallback={<Loading />}>
              {children}
              <Toaster
                position="top-center"
                theme="light"
                className="!left-1/2 !-translate-x-1/2 [&>li]:!mx-auto"
                icons={{
                  success: (
                    <CircleCheckBig className="w-5 h-5 text-green-500 translate-y-0.5" />
                  ),
                  error: (
                    <CircleX className="w-5 h-5 text-red-500 translate-y-0.5" />
                  ),
                }}
              />
            </Suspense>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
