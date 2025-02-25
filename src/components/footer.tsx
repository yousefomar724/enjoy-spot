"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  const t = useTranslations()

  return (
    <footer className="w-full border-t bg-[#25466A] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <Link href="/" className="relative h-12 w-32">
            <Image
              src="/logo-footer.png"
              alt="Enjoy Spot"
              fill
              className="object-contain"
            />
          </Link>

          <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link href="/contact" className="text-sm">
              {t("categories.contact_us")}
            </Link>
            <Link href="/bookings" className="text-sm">
              {t("categories.manage_bookings")}
            </Link>
            <Link href="/privacy" className="text-sm">
              {t("categories.privacy_policy")}
            </Link>
            <Link href="/terms" className="text-sm">
              {t("categories.terms_and_conditions")}
            </Link>
            <Link href="/help" className="text-sm">
              {t("categories.help_center")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
