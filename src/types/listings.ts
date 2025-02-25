import type { QueryParamValue } from "@/services/api"

export enum PriceType {
  PERSON = "Person",
  HOUR = "Hour",
}

export enum PropertyDataType {
  NUMBER = "Number",
  STRING = "String",
}

export interface ListingDetail {
  listingCategoryDetailID: number
  listingCategoryDetailName: string
  listingCategoryDetailValue: string
  propertyDataType: PropertyDataType
}

export interface Attachment {
  attachmentType: string
  attachmentPath: string
}

export interface Listing {
  id: number
  name: string
  isActive: boolean
  supplierName: string
  cityName: string
  listingTypeName: string
  listingCategoryName: string
  listingCategoryId: number
  locationType_name: string | null
  locationName: string
  promotion: boolean
  refunds: boolean
  extraHours: number
  priceDiscountPercentage: number
  priceDiscountValue: number
  minimumBookingHours: number
  price: number
  priceType: PriceType
  hasEntertainment: boolean
  isFeatured: boolean
  rating: number
  details: ListingDetail[]
  attachments: Attachment[]
}

export interface SortingValue {
  displayName: string
  sortKey: string
}

export interface AdvancedFilter {
  key: number
  values: string[]
}

export interface Currency {
  id: number
  name: string
  code: string
  symbol: string
  isActive: boolean
}

export interface ListingTypeResponse {
  data: ListingType[]
  isSuccess: boolean
  message: string
  errors: string[]
}

export interface ListingType {
  id: number
  name: string
  isActive: boolean
  webIcon: string
}

export interface ListingCategory {
  id: number
  name: string
  listingTypeId: number
  listingTypeName: string
  isActive: boolean
  webIcon: string
}

export interface City {
  id: number
  name: string
  countryId: number
  countryName: string
  isActive: boolean
}

export interface Location {
  id: number
  name: string
  cityId: number
  cityName: string
  isActive: boolean
}

export interface ListingFilter {
  pageNumber?: number
  pageSize?: number
  isActive?: boolean
  hasOffer?: boolean
  search?: string
  supplierId?: number
  listingTypeId?: number
  listingCategoryId?: number
  cityId?: number
  locationId?: number
  minPrice?: number
  maxPrice?: number
  advancedFilter?: AdvancedFilter[] | string
  sortBy?: string
  currencyId?: number
  [key: string]: QueryParamValue | undefined
}

export interface ApiResponse<T> {
  isSuccess: boolean
  message: string
  data: T
  errors: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  totalRecords: number
}

export interface ListingsResponse {
  data: Listing[]
  sortingValues: SortingValue[]
  totalRecords: number
}
