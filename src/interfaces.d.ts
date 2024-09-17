declare interface PropertyFilters {
  regions: string[],
  priceRange: {
    start: number,
    end: number
  },
  areaRange: {
    start: number,
    end: number
  }
  roomsQuantity: number
}

declare interface PropertyFilterArguments {
  regions?: string[],
  priceRange?: {
    start: number,
    end: number
  },
  areaRange?: {
    start: number,
    end: number
  }
  roomsQuantity?: number
}

declare interface PropertyFiltersContext extends PropertyFilters {
  setRegions: React.Dispatch<React.SetStateAction<string[]>>,
  setPriceRange: React.Dispatch<React.SetStateAction<{
    start: number;
    end: number;
  }>>,
  setAreaRange: React.Dispatch<React.SetStateAction<{
    start: number;
    end: number;
  }>>,
  setRoomsQuantity: React.Dispatch<React.SetStateAction<number>>
}

declare interface PropertyFiltersContextArguments extends PropertyFilterArguments {
  setRegions?: React.Dispatch<React.SetStateAction<string[]>>,
  setPriceRange?: React.Dispatch<React.SetStateAction<{
    start: number;
    end: number;
  }>>,
  setAreaRange?: React.Dispatch<React.SetStateAction<{
    start: number;
    end: number;
  }>>,
  setRoomsQuantity?: React.Dispatch<React.SetStateAction<number>>
}

declare interface Region {
  id: number,
  name: string
}

declare interface City {
  id: number,
  name: string,
  region_id: number,
  region: Region
}

declare interface Agent {
  id: number,
  name: string,
  surname: string,
  avatar: string
}

declare interface GlobalContext {
  regionsArray: Region[],
  citiesArray: City[]
}

declare interface PropertyCard {
  type: "sell" | "rent",
  price: number,
  address: string,
  area: number,
  roomsQuantity: number,
  imageURL: any,
  zipCode: string
}

declare interface Property {
  id: number,
  address: string,
  zip_code: string,
  price: number,
  area: number,
  bedrooms: number,
  is_rental: 0 | 1,
  image: string,
  city_id: number,
  city: City
}

declare interface RealEstatePostRequestBody {
  address: string,
  region_id: number,
  description: string,
  city_id: number,
  zip_code: string,
  price: number,
  area: number,
  bedrooms: number,
  is_rental: 0 | 1,
  agent_id: number,
  image: any
}

declare interface AgentPostRequestBody {
  name: string,
  surname: string,
  email: string,
  phone: string,
  avatar: File | null
}

declare interface PageContext {
  currentPage: Page,
  setCurrentPage: React.Dispatch<React.SetStateAction<Page>>,
  isToggledAddAgent: boolean,
  setIsToggledAddAgent: React.Dispatch<React.SetStateAction<boolean>>
}

declare type Page = "" | "add-listing-page";