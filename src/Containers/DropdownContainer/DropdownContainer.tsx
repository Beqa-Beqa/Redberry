import "./DropdownContainer.css";
import { DropdownButton, FilterButton } from "../../Components";
import { useContext, useState } from "react";
import { FilterContext } from "../../Contexts/FilterContext";
import { handlePriceOrAreaStateChange, handleRegionStateChange, handleRoomsQuantitySelect } from "../../Utilities/filterFunctions";

const DropdownContainer = (props: {
  className?: string
}) => {
  // Filter values
  const { regions, priceRange, areaRange, roomsQuantity, setRegions, setPriceRange, setAreaRange, setRoomsQuantity } = useContext(FilterContext);

  // Filter toggle state
  const [filterToggled, setFilterToggled] = useState<"region" | "prices" | "areas" | "roomsQuantity" | "none">("none");

  // Input value error states
  const [isPriceError, setIsPriceError] = useState<boolean>(false);
  const [isAreaError, setIsAreaError] = useState<boolean>(false);

  // Clear filters alltogether
  const clearFilters = () => {
    handleRegionStateChange(setRegions, []);
    handlePriceOrAreaStateChange(setPriceRange, { start: 0, end: Infinity }, "price");
    handlePriceOrAreaStateChange(setAreaRange, { start: 0, end: Infinity }, "area");
    handleRoomsQuantitySelect(setRoomsQuantity, 0);
  }

  const isRegionFilter = regions.length;
  const isPriceRangeFilter = (priceRange.start > 0 && priceRange.start !== null) || (priceRange.end !== Infinity && priceRange.end !== null);
  const isAreaRangeFilter = (areaRange.start > 0 && areaRange.start !== null) || (areaRange.end !== Infinity && priceRange.end !== null);
  const isRoomsQuantityFilter = roomsQuantity > 0 && roomsQuantity !== null;

  return (
    <section className={`${props.className ? props.className : ""}`}>
      <div className="dropdown-container d-flex flex-grow-0 align-items-center gap-3 rounded">
        <DropdownButton
          setMenuVisible={setFilterToggled}
          menuVisible={filterToggled === "region"}
          groupName="region"
          placeholder="რეგიონი"
        />
        <DropdownButton
          setMenuVisible={setFilterToggled}
          menuVisible={filterToggled === "prices"}
          groupName="prices"
          placeholder="საფასო კატეგორია"
          isError={isPriceError}
          setIsError={setIsPriceError}
        />
        <DropdownButton
          setMenuVisible={setFilterToggled}
          menuVisible={filterToggled === "areas"}
          groupName="areas"
          placeholder="ფართობი"
          isError={isAreaError}
          setIsError={setIsAreaError}
        />
        <DropdownButton
          setMenuVisible={setFilterToggled}
          menuVisible={filterToggled === "roomsQuantity"}
          groupName="roomsQuantity"
          placeholder="საძინებლების რაოდენობა"
        />
      </div>
      <div className="mt-3 d-flex flex-wrap flex-grow-0 align-items-center gap-2">
        {/* Has to be edited */}
        {isRegionFilter ?
          <FilterButton values={{ regions, setRegions }} /> 
        : null}
        {/* ------------------ */}
        {isPriceRangeFilter ? <FilterButton values={{ priceRange, setPriceRange }} /> : null}
        {isAreaRangeFilter ? <FilterButton values={{ areaRange, setAreaRange}} /> : null}
        {isRoomsQuantityFilter ? <FilterButton values={{ roomsQuantity, setRoomsQuantity }} /> : null}

        {isRegionFilter || isPriceRangeFilter || isAreaRangeFilter || isRoomsQuantityFilter ?
          <span role="button" onClick={clearFilters} className="fw-bold text-subtext ms-1">გასუფთავება</span> 
        :
          <div style={{height: 25.6}} />
        }
      </div>
    </section>
  );
};

export default DropdownContainer;
