import { PropertyCard } from "../../Components";
import "./MainSection.css";
import { useContext } from "react";
import { RealEstateContext } from "../../Contexts/RealEstateContext";
import { FilterContext } from "../../Contexts/FilterContext";

const MainSection = (props: {
  className?: string
}) => {
  const { className } = props;

  // Context values
  // Properties
  const { properties } = useContext(RealEstateContext);
  // Filter
  const { regions, priceRange, areaRange, roomsQuantity } = useContext(FilterContext);

  const sortedProperties = (() => {
    const satisfiesFilter = (property: Property) => {
      const inRegionRange = !regions.length || regions.includes(property.city.region.name);

      const inPriceRange = priceRange.start <= property.price && priceRange.end >= property.price;

      const inAreaRange = areaRange.start <= property.area && areaRange.end >= property.area;

      const inRoomsRange = !roomsQuantity || roomsQuantity === property.bedrooms;

      return inRegionRange && inPriceRange && inAreaRange && inRoomsRange;
    }

    const filteredProperties = properties.filter(satisfiesFilter);

    let tempArray: Property[] = [];
    return filteredProperties.reduce((dataArray: Property[][], property: Property, index: number) => {
      tempArray.push(property);

      if((index + 1) % 4 === 0) {
        dataArray.push(tempArray);
        tempArray = [];
      }

      if((index + 1) === filteredProperties.length && JSON.stringify(tempArray) !== "[]") dataArray.push(tempArray);

      return dataArray;
    }, []);
  })();

  return (
    <main className={`${className ? className : ""} d-flex flex-wrap w-100 gap-3`}>
      {
        sortedProperties && sortedProperties.length ?
          sortedProperties.map((propertyChunk, index) => {
            return <div className="d-flex w-100 align-items-center gap-4" key={index}>
              {
                propertyChunk.map((property, index) => {

                  return (
                    <PropertyCard
                      key={index}
                      type={property.is_rental === 1 ? "rent" : "sell"}
                      price={property.price}
                      area={property.area}
                      address={property.address}
                      roomsQuantity={property.bedrooms}
                      zipCode={property.zip_code}
                      imageURL={property.image}
                    />
                  )
                })
              }
            </div>
          })
        : null
      }
    </main>
  );
}
 
export default MainSection;