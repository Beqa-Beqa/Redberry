import { PropertyCard } from "../../Components";
import "./MainSection.css";
import { ImageSample } from "../../Assets";

const MainSection = (props: {
  className?: string
}) => {
  const { className } = props;

  return (
    <main className={`${className ? className : ""} d-flex flex-wrap w-100 justify-content-between`}>
      <PropertyCard
        type="rent"
        price={80000}
        area={80}
        address="asdads"
        roomsQuantity={2}
        zipCode="2020"
        imageURL={ImageSample}
      />
    </main>
  );
}
 
export default MainSection;