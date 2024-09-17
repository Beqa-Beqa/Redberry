import { deriveNumTag } from "../../Utilities/functions";
import "./PropertyCard.css";
import { FaLocationDot } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { IoIosExpand } from "react-icons/io";
import { TfiDirection } from "react-icons/tfi";

const PropertyCard = (props: PropertyCard) => {
  return (
    <div role="button" className="property-card-container w-25 d-flex flex-column rounded-4 my-3">
      <div style={{background: `url(${props.imageURL})`}} className="property-card-image-container rounded-top-4">
        <div className="type-tag d-inline-block rounded-4 px-3 py-1 mt-3 ms-4">
          <small className="text-contrast text-subtext text-center d-block user-select-none">
            {props.type === "sell" ? "იყიდება" : "ქირავდება"}
          </small>
        </div>
      </div>
      <div className="w-100 px-4 py-3 text-opaque">
        <h4 className="fw-bold price-tag">{deriveNumTag(props.price, "₾", " ")}</h4>
        <div className="mt-3 d-flex align-items-center gap-1">
          <FaLocationDot className="icon" />
          <span>{props.address}</span>
        </div>
        <div className="d-flex align-items-center gap-4 mt-3">
          <div className="d-flex align-items-center gap-1">
            <IoBed className="icon" />
            <span>{props.roomsQuantity}</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <IoIosExpand className="icon" />
            <span>{props.area} მ<sup>2</sup></span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <TfiDirection className="icon" />
            <span>{props.zipCode ? props.zipCode : "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default PropertyCard;