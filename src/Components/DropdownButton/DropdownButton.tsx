import "./DropdownButton.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { regions, prices, areas, roomsQuantity } from "../../Data";
import { useState } from "react";
import { deriveNumTag } from "../../Utilities/functions";

const DropdownButton = (props: {
  menuVisible: boolean,
  setMenuVisible: React.Dispatch<React.SetStateAction<"region" | "prices" | "areas" | "roomsQuantity" | "none">>,
  placeholder: string,
  groupName: "region" | "prices" | "areas" | "roomsQuantity",
}) => {
  // Props destructurization
  const { placeholder, groupName, menuVisible, setMenuVisible} = props;

  return ( 
    <div className="fw-bold bg-transparent px-2 py-1 position-relative">
      <div onClick={() => setMenuVisible(prev => prev === groupName ? "none" : groupName)} role="button" className="custom-select px-2 py-1 rounded dropdown-button d-flex align-items-center">
        <button className="fw-bold bg-transparent border-0">{placeholder}</button>
        <MdOutlineKeyboardArrowDown className={`${menuVisible ? "arrow-up" : ""}`} />
      </div>
      {
        menuVisible ?
          <div className="position-absolute start-0 toggle-menu rounded mt-3">
            {
              groupName === "region" ?
              <div className="p-3 mt-3">
                <h2 className="fw-bold mb-3">რეგიონის მიხედვით</h2>
                <div className="d-flex justify-content-between">
                {
                  regions.map((regionQuarter) => {
                    return ( 
                      <div className="d-flex flex-column gap-2">
                        {
                          regionQuarter.map((region) => {
                            return (
                              <label className="check-button fw-normal d-flex align-items-center">
                                <input className="me-2" type="checkbox" name={groupName} key={region} value={region} />
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
                <div className="d-flex w-100 gap-3 filter-input">
                  <div>
                    <div className="filter-input-container position-relative d-flex align-items-center">
                      <input className="rounded px-2" placeholder="დან" type="text" />
                      <small className="position-absolute end-0 me-2 fw-normal">₾</small>
                    </div>
                    <div className="my-4">
                      <h3 className="mb-4">მინ. ფასი</h3>
  
                      {
                        prices.map((price) => <span key={price} className="d-block fw-normal mt-2">{deriveNumTag(price, "₾")}</span>)
                      }
  
                    </div>
                  </div>
                  <div>
                    <div className="filter-input-container position-relative d-flex align-items-center">
                      <input className="rounded px-2" placeholder="მდე" type="text" />
                      <small className="position-absolute end-0 me-2 fw-normal">₾</small>
                    </div>
                    <div className="my-4">
                      <h3 className="mb-4">მაქს. ფასი</h3>
  
                      {
                        prices.map((price) => <span key={price} className="d-block fw-normal mt-2">{deriveNumTag(price, "₾")}</span>)
                      }
  
                    </div>
                  </div>
                </div>
              </div>
            : groupName === "areas" ?
              <div className="p-3">
                <h2 className="fw-bold mb-3">ფართობის მიხედვით</h2>
  
                <div className="d-flex w-100 gap-3 filter-input">
                  <div>
                    <div className="filter-input-container position-relative d-flex align-items-center">
                      <input className="rounded px-2" placeholder="დან" type="text" />
                      <small className="position-absolute end-0 me-2 fw-normal">მ<sup>2</sup></small>
                    </div>
                    <div className="mt-4 mb-3">
                      <h3 className="mb-4">მინ. მ<sup>2</sup></h3>
  
                      {
                        areas.map((area) => <span key={area} className="d-block fw-normal mt-2">{deriveNumTag(area, "მ")}<sup>2</sup></span>)
                      }
  
                    </div>
                  </div>
                  <div>
                    <div className="filter-input-container position-relative d-flex align-items-center">
                      <input className="rounded px-2" placeholder="მდე" type="text" />
                      <small className="position-absolute end-0 me-2 fw-normal">მ<sup>2</sup></small>
                    </div>
                    <div className="mt-4 mb-3">
                      <h3 className="mb-4">მაქს. მ<sup>2</sup></h3>
  
                      {
                        areas.map((area) => <span key={area} className="d-block fw-normal mt-2">{deriveNumTag(area, "მ")}<sup>2</sup></span>)
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
                  roomsQuantity.map((quantity) => <div className="select-button rounded px-4 py-3"><span>{quantity}</span></div>)
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