"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { LayoutPanelLeft, Ruler, Share2, Star, Users } from "lucide-react"
import { Listing, PriceType } from "@/types/listings"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

interface YachtCardProps extends Pick<Listing, "name" | "price" | "rating"> {
  image: string
  guests: number
  cabins: number
  length: number
  priceType: PriceType
  onShare?: () => void
  onBook?: () => void
}

export default function YachtCard({
  name,
  image,
  guests,
  cabins,
  length,
  price,
  priceType,
  rating,
  onShare,
  onBook,
}: YachtCardProps) {
  const t = useTranslations()

  const priceText =
    priceType === PriceType.PERSON
      ? t("yacht.currency_per_person")
      : t("yacht.currency_per_hour")

  return (
    <Card className="group overflow-hidden bg-white shadow-[0px_4px_4px_0px_#0000000F]">
      <div className="relative rounded-lg p-3">
        <div className="relative h-48 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="absolute end-3 bottom-3 ps-2 pt-2 rounded-tr-none rounded-tl-xl rtl:rounded-tr-xl rtl:rounded-tl-none bg-white">
          <div className="flex flex-col items-center justify-center rounded-lg bg-secondary px-3 py-1.5 text-white">
            <span className="text-2xl font-bold">{price}</span>
            <span className="text-sm">{priceText}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <h3
            className="text-2xl font-bold text-primary line-clamp-1"
            title={name}
          >
            {name}
          </h3>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-primary">{rating}/5</span>
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>

        <div className="flex items-center justify-center text-sm text-gray-500 divide-x divide-gray-200 rtl:divide-x-reverse">
          <div className="flex items-center gap-1.5 pe-2.5">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm whitespace-nowrap">
              {t("yacht.guests", { count: guests })}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5">
            <LayoutPanelLeft className="h-4 w-4 text-gray-400" />
            <span className="text-sm whitespace-nowrap">
              {t("yacht.cabins", { count: cabins })}
            </span>
          </div>
          <div className="flex items-center gap-1.5 ps-2.5">
            <Ruler className="h-4 w-4 text-gray-400" />
            <span className="text-sm whitespace-nowrap">
              {t("yacht.length", { length })}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary"
            onClick={onBook}
          >
            {t("categories.book_now")}
          </Button>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-none text-primary bg-gray-100 hover:bg-gray-200 transition-colors rounded-full flex items-center justify-center"
                  onClick={onShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t("categories.share")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </Card>
  )
}
