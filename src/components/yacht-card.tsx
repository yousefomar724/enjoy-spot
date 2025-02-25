"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

type YachtCardProps = {
  name: string
  image: string
  guests: number
  cabins: number
  length: number
  price: number
  rating: number
}

export default function YachtCard({
  name,
  image,
  guests,
  cabins,
  length,
  price,
  rating,
}: YachtCardProps) {
  const t = useTranslations()

  return (
    <Card className="group overflow-hidden">
      <div className="relative">
        <div className="relative h-48 overflow-hidden">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div className="absolute right-3 top-3 rounded-lg bg-[#00ADEE] px-3 py-1 text-sm font-medium text-white">
          {t("yacht.price", { price })}
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-[#25466A]">{name}</h3>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-[#25466A]">{rating}</span>
            <Image
              src="/icons/star.svg"
              alt="Rating"
              width={16}
              height={16}
              className="text-yellow-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/user.svg"
              alt="Guests"
              width={16}
              height={16}
              className="text-gray-400"
            />
            <span>{t("yacht.guests", { count: guests })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/cabin.svg"
              alt="Cabins"
              width={16}
              height={16}
              className="text-gray-400"
            />
            <span>{t("yacht.cabins", { count: cabins })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/ruler.svg"
              alt="Length"
              width={16}
              height={16}
              className="text-gray-400"
            />
            <span>{t("yacht.length", { length })}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex-1 border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {t("categories.share")}
          </Button>
          <Button
            variant="default"
            className="flex-1 bg-[#25466A] text-sm font-medium hover:bg-[#25466A]/90"
          >
            {t("categories.book_now")}
          </Button>
        </div>
      </div>
    </Card>
  )
}
