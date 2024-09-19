import { PropertyCard } from "../../Components";
import "./MainSection.css";
import { useContext } from "react";
import { RealEstateContext } from "../../Contexts/RealEstateContext";
import { FilterContext } from "../../Contexts/FilterContext";
import { changeCurrentProperty, changePage, makeRequest } from "../../Utilities/functions";
import { PageContext } from "../../Contexts/PageContext";

const MainSection = (props: {
  className?: string
}) => {
  const { className } = props;

  // Context values
  // Properties
  const { properties, setCurrentProperty, currentProperty } = useContext(RealEstateContext);
  // Filter
  const { regions, priceRange, areaRange, roomsQuantity } = useContext(FilterContext);
  // Page
  const { setCurrentPage } = useContext(PageContext);

  const sortedProperties = (() => {
    const satisfiesFilter = (property: Property) => {
      const inRegionRange = !regions.length || regions.includes(property.city.region.name);

      const inPriceRange = priceRange.start <= property.price && priceRange.end >= property.price;

      const inAreaRange = areaRange.start <= property.area && areaRange.end >= property.area;

      const inRoomsRange = !roomsQuantity || roomsQuantity === property.bedrooms;

      return inRegionRange && inPriceRange && inAreaRange && inRoomsRange;
    }

    return properties.filter(satisfiesFilter);
  })();

  const handlePropertyCardClick = async (property: Property) => {
    if(currentProperty?.id !== property.id) {
      try {
        const result = await makeRequest("GET", `real-estates/${property.id}`, true);
        changeCurrentProperty(setCurrentProperty, result);
      } catch (err) {
        console.log(err);
      }
    }

    changePage(setCurrentPage, "house");
  }

  return (
    <main className={`${className ? className : ""} d-flex flex-wrap w-100 gap-3`}>
      <div className="container mx-0 px-0 w-100">
        <div className="row">
          {
            sortedProperties.length ?
              sortedProperties.map((property) => {
                return (
                  <PropertyCard
                    key={property.id}
                    data={{
                      onClick: () => handlePropertyCardClick(property),
                      type: property.is_rental === 1 ? "rent" : "sell",
                      price: property.price,
                      area: property.area,
                      address: property.address,
                      roomsQuantity: property.bedrooms,
                      zipCode: property.zip_code,
                      imageURL: property.image
                    }}
                    className="w-25"
                  />
                )
              })
            : null
          }
        </div>
      </div>
    </main>
  );
}
 
export default MainSection;