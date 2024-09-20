import { useContext, useRef } from "react";
import "../DropdownButtons.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useOutsideClick } from "../../../Hooks";
import { FilterContext } from "../../../Contexts/FilterContext";
import { GeneralContext } from "../../../Contexts/GeneralContext";
import { handleRegionSelect } from "../../../Utilities/filterFunctions";
import Button from "../../Button/Button";

const RegionSelect = (props: {
  placeholder: string,
  menuVisible: boolean,
  setMenuVisible: React.Dispatch<React.SetStateAction<"region" | "prices" | "areas" | "roomsQuantity" | "none">>,
}) => {
  // Props
  const { placeholder, menuVisible, setMenuVisible } = props;

  // Context values
  const { regions, setRegions } = useContext(FilterContext);
  const { regionsArray } = useContext(GeneralContext);

  // Menu ref
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu on outside click
  useOutsideClick(menuRef, () => setMenuVisible("none"));

  return (
    <div className="fw-bold bg-transparent px-2 py-1 position-relative">
      <div onClick={() => setMenuVisible(prev => prev === "region" ? "none" : "region")} role="button" className="custom-select px-2 py-1 rounded dropdown-button d-flex align-items-center">
        <button className="fw-bold bg-transparent border-0">{placeholder}</button>
        <MdOutlineKeyboardArrowDown className={`${menuVisible ? "arrow-up" : ""}`} />
      </div>

      {/* Dropdown button menu */}

      {
        menuVisible ?
          <div ref={menuRef} className="position-absolute start-0 toggle-menu border-thin rounded mt-3">
            <div className="p-3 mt-3">
              <h2 className="fw-bold mb-3">რეგიონის მიხედვით</h2>

              {/* Options */}
              
              <div className="container-fluid">
                <div style={{width: 700}} className="row">
                  {
                    regionsArray.length ?
                      regionsArray.map((region) => {
                        return (
                          <label key={region.id} className="col-4 mt-2 px-0 check-button fw-normal d-flex align-items-center">
                            <input
                              checked={regions.includes(region.name)}
                              onChange={() => handleRegionSelect(setRegions, region.name)} 
                              className="me-2" 
                              type="checkbox" 
                              value={region.name} 
                            />
                            {region.name}
                          </label>
                        );
                      })
                    : null
                  }
                </div>
              </div>
              <div className="mt-4 mb-2 w-100 d-flex justify-content-end pe-4">
                <Button onClick={() => setMenuVisible("none")} text="არჩევა" type="filled" noIcon />
              </div>
            </div>
          </div>
        : 
          null }
    </div>
  );
}
 
export default RegionSelect;