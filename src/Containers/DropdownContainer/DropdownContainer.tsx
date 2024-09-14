import "./DropdownContainer.css";
import { DropdownButton } from "../../Components";
import { useState } from "react";

const DropdownContainer = () => {
  // Filter toggle state
  const [filterToggled, setFilterToggled] = useState<"region" | "prices" | "areas" | "roomsQuantity" | "none">("none");

  // Input value error states
  const [isPriceError, setIsPriceError] = useState<boolean>(false);
  const [isAreaError, setIsAreaError] = useState<boolean>(false);

  return (
    <section className="dropdown-container d-flex align-items-center gap-3 rounded">
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
    </section>
  );
};

export default DropdownContainer;
