"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import YachtCard from "@/components/yacht-card"
import { Calendar, MapPin, Users } from "lucide-react"

const MOCK_YACHTS = [
  {
    id: 1,
    name: "Yacht Name",
    image: "/yacht.png",
    guests: 12,
    cabins: 3,
    length: 75,
    price: 2500,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Yacht Name",
    image: "/yacht.png",
    guests: 12,
    cabins: 3,
    length: 75,
    price: 2500,
    rating: 4.5,
  },
  {
    id: 3,
    name: "Yacht Name",
    image: "/yacht.png",
    guests: 12,
    cabins: 3,
    length: 75,
    price: 2500,
    rating: 4.5,
  },
  {
    id: 4,
    name: "Yacht Name",
    image: "/yacht.png",
    guests: 12,
    cabins: 3,
    length: 75,
    price: 2500,
    rating: 4.5,
  },
]

const categories = [
  {
    label: "private",
    icon: "/icons/private.png",
  },
  {
    label: "sharing",
    icon: "/icons/sharing.png",
  },
  {
    label: "black_yacht",
    icon: "/icons/black-yacht.png",
  },
  {
    label: "fishing",
    icon: "/icons/fishing.png",
  },
  {
    label: "birthday",
    icon: "/icons/birthday.png",
  },
  {
    label: "corporate",
    icon: "/icons/corporate.png",
  },
  {
    label: "wedding",
    icon: "/icons/wedding.png",
  },
  {
    label: "packages",
    icon: "/icons/packages.png",
  },
  {
    label: "events",
    icon: "/icons/events.png",
  },
]

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = useTranslations()

  return (
    <div className="min-h-screen">
      {/* Category Icons */}
      <section className="container mx-auto px-4 py-8 mb-4">
        <div className="flex items-center justify-center flex-wrap gap-6 lg:gap-12">
          {categories.map((category) => (
            <Link
              key={category.label}
              href={`/${category.label}`}
              className="flex flex-col items-center gap-2"
            >
              <div className="relative h-10 w-10">
                <Image
                  src={category.icon}
                  alt={t(`categories.${category.label}`)}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-center text-xs rtl:text-sm">
                {t(`categories.${category.label}`)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-center flex-wrap lg:flex-nowrap gap-4 max-w-5xl mx-auto">
          <Select dir={locale === "ar" ? "rtl" : "ltr"}>
            <SelectTrigger className="h-12 w-full rtl:text-base rounded-lg border-none shadow-none bg-white px-4 text-sm font-medium">
              <div className="flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:text-gray-400">
                <MapPin className="text-gray-400 w-4 h-4" />
                <SelectValue placeholder={t("filters.select_city")} />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-gray-200">
              <SelectItem value="dubai">Dubai</SelectItem>
              <SelectItem value="abudhabi">Abu Dhabi</SelectItem>
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="h-12 hidden lg:block" />

          <Select dir={locale === "ar" ? "rtl" : "ltr"}>
            <SelectTrigger className="h-12 w-full rtl:text-base rounded-lg border-none shadow-none bg-white px-4 text-sm font-medium">
              <div className="flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:text-gray-400">
                <Calendar className="text-gray-400 w-4 h-4" />
                <SelectValue placeholder={t("filters.select_date")} />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-gray-200">
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="h-12 hidden lg:block" />

          <Select dir={locale === "ar" ? "rtl" : "ltr"}>
            <SelectTrigger className="h-12 w-full rtl:text-base rounded-lg border-none shadow-none bg-white px-4 text-sm font-medium">
              <div className="flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:text-gray-400">
                <Users className="text-gray-400 w-4 h-4" />
                <SelectValue placeholder={t("filters.select_guests")} />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-gray-200">
              <SelectItem value="1-5">1-5</SelectItem>
              <SelectItem value="6-10">6-10</SelectItem>
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="h-12 hidden lg:block" />

          <Button
            variant="default"
            className="h-12 min-w-[120px] w-full rounded-lg bg-[#25466A] px-8 text-base rtl:text-lg font-medium hover:bg-[#25466A]/90"
          >
            {t("categories.search")}
          </Button>
        </div>
      </section>

      <Separator className="my-8 max-w-6xl mx-auto" />

      {/* Yacht Cards */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_YACHTS.map((yacht) => (
            <YachtCard key={yacht.id} {...yacht} />
          ))}
        </div>
      </section>

      {/* Pagination */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "outline"}
              size="sm"
              className={page === 1 ? "bg-[#00ADEE]" : ""}
            >
              {page}
            </Button>
          ))}
        </div>
      </section>

      {/* Explore More */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-semibold">{t("explore.title")}</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Link
              key={i}
              href={`/explore/${i}`}
              className="text-sm hover:text-[#00ADEE]"
            >
              {t(`explore.topic_${i}`)}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
