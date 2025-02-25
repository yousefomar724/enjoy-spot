"use client"

import { useTranslations } from "next-intl"
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
import { ArrowDownUp, Calendar, ListFilter, MapPin, Users } from "lucide-react"
import { useListings } from "@/hooks/useListings"
import { useEffect, useState } from "react"
import { listingsService } from "@/services/listings"
import { City, Location } from "@/types/listings"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Header from "@/components/header"
import { Locale } from "@/types"
import Footer from "@/components/footer"
import { useListingTypes } from "@/hooks/useListingTypes"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
  params: { locale: Locale }
}

export default function HomePage({ params: { locale } }: Props) {
  const t = useTranslations()
  const { listings, totalRecords, loading, filters, updateFilters } =
    useListings()
  const router = useRouter()
  const { categories, loading: categoriesLoading } = useListingTypes()

  const [cities, setCities] = useState<City[]>([])
  const [locations, setLocations] = useState<Location[]>([])

  // Fetch cities and locations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesResponse = await listingsService.getCities()
        setCities(citiesResponse.data)
      } catch (error) {
        console.error("Failed to fetch cities:", error)
      }
    }

    fetchData()
  }, [])

  // Fetch locations when city changes
  useEffect(() => {
    const fetchLocations = async () => {
      if (filters.cityId) {
        try {
          const locationsResponse = await listingsService.getLocations(
            filters.cityId
          )
          setLocations(locationsResponse.data)
        } catch (error) {
          console.error("Failed to fetch locations:", error)
        }
      } else {
        setLocations([])
      }
    }

    fetchLocations()
  }, [filters.cityId])

  return (
    <div className="min-h-screen">
      <Header locale={locale} />
      {/* Category Tabs */}
      <section className="container mx-auto mb-4 px-4 py-8">
        {categoriesLoading ? (
          <div className="flex justify-center">
            <Skeleton className="h-10 w-[600px]" />
          </div>
        ) : (
          <Tabs
            defaultValue={categories[0]?.id.toString()}
            className="w-full"
            onValueChange={(value) =>
              updateFilters({ listingCategoryId: Number(value) })
            }
          >
            <TabsList className="mx-auto flex h-auto w-fit flex-wrap justify-center gap-2 bg-transparent p-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id.toString()}
                  className="flex flex-col items-center gap-2 data-[state=active]:bg-secondary/10"
                >
                  <div className="relative h-10 w-10">
                    {category.webIcon && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: category.webIcon,
                        }}
                      />
                    )}
                  </div>
                  <span className="text-center text-xs rtl:text-sm">
                    {category.name}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-4 lg:flex-nowrap">
          <Select
            dir={locale === "ar" ? "rtl" : "ltr"}
            value={filters.cityId?.toString()}
            onValueChange={(value) =>
              updateFilters({ cityId: Number(value), locationId: undefined })
            }
          >
            <SelectTrigger className="h-12 w-full rounded-lg border-none bg-white px-4 text-sm font-medium shadow-none rtl:text-base">
              <div className="flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:text-gray-400">
                <MapPin className="h-4 w-4 text-gray-400" />
                <SelectValue placeholder={t("filters.select_city")} />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-gray-200">
              {cities?.map((city) => (
                <SelectItem key={city.id} value={city.id.toString()}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="hidden h-12 lg:block" />

          <Select
            dir={locale === "ar" ? "rtl" : "ltr"}
            value={filters.locationId?.toString()}
            onValueChange={(value) =>
              updateFilters({ locationId: Number(value) })
            }
            disabled={!filters.cityId}
          >
            <SelectTrigger className="h-12 w-full rounded-lg border-none bg-white px-4 text-sm font-medium shadow-none rtl:text-base">
              <div className="flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:text-gray-400">
                <Calendar className="h-4 w-4 text-gray-400" />
                <SelectValue placeholder={t("filters.select_date")} />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-gray-200">
              {locations.map((location) => (
                <SelectItem key={location.id} value={location.id.toString()}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="hidden h-12 lg:block" />

          <Select
            dir={locale === "ar" ? "rtl" : "ltr"}
            value={filters.pageSize?.toString()}
            onValueChange={(value) =>
              updateFilters({ pageSize: Number(value) })
            }
          >
            <SelectTrigger className="h-12 w-full rounded-lg border-none bg-white px-4 text-sm font-medium shadow-none rtl:text-base">
              <div className="flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:text-gray-400">
                <Users className="h-4 w-4 text-gray-400" />
                <SelectValue placeholder={t("filters.select_guests")} />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-gray-200">
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="48">48</SelectItem>
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="hidden h-12 lg:block" />

          <Button
            variant="default"
            className="h-12 w-full min-w-[120px] rounded-lg bg-primary px-8 text-base font-medium hover:bg-primary/90 rtl:text-lg"
          >
            {t("categories.search")}
          </Button>
        </div>
      </section>

      <Separator className="mx-auto my-8 max-w-6xl" />

      {/* Sort Options */}
      {/* {sortingValues.length > 0 && (
        <section className="container mx-auto mb-4 px-4">
          <div className="mx-auto flex max-w-7xl items-center gap-4">
            <span className="text-sm font-medium text-gray-500">Sort by:</span>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => updateFilters({ sortBy: value })}
            >
              <SelectTrigger className="h-10 w-[200px] border-none bg-transparent px-2 text-sm">
                <SelectValue
                  placeholder={
                    sortingValues.find((s) => s.sortKey === filters.sortBy)
                      ?.displayName || "Default"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {sortingValues.map((sort) => (
                  <SelectItem key={sort.sortKey} value={sort.sortKey}>
                    {sort.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>
      )} */}

      {/* Yachts sort */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-end gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-gray-100 border-none"
              >
                <ListFilter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="w-80"
            >
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    {t("yachts.filter")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t("yachts.filter_description")}
                  </p>
                </div>
                <div className="grid gap-2">
                  <Button variant="outline" size="sm">
                    {t("yachts.filter_by_price")}
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-gray-100 border-none"
              >
                <ArrowDownUp className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="w-80"
            >
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    {t("yachts.sort")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t("yachts.sort_description")}
                  </p>
                </div>
                <div className="grid gap-2">
                  <Button variant="outline" size="sm">
                    {t("yachts.sort_by_price")}
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Yacht Cards */}
      <section className="mx-auto max-w-7xl px-4">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: filters.pageSize || 12 }).map((_, i) => (
              <Skeleton key={i} className="h-[400px]" />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 text-gray-400">
              <ListFilter className="mx-auto h-12 w-12" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              {t("listings.no_results")}
            </h3>
            <p className="mb-6 text-sm text-gray-500">
              {t("listings.try_adjusting_filters")}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                updateFilters({
                  pageNumber: 1,
                  pageSize: 12,
                  cityId: undefined,
                  locationId: undefined,
                  listingCategoryId: undefined,
                  search: undefined,
                  sortBy: undefined,
                  minPrice: undefined,
                  maxPrice: undefined,
                })
              }}
            >
              {t("listings.clear_filters")}
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {listings.map((yacht) => (
              <YachtCard
                key={yacht.id}
                name={yacht.name}
                image={
                  yacht.attachments.find((a) => a.attachmentType === "Main")
                    ?.attachmentPath || "/yacht.png"
                }
                guests={
                  Number(
                    yacht.details.find(
                      (d) => d.listingCategoryDetailName === "Guests"
                    )?.listingCategoryDetailValue
                  ) || 0
                }
                cabins={
                  Number(
                    yacht.details.find(
                      (d) => d.listingCategoryDetailName === "Cabins"
                    )?.listingCategoryDetailValue
                  ) || 0
                }
                length={
                  Number(
                    yacht.details.find(
                      (d) => d.listingCategoryDetailName === "Length"
                    )?.listingCategoryDetailValue
                  ) || 0
                }
                price={yacht.price}
                priceType={yacht.priceType}
                rating={yacht.rating}
                onShare={() => {
                  // Implement share functionality
                  navigator
                    .share?.({
                      title: yacht.name,
                      text: `Check out ${yacht.name}`,
                      url: window.location.href,
                    })
                    .catch(() => {
                      // Fallback copy to clipboard
                      navigator.clipboard.writeText(window.location.href)
                    })
                }}
                onBook={() => {
                  // Implement booking functionality
                  router.push(`/book/${yacht.id}`)
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-2">
          {Array.from({
            length: Math.ceil(totalRecords / (filters.pageSize || 12)),
          }).map((_, i) => (
            <Button
              key={i}
              variant={filters.pageNumber === i + 1 ? "default" : "outline"}
              size="sm"
              className={
                filters.pageNumber === i + 1 ? "bg-secondary" : undefined
              }
              onClick={() => updateFilters({ pageNumber: i + 1 })}
            >
              {i + 1}
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
              className="text-sm hover:text-secondary"
            >
              {t(`explore.topic_${i}`)}
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}
