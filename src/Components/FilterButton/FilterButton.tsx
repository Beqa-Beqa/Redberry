import { handlePriceOrAreaStateChange, handleRegionStateChange, handleRoomsQuantitySelect } from "../../Utilities/filterFunctions";
import "./FilterButton.css"
import { MdClose } from "react-icons/md";

const FilterButton = (props: {
  values: PropertyFiltersContextArguments
}) => {
  // Value passed to component
  const { regions, priceRange, areaRange, roomsQuantity, setRegions, setPriceRange, setAreaRange, setRoomsQuantity } = props.values;

  // Close button click handler
  const handleFilterClear = (customVal?: any) => {
    if (regions) {
      const valToSet = customVal ? [...regions].filter((region) => region !== customVal) : [];
      handleRegionStateChange(setRegions!, valToSet);
    }
    else if (priceRange) {
      const valToSet = customVal ? {...priceRange, ...customVal} : { start: 0, end: Infinity };
      handlePriceOrAreaStateChange(setPriceRange!, valToSet, "price");
    }
    else if (areaRange) {
      const valToSet = customVal ? {...areaRange, ...customVal} : { start: 0, end: Infinity };
      handlePriceOrAreaStateChange(setAreaRange!, valToSet, "area");
    }
    else if (roomsQuantity) {
      const valToSet = customVal ? customVal : 0;
      handleRoomsQuantitySelect(setRoomsQuantity!, valToSet);
    }
  }

  return regions ?
    regions.map((region) => {
      return (
        <div key={region} className="d-flex align-items-center gap-2 rounded-5 px-2 py-1 border-thin"> 
          <span key={region} className="text-placeholder">{region}</span>
          <MdClose onClick={() => handleFilterClear(region)} role="button" />
        </div>
      )
    })

  : 
    <div className="d-flex align-items-center gap-2 rounded-5 px-2 py-1 border-thin"> 
      
      { 
        priceRange ?

          <span className="text-placeholder">
            {priceRange.start} ₾ - {priceRange.end !== Infinity ? priceRange.end : ""} ₾
          </span>

        : areaRange ?

          <span className="text-placeholder">
            {areaRange.start} მ<sup>2</sup> - {areaRange.end !== Infinity ? areaRange.end : ""} მ<sup>2</sup>
          </span>

        : roomsQuantity ? 
          <span className="text-placeholder">{roomsQuantity} ოთახი</span>
        : null
      }

      <MdClose onClick={() => handleFilterClear()} role="button" />
    </div>
}
 
export default FilterButton;