import { useContext, useRef } from "react";
import "../DropdownButtons.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FilterContext } from "../../../Contexts/FilterContext";
import { handlePriceOrAreaInputValueChange, handlePriceOrAreaSelect } from "../../../Utilities/filterFunctions";
import { deriveNumTag } from "../../../Utilities/functions";
import { pricesData, areasData } from "../../../Data";
import { useOutsideClick } from "../../../Hooks";
import Button from "../../Button/Button";

const PriceOrAreaSelect = (props: {
  groupName: "prices" | "areas",
  menuVisible: boolean,
  setMenuVisible: React.Dispatch<React.SetStateAction<"region" | "prices" | "areas" | "roomsQuantity" | "none">>,
  placeholder: string,
  isError: boolean
  setIsError: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  // Props
  const { groupName, menuVisible, setMenuVisible, placeholder, isError, setIsError } = props;

  // Context
  const { priceRange, setPriceRange, areaRange, setAreaRange } = useContext(FilterContext);
  
  // Menu ref
  const menuRef = useRef<HTMLDivElement | null>(null);

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
          groupName === "prices" ?
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
                        onClick={() => handlePriceOrAreaSelect(setPriceRange, { start: price }, "price", setIsError)}
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
                        onClick={() => handlePriceOrAreaSelect(setPriceRange, { end: price }, "price", setIsError)}
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
                          onClick={() => handlePriceOrAreaSelect(setAreaRange, { start: area }, "area", setIsError)}
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
                          onClick={() => handlePriceOrAreaSelect(setAreaRange, { end: area }, "area", setIsError)}
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
          : null
        }
          <div className="my-3 w-100 d-flex justify-content-end pe-4">
            <Button onClick={() => setMenuVisible("none")} text="არჩევა" type="filled" noIcon />
          </div>
        </div>
        : 
          null
      }
    </div>
  );
}
 
export default PriceOrAreaSelect;