import { useContext, useRef } from "react";
import "../DropdownButtons.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useOutsideClick } from "../../../Hooks";
import { roomsQuantityData } from "../../../Data";
import { FilterContext } from "../../../Contexts/FilterContext";
import { handleRoomsQuantitySelect } from "../../../Utilities/filterFunctions";
import Button from "../../Button/Button";

const RoomsSelect = (props: {
  menuVisible: boolean,
  setMenuVisible: React.Dispatch<React.SetStateAction<"region" | "prices" | "areas" | "roomsQuantity" | "none">>,
  placeholder: string
}) => {
  // Props
  const { menuVisible, setMenuVisible, placeholder } = props;

  // Context
  const { roomsQuantity, setRoomsQuantity } = useContext(FilterContext);

  // Menu ref
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu on outside click
  useOutsideClick(menuRef, () => setMenuVisible("none"));

  return (
    <div className="fw-bold bg-transparent px-2 py-1 position-relative">
      <div onClick={() => setMenuVisible(prev => prev === "roomsQuantity" ? "none" : "roomsQuantity")} role="button" className="custom-select px-2 py-1 rounded dropdown-button d-flex align-items-center">
        <button className="fw-bold bg-transparent border-0">{placeholder}</button>
        <MdOutlineKeyboardArrowDown className={`${menuVisible ? "arrow-up" : ""}`} />
      </div>

      {/* Dropdown button menu */}

      {
        menuVisible ?
          <div ref={menuRef} className="position-absolute start-0 toggle-menu border-thin rounded mt-3">
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
 
export default RoomsSelect;