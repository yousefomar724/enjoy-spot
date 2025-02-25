import {
  ApiResponse,
  City,
  Currency,
  ListingCategory,
  ListingFilter,
  ListingsResponse,
  ListingType,
  Location,
} from "@/types/listings"
import { fetchData } from "./api"

export const listingsService = {
  getListings: (filters: ListingFilter) =>
    fetchData<ApiResponse<ListingsResponse>>("/api/listings/getAll", {
      method: "GET",
      params: filters,
    }),

  getCities: (countryId?: number) =>
    fetchData<ApiResponse<City[]>>("/api/cities/getAll", {
      method: "GET",
      params: { countryId },
    }),

  getLocations: (cityId?: number) =>
    fetchData<ApiResponse<Location[]>>("/api/listings/locations", {
      method: "GET",
      params: { cityId },
    }),

  getCurrencies: () =>
    fetchData<ApiResponse<Currency[]>>("/api/currencies/getAll", {
      method: "GET",
    }),

  toggleCurrency: (id: number) =>
    fetchData<boolean>(`/api/currencies/toggelActive/${id}`, {
      method: "PUT",
    }),

  getListingTypes: () =>
    fetchData<ApiResponse<ListingType[]>>("/api/listingTypes/getAll", {
      method: "GET",
    }),

  getListingCategories: (listingTypeId?: number) =>
    fetchData<ApiResponse<ListingCategory[]>>("/api/listingCategories/getAll", {
      method: "GET",
      params: { listingTypeId },
    }),

  getCategories: (listingTypeId?: number) =>
    fetchData<
      {
        id: number
        name: string
        listingTypeId: number
        listingTypeName: string
        isActive: boolean
      }[]
    >("/api/listings/categories", { params: { listingTypeId } }),

  getTypes: () =>
    fetchData<
      {
        id: number
        name: string
        isActive: boolean
        webIcon: string
      }[]
    >("/api/listings/types"),

  addToFavorites: (listingId: number) =>
    fetchData<boolean>("/api/favorites", { params: { listingId } }),

  removeFromFavorites: (listingId: number) =>
    fetchData<boolean>(`/api/favorites/${listingId}`),
}
