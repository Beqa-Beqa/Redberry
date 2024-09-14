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
  // Filter value states
  const [regions, setRegions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ start: number, end: number }>({ start: 0, end: Infinity });
  const [areaRange, setAreaRange] = useState<{ start: number, end: number }>({ start: 0, end: Infinity });
  const [roomsQuantity, setRoomsQuantity] = useState<number>(0);

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