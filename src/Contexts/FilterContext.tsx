import { createContext, useState } from "react";

export const FilterContext = createContext<PropertyFiltersContext>({
  regions: [],
  priceRange: { start: 0, end: Infinity },
  areaRange: { start: 0, end: Infinity },
  roomsQuantity: 0,
  setRegions: () => {},
  setPriceRange: () => {},
  setAreaRange: () => {},
  setRoomsQuantity: () => {}
});

const FilterContextProvider = (props: { children: React.ReactNode }) => {
  // Filter saved in sessionStorage
  const regionsFilter = JSON.parse(sessionStorage.getItem("regionsFilter") || "[]");
  const pricesFilter = JSON.parse(sessionStorage.getItem("pricesFilter") || "{}");
  const areasFilter = JSON.parse(sessionStorage.getItem("areasFilter") || "{}");
  const roomsQuantityFilter = parseInt(sessionStorage.getItem("roomsQuantityFilter") || "0");

  // Filter value states
  const [regions, setRegions] = useState<string[]>(regionsFilter);
  const [priceRange, setPriceRange] = useState<{ start: number, end: number }>(pricesFilter);
  const [areaRange, setAreaRange] = useState<{ start: number, end: number }>(areasFilter);
  const [roomsQuantity, setRoomsQuantity] = useState<number>(roomsQuantityFilter);

  return (
    <FilterContext.Provider 
      value={{ 
        regions, 
        priceRange, 
        areaRange, 
        roomsQuantity, 
        setRegions, 
        setPriceRange, 
        setAreaRange, 
        setRoomsQuantity 
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;