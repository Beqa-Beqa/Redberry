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

  // Properties to list on main page
  const sortedProperties = (() => {
    const satisfiesFilter = (property: Property) => {
      // Flags
      const hasRegionFilter = regions.length > 0;
      const hasPriceFilter = priceRange.start > 0 || priceRange.end !== Infinity;
      const hasAreaFilter = areaRange.start > 0 || areaRange.end !== Infinity;
      const hasRoomsFilter = roomsQuantity > 0;

      // Ranges
      const inRegionRange = !regions.length || regions.includes(property.city.region.name);
      const inPriceRange = priceRange.start <= property.price && priceRange.end >= property.price;
      const inAreaRange = areaRange.start <= property.area && areaRange.end >= property.area;
      const inRoomsRange = roomsQuantity !== 0 && roomsQuantity === property.bedrooms;

      // Weird filter as requested
      if(!hasRegionFilter) {

        if(!hasPriceFilter && !hasAreaFilter && !hasRoomsFilter) return true;
        else return (hasPriceFilter && inPriceRange) || (hasAreaFilter && inAreaRange) || (hasRoomsFilter && inRoomsRange);
        
      } else {
        return (hasRegionFilter && inRegionRange) || (hasPriceFilter && inPriceRange) || (hasAreaFilter && inAreaRange) || (hasRoomsFilter && inRoomsRange);
      }
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
    scrollTo({ left: 0, top: 0, behavior: "instant" });
  }

  return (
    <main className={`${className ? className : ""} w-100 gap-3`}>
      <div className="container-fluid mx-0 px-0 w-100">
        <div className="row w-100">
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
                      imageURL: property.image,
                      city: property.city
                    }}
                    className="w-25"
                  />
                )
              })
            : 
              <p className="mt-4 py-2">აღნიშნული მონაცემებით განცხადება არ იძებნება</p>
          }
        </div>
      </div>
    </main>
  );
}
 
export default MainSection;