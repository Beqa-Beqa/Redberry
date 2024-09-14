import "./DropdownButton.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { regionsData, pricesData, areasData, roomsQuantityData } from "../../Data";
import { deriveNumTag } from "../../Utilities/functions";
import { useContext } from "react";
import { FilterContext } from "../../Contexts/FilterContext";
import { handlePriceOrAreaInputValueChange, handlePriceOrAreaSelect, handleRegionSelect } from "../../Utilities/filterFunctions";

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
  const {regions, setRegions, priceRange, setPriceRange, areaRange, setAreaRange, setRoomsQuantity } = useContext(FilterContext);

  return ( 
    <div className="fw-bold bg-transparent px-2 py-1 position-relative">
      <div onClick={() => setMenuVisible(prev => prev === groupName ? "none" : groupName)} role="button" className="custom-select px-2 py-1 rounded dropdown-button d-flex align-items-center">
        <button className="fw-bold bg-transparent border-0">{placeholder}</button>
        <MdOutlineKeyboardArrowDown className={`${menuVisible ? "arrow-up" : ""}`} />
      </div>

      {/* Dropdown button menu */}

      {
        menuVisible ?
          <div className="position-absolute start-0 toggle-menu rounded mt-3">
            {
              groupName === "region" ?
              <div className="p-3 mt-3">
                <h2 className="fw-bold mb-3">რეგიონის მიხედვით</h2>
                <div className="d-flex justify-content-between">
                {
                  regionsData.map((regionQuarter, index) => {
                    return ( 
                      <div key={regionQuarter.length + index} className="d-flex flex-column gap-2">
                        {
                          regionQuarter.map((region) => {
                            return (
                              <label className="check-button fw-normal d-flex align-items-center">
                                <input
                                  checked={regions.includes(region)}
                                  onChange={() => handleRegionSelect(setRegions, region)} 
                                  className="me-2" 
                                  type="checkbox" 
                                  name={groupName} 
                                  key={region} 
                                  value={region} 
                                />
                                {region}
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
                        value={priceRange.start > 0 ? priceRange.start : ""}
                        onChange={(e) => handlePriceOrAreaInputValueChange(e, "start", setPriceRange, setIsError)}
                        className={`${isError ? "border-error" : ""} rounded px-2`} 
                        placeholder="დან" 
                        type="text" 
                      />

                      <small className="position-absolute end-0 me-2 fw-normal">₾</small>
                    </div>
                    

                    <div className="filter-input-container position-relative d-flex align-items-center">

                      <input 
                        value={priceRange.end !== Infinity ? priceRange.end : ""}
                        onChange={(e) => handlePriceOrAreaInputValueChange(e, "end", setPriceRange, setIsError)}
                        className={`${isError ? "border-error" : ""} rounded px-2`}
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
                          onClick={() => handlePriceOrAreaSelect(setPriceRange, { start: price })}
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
                          onClick={() => handlePriceOrAreaSelect(setPriceRange, { end: price })}
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
                        value={areaRange.start > 0 ? areaRange.start : ""}
                        onChange={(e) => handlePriceOrAreaInputValueChange(e, "start", setAreaRange, setIsError)}
                        className={`${isError ? "border-error" : ""} rounded px-2`} 
                        placeholder="დან" 
                        type="text" 
                      />
                      <small className="position-absolute end-0 me-2 fw-normal">მ<sup>2</sup></small>
                    </div>
                    <div className="filter-input-container position-relative d-flex align-items-center">
                      <input 
                        value={areaRange.end !== Infinity ? areaRange.end : ""} 
                        onChange={(e) => handlePriceOrAreaInputValueChange(e, "end", setAreaRange, setIsError)}
                        className={`${isError ? "border-error" : ""} rounded px-2`} 
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
                            onClick={() => handlePriceOrAreaSelect(setAreaRange, { start: area })}
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
                            onClick={() => handlePriceOrAreaSelect(setAreaRange, { end: area })}
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
                  roomsQuantityData.map((quantity: number) => <div role="button" className="select-button rounded px-4 py-3"><span>{quantity}</span></div>)
                }
                </div>
  
              </div>
            : 
              null
            }
            <div className="w-100 d-flex justify-content-end pe-4">
              <button className="btn-primary rounded border-0 px-3 py-2 mb-4 mt-2">არჩევა</button>
            </div>
          </div>
        : null
      }
    </div>
  );
}
 
export default DropdownButton;