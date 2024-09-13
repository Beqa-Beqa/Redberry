import "./DropdownContainer.css";
import { DropdownButton } from "../../Components";
import { useState } from "react";

const DropdownContainer = () => {
  const [filterToggled, setFilterToggled] = useState<"region" | "prices" | "areas" | "roomsQuantity" | "none">("none");

  return (
    <section className="dropdown-container d-flex align-items-center gap-3 rounded">
      <DropdownButton setMenuVisible={setFilterToggled} menuVisible={filterToggled === "region"} groupName="region" placeholder="რეგიონი" />
      <DropdownButton setMenuVisible={setFilterToggled} menuVisible={filterToggled === "prices"} groupName="prices" placeholder="საფასო კატეგორია" />
      <DropdownButton setMenuVisible={setFilterToggled} menuVisible={filterToggled === "areas"} groupName="areas" placeholder="ფართობი" />
      <DropdownButton setMenuVisible={setFilterToggled} menuVisible={filterToggled === "roomsQuantity"} groupName="roomsQuantity" placeholder ="საძინებლების რაოდენობა" />
    </section>
  );
}
 
export default DropdownContainer;