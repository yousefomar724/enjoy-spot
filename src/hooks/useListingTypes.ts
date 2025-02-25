import { useEffect, useState } from "react"
import { ListingCategory, ListingType } from "@/types/listings"
import { listingsService } from "@/services/listings"

export function useListingTypes() {
  const [types, setTypes] = useState<ListingType[]>([])
  const [categories, setCategories] = useState<ListingCategory[]>([])
  const [selectedType, setSelectedType] = useState<number>()
  const [loading, setLoading] = useState(false)

  // Fetch listing types
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoading(true)
        const response = await listingsService.getListingTypes()
        // Initialize with empty array if response is null/undefined
        const typesData = response.data || []
        setTypes(typesData)
        // Set first type as default if exists
        if (typesData.length > 0) {
          setSelectedType(typesData[0].id)
        }
      } catch (error) {
        console.error("Failed to fetch listing types:", error)
        setTypes([])
      } finally {
        setLoading(false)
      }
    }

    fetchTypes()
  }, [])

  // Fetch categories when type changes
  useEffect(() => {
    const fetchCategories = async () => {
      if (selectedType) {
        setLoading(true)
        try {
          const response = await listingsService.getListingCategories(
            selectedType
          )
          setCategories(response.data)
        } catch (error) {
          console.error("Failed to fetch categories:", error)
        } finally {
          setLoading(false)
        }
      } else {
        setCategories([])
      }
    }

    fetchCategories()
  }, [selectedType])

  return {
    types,
    categories,
    selectedType,
    setSelectedType,
    loading,
  }
}
