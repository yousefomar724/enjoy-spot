"use client"

import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  const t = useTranslations()

  const socialMedia = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/enjoyspot.me",
      icon: <FaFacebook />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/enjoyspot.me",
      icon: <FaInstagram />,
    },
    {
      name: "Twitter",
      href: "https://www.twitter.com/enjoyspot.me",
      icon: <FaTwitter />,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/971526374892",
      icon: <FaWhatsapp />,
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@enjoyspot.me",
      icon: <FaTiktok />,
    },
  ]

  return (
    <footer className="w-full border-t bg-primary text-white">
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

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {socialMedia.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xl flex items-center gap-2"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
