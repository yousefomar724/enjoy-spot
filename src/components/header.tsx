"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Separator } from "./ui/separator"
import { Locale } from "@/types"
import { usePathname, useRouter } from "next/navigation"
import { startTransition } from "react"
import { useListingTypes } from "@/hooks/useListingTypes"
import { Skeleton } from "./ui/skeleton"
import { useAuth } from "@/hooks/useAuth"

export default function Header({ locale }: { locale: Locale }) {
  const t = useTranslations()
  const pathname = usePathname()
  const router = useRouter()
  const { types: listingTypes, loading } = useListingTypes()
  const { isAuthenticated } = useAuth()

  console.log(listingTypes)

  const countries = [
    {
      name: "United Arab Emirates",
      code: "uae",
      translation: "common.uae",
      icon: "/uae.png",
      isDefault: true,
    },
    {
      name: "United States",
      code: "usa",
      translation: "common.usa",
      icon: "/usa.png",
      isDefault: false,
    },
  ]

  function handleLanguageChange(nextLocale: Locale) {
    startTransition(() => {
      // Get the path without the locale
      const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`)

      router.push(newPathname)
    })
  }

  return (
    <header className="w-full backdrop-blur-lg shadow-[0px_4px_20px_-1px_rgba(0,0,0,0.06)]">
      <div className="container mx-auto px-4 pt-4 pb-2">
        <div className="flex flex-col gap-4">
          {/* Top Section */}
          <div className="flex items-center justify-between">
            <Link href="/" className="relative h-12 w-32">
              <Image
                src="/logo.png"
                alt="Enjoy Spot"
                fill
                className="object-contain"
              />
            </Link>

            <div className="flex items-center gap-1 lg:gap-2">
              <Select
                defaultValue={locale}
                onValueChange={(value) => handleLanguageChange(value as Locale)}
              >
                <SelectTrigger className="h-10 w-fit lg:w-14 gap-1 shadow-none border-none bg-transparent px-2 text-sm font-medium text-[#25466A] [&>span]:flex [&>span]:items-center [&>span]:gap-1">
                  <SelectValue placeholder="En" className="font-inter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">En</SelectItem>
                  <SelectItem value="ar">Ar</SelectItem>
                </SelectContent>
              </Select>

              <Separator orientation="vertical" className="h-4" />

              <Select defaultValue="uae">
                <SelectTrigger className="h-10 w-fit lg:w-14 gap-1 border-none shadow-none bg-transparent px-2 text-sm font-medium text-[#25466A] [&>span]:flex [&>span]:items-center [&>span]:gap-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <Image
                        src={country.icon}
                        alt={country.name}
                        width={16}
                        height={16}
                      />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {!isAuthenticated() && (
                <Button
                  variant="default"
                  className="h-10 rounded-lg bg-[#25466A] text-xs lg:px-6 lg:text-sm font-medium text-white hover:bg-[#25466A]/90"
                >
                  {t("common.login")}
                </Button>
              )}
            </div>
          </div>

          {/* Bottom Section - Navigation */}
          <nav className="flex items-center justify-center gap-8 overflow-x-auto pb-2">
            {loading ? (
              <div className="flex gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-24" />
                ))}
              </div>
            ) : (
              listingTypes?.map((type) => (
                <Link
                  key={type.id}
                  href={`/${type.name.toLowerCase()}`}
                  className="whitespace-nowrap text-sm rtl:text-base text-[#25466A] flex flex-col items-center justify-center text-center"
                >
                  {type.webIcon && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: type.webIcon,
                      }}
                    />
                  )}
                  {type.name}
                </Link>
              ))
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
