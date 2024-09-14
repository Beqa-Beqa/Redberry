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