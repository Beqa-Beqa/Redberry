import "./DropdownButton.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { pricesData, areasData, roomsQuantityData } from "../../Data";
import { deriveNumTag } from "../../Utilities/functions";
import { useContext, useRef } from "react";
import { FilterContext } from "../../Contexts/FilterContext";
import { handlePriceOrAreaInputValueChange, handlePriceOrAreaSelect, handleRegionSelect, handleRoomsQuantitySelect } from "../../Utilities/filterFunctions";
import { useOutsideClick } from "../../Hooks";
import { GeneralContext } from "../../Contexts/GeneralContext";

const DropdownButton = (props: {
  menuVisible: boolean,
  setMenuVisible: React.Dispatch<React.SetStateAction<"region" | "prices" | "areas" | "roomsQuantity" | "none">>,
  placeholder: string,
  groupName: "region" | "prices" | "areas" | "roomsQuantity",
  isError?: boolean
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  // Props destructurization
  const { placeholder, groupName, menuVisible, setMenuVisible, isError, setIsError } = props;

  // FilterContext states for filter updates
  const { regions, setRegions, priceRange, setPriceRange, areaRange, setAreaRange, roomsQuantity, setRoomsQuantity } = useContext(FilterContext);
  const { regionsArray } = useContext(GeneralContext);
  const regionsData: Region[][] = (() => {
    let tempArray: Region[] = [];
    return regionsArray.reduce((dataArray: Region[][], region: Region, index: number) => {
      tempArray.push(region);

      if((index + 1) % 4 === 0) {
        dataArray.push(tempArray);
        tempArray = [];
      }

      if((index + 1) === regionsArray.length && JSON.stringify(tempArray) !== "[]") dataArray.push(tempArray);

      return dataArray;
    }, [])
  })();

  // Reference to dropdown menu
  const menuRef = useRef(null);

  // Close menu on outside click
  useOutsideClick(menuRef, () => setMenuVisible("none"));

  return ( 
    <div className="fw-bold bg-transparent px-2 py-1 position-relative">
      <div onClick={() => setMenuVisible(prev => prev === groupName ? "none" : groupName)} role="button" className="custom-select px-2 py-1 rounded dropdown-button d-flex align-items-center">
        <button className="fw-bold bg-transparent border-0">{placeholder}</button>
        <MdOutlineKeyboardArrowDown className={`${menuVisible ? "arrow-up" : ""}`} />
      </div>

      {/* Dropdown button menu */}

      {
        menuVisible ?
          <div ref={menuRef} className="position-absolute start-0 toggle-menu border-thin rounded mt-3">
            {
              groupName === "region" ?
              <div className="p-3 mt-3">
                <h2 className="fw-bold mb-3">რეგიონის მიხედვით</h2>
                <div className="d-flex justify-content-between">
                {
                  regionsData.map((regionQuarter, index) => {
                    return ( 
                      <div key={index} className="d-flex flex-column gap-2">
                        {
                          regionQuarter.map((region) => {
                            return (
                              <label key={region.id} className="check-button fw-normal d-flex align-items-center">
                                <input
                                  checked={regions.includes(region.name)}
                                  onChange={() => handleRegionSelect(setRegions, region.name)} 
                                  className="me-2" 
                                  type="checkbox" 
                                  name={groupName} 
                                  value={region.name} 
                                />
                                {region.name}
                              </label>
                            );
                          })
                        }
                      </div>
                    )
  
                  })
                }
                </div>
              </div>
            : groupName === "prices" ?
              <div className="p-3">
                <h2 className="fw-bold mb-3">ფასის მიხედვით</h2>

                {/* Price custom value inputs */}

                <div className="d-flex flex-column gap-2 w-100">
                  <div className="d-flex gap-3">
                    <div className="filter-input-container position-relative d-flex align-items-center">


                      <input 
                        value={priceRange.start > 0 && priceRange.start !== null ? priceRange.start : ""}
                        onChange={(e) => handlePriceOrAreaInputValueChange(e, "start", setPriceRange, "price", setIsError)}
                        className={`${isError ? "border-error" : ""} rounded px-2 filter-input-field`} 
                        placeholder="დან" 
                        type="text" 
                      />

                      <small className="position-absolute end-0 me-2 fw-normal">₾</small>
                    </div>
                    

                    <div className="filter-input-container position-relative d-flex align-items-center">

                      <input 
                        value={priceRange.end !== Infinity && priceRange.end !== null ? priceRange.end : ""}
                        onChange={(e) => handlePriceOrAreaInputValueChange(e, "end", setPriceRange, "price", setIsError)}
                        className={`${isError ? "border-error" : ""} rounded px-2 filter-input-field`}
                        placeholder="მდე" 
                        type="text" 
                      />

                      <small className="position-absolute end-0 me-2 fw-normal">₾</small>
                    </div>


                  </div>

                  {/* Input validation error message */}

                  {isError && <span className="text-error fw-normal text-subtext">ჩაწერეთ ვალიდური მონაცემები</span>}

                  {/* Price predefined value buttons */}

                  <div className="d-flex gap-3 mt-3">


                    <div className="w-50">
                      <h3 className="mb-4">მინ. ფასი</h3>

                      {
                        pricesData.map((price: number) => <button 
                          key={price} 
                          value={price}
                          onClick={() => handlePriceOrAreaSelect(setPriceRange, { start: price }, "price")}
                          className="d-block bg-transparent border-0 fw-normal mt-2">
                            {deriveNumTag(price, "₾")}
                          </button>
                        )
                      }

                    </div>


                    <div className="w-50">
                      <h3 className="mb-4">მაქს. ფასი</h3>
  
                      {
                        pricesData.map((price: number) => <button 
                          key={price} 
                          value={price}
                          onClick={() => handlePriceOrAreaSelect(setPriceRange, { end: price }, "price")}
                          className="d-block bg-transparent border-0 fw-normal mt-2">
                            {deriveNumTag(price, "₾")}
                          </button>
                        )
                      }
  
                    </div>


                  </div>
                </div>
              </div>
            : groupName === "areas" ?
              <div className="p-3">
                <h2 className="fw-bold mb-3">ფართობის მიხედვით</h2>
  
                {/* Area custom value inputs */}

                <div className="d-flex flex-column w-100 gap-2">
                  <div className="d-flex gap-3">
                    <div className="filter-input-container position-relative d-flex align-items-center">
                      <input 
                        value={areaRange.start > 0 && areaRange.start !== null ? areaRange.start : ""}
                        onChange={(e) => handlePriceOrAreaInputValueChange(e, "start", setAreaRange, "area", setIsError)}
                        className={`${isError ? "border-error" : ""} rounded px-2 filter-input-field`} 
                        placeholder="დან" 
                        type="text" 
                      />
                      <small className="position-absolute end-0 me-2 fw-normal">მ<sup>2</sup></small>
                    </div>
                    <div className="filter-input-container position-relative d-flex align-items-center">
                      <input 
                        value={areaRange.end !== Infinity && areaRange.end !== null ? areaRange.end : ""} 
                        onChange={(e) => handlePriceOrAreaInputValueChange(e, "end", setAreaRange, "area", setIsError)}
                        className={`${isError ? "border-error" : ""} rounded px-2 filter-input-field`} 
                        placeholder="მდე" 
                        type="text" 
                      />
                      <small className="position-absolute end-0 me-2 fw-normal">მ<sup>2</sup></small>
                    </div>
                  </div>

                  {/* Input validation error message */}

                  {isError && <span className="text-error fw-normal text-subtext">ჩაწერეთ ვალიდური მონაცემები</span>}

                  {/* Area predefined value buttons */}

                  <div className="d-flex gap-3 mt-3">
                    <div className="w-50">
                      <h3 className="mb-4">მინ. მ<sup>2</sup></h3>
  
                      {
                        areasData.map((area: number) => <button 
                            key={area} 
                            className="d-block bg-transparent border-0 fw-normal mt-2"
                            onClick={() => handlePriceOrAreaSelect(setAreaRange, { start: area }, "area")}
                          >
                            {deriveNumTag(area, "მ")}
                            <sup>2</sup>
                          </button>
                        )
                      }
                    </div>
                    
                    <div className="w-50">
                      <h3 className="mb-4">მაქს. მ<sup>2</sup></h3>
  
                      {
                        areasData.map((area: number) => <button 
                            key={area} 
                            className="d-block bg-transparent border-0 fw-normal mt-2"
                            onClick={() => handlePriceOrAreaSelect(setAreaRange, { end: area }, "area")}
                          >
                            {deriveNumTag(area, "მ")}
                            <sup>2</sup>
                          </button>
                        )
                      }
  
                    </div>
                  </div>
                </div>
  
              </div>
            : groupName === "roomsQuantity" ?
              <div className="p-3">
                <h2 className="fw-bold mb-3">საძინებლების რაოდენობა</h2>
                
                <div className="d-flex gap-2">
                {
                  roomsQuantityData.map((quantity: number) => (
                      <div 
                        key={quantity} 
                        role="button" 
                        className={`${roomsQuantity === quantity ? "selected" : ""} select-button rounded px-4 py-3`}
                        onClick={() => handleRoomsQuantitySelect(setRoomsQuantity, quantity)}
                      >
                          <span>{quantity}</span>
                      </div>
                    )
                  )
                }
                </div>
  
              </div>
            : 
              null
            }
            <div className="w-100 d-flex justify-content-end pe-4">
              <button onClick={() => setMenuVisible("none")} className="btn-primary rounded border-0 px-3 py-2 mb-4 mt-2">არჩევა</button>
            </div>
          </div>
        : null
      }
    </div>
  );
}
 
export default DropdownButton;