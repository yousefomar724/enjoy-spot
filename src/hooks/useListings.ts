import { useCallback, useEffect, useState } from "react"
import { ListingFilter, Listing, SortingValue } from "@/types/listings"
import { listingsService } from "@/services/listings"
import { useRouter, useSearchParams } from "next/navigation"

export function useListings() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [listings, setListings] = useState<Listing[]>([])
  const [sortingValues, setSortingValues] = useState<SortingValue[]>([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get initial filters from URL
  const initialFilters: ListingFilter = {
    pageNumber: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 12,
    cityId: Number(searchParams.get("cityId")) || undefined,
    locationId: Number(searchParams.get("locationId")) || undefined,
    listingTypeId: Number(searchParams.get("listingTypeId")) || undefined,
    listingCategoryId:
      Number(searchParams.get("listingCategoryId")) || undefined,
    search: searchParams.get("search") || undefined,
    sortBy: searchParams.get("sortBy") || undefined,
    minPrice: Number(searchParams.get("minPrice")) || undefined,
    maxPrice: Number(searchParams.get("maxPrice")) || undefined,
  }

  const [filters, setFilters] = useState<ListingFilter>(initialFilters)

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await listingsService.getListings(filters)

      if (response.isSuccess) {
        setListings(response.data.data)
        setSortingValues(response.data.sortingValues)
        setTotalRecords(response.data.totalRecords)
      } else {
        setError(response.message)
      }
    } catch (err) {
      console.error(err)
      setError("Failed to fetch listings")
    } finally {
      setLoading(false)
    }
  }, [filters])

  // Update URL when filters change
  useEffect(() => {
    const queryParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.set(key, String(value))
      }
    })

    router.push(`?${queryParams.toString()}`, { scroll: false })
  }, [filters, router])

  // Fetch listings when filters change
  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  const updateFilters = useCallback((newFilters: Partial<ListingFilter>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      pageNumber: newFilters.pageNumber || 1, // Reset to page 1 when filters change
    }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({
      pageNumber: 1,
      pageSize: 12,
    })
  }, [])

  return {
    listings,
    sortingValues,
    totalRecords,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
  }
}
