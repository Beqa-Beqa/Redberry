import { useContext, useRef, useState } from "react";
import { changePage, deriveNumTag, makeRequest, changeCurrentProperty } from "../../Utilities/functions";
import "./HousePage.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PageContext } from "../../Contexts/PageContext";
import { FaLocationDot } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { IoIosExpand } from "react-icons/io";
import { TfiDirection } from "react-icons/tfi";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import { Button, Loading, PropertyCard } from "../../Components";
import { RealEstateContext } from "../../Contexts/RealEstateContext";
import { MdClose } from "react-icons/md";

const HousePage = (props: {
  data: ResponseProperty,
  className?: string
}) => {
  // Props
  const { data, className } = props;

  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Delete modal state
  const [isModal, setIsModal] = useState<boolean>(false);
  
  // Context
  const { setCurrentPage } = useContext(PageContext);
  const { properties, setCurrentProperty, triggerPropertyFetch } = useContext(RealEstateContext);

  // Properties in same region except the current property which is open
  const propertiesInRegion = properties.filter((property) => property.city.region_id === data.city.region_id && property.id !== data.id);

  // Format date property was created at
  const date = new Date(data.created_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  });

  const handleGoBack = () => changePage(setCurrentPage, "");

  const handleDelete = async () => {
    // Set loading state on
    setIsLoading(true);
    setIsModal(false);

    try {
      await makeRequest('DELETE', `real-estates/${data.id}`, true);
      changePage(setCurrentPage, "");
      setCurrentProperty(undefined);
      triggerPropertyFetch();
    } catch (err) {
      console.log(err);
    }

    // Set loading state off
    setIsLoading(false);
  }

  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleCarouselSlide = (direction: "left" | "right") => {
    if(carouselRef.current) {
      if(direction === "left") carouselRef.current.scrollLeft -= (carouselRef.current.clientWidth / 4);
      else carouselRef.current.scrollLeft += (carouselRef.current.clientWidth / 4);
    };
  }

  const handlePropertyCardClick = async (property: Property) => {
    try {
      const result = await makeRequest("GET", `real-estates/${property.id}`, true);
      changeCurrentProperty(setCurrentProperty, result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <section className={`${className || ""}`}>
        <div className="w-100 mb-4">
          <FaArrowLeft onClick={handleGoBack} role="button" style={{width: 25, height: 25}} />
        </div>

        {/* House details */}

        <div className="d-flex align-items-center w-100 gap-5">
          <div className="w-100 position-relative text-end">
            <img className=" w-100 rounded-top-4" src={data.image} alt="house" />
            <span className="type-tag rounded-4 position-absolute start-0 top-0 mt-4 ms-4 px-3 py-1 text-contrast">{data.is_rental === 1 ? "ქირავდება" : "იყიდება"}</span>
            <small className="text-placeholder d-inline-block mt-2">გამოქვეყნების თარიღი {date}</small>
          </div>
          <div className="w-100">
            <h2 className="fw-bold fs-2 mb-4">{deriveNumTag(data.price, "₾", ", ")}</h2>
            <span className="text-placeholder mb-3 d-block">
              <FaLocationDot className="icon" /> 
              <small className="ms-1">{data.address}</small>
            </span>
            <span className="text-placeholder mb-3 d-block">
              <IoIosExpand className="icon" /> 
              <small className="ms-1">ფართ {data.area}</small>
            </span>
            <span className="text-placeholder mb-3 d-block">
              <IoBed className="icon" /> 
              <small className="ms-1">საძინებელი {data.bedrooms}</small>
            </span>
            <span className="text-placeholder mb-3 d-block">
              <TfiDirection className="icon" /> 
              <small className="ms-1">საფოსტო ინდექსი {data.zip_code}</small>
            </span>
            <p className="my-5 text-placeholder lh-sm">
              {data.description}
            </p>

            {/* Agent */}

            <div className="agent-details-container rounded-2 p-4 mb-4">

              <div className="d-flex align-items-center gap-3">
                <img style={{width: 72, height: 72}} src={data.agent.avatar} className="rounded-circle" alt="agent" />
                <div>
                  <span className="text-dark d-block mb-2">{data.agent.name} {data.agent.surname}</span>
                  <small className="text-placeholder d-block text-subtext">აგენტი</small>
                </div>
              </div>

              <div className="text-placeholder">
                <span className="d-block mb-2 mt-4">
                  <FiMail className="me-1" />
                  {data.agent.email}
                </span>
                <span className="d-block">
                  <FiPhoneCall className="me-1" />
                  {deriveNumTag(data.agent.phone, "", " ")}
                </span>
              </div>

            </div>

            <Button onClick={() => setIsModal(true)} text="ლისტინგის წაშლა" type="secondary" noIcon />
          </div>
        </div>

        {/* Suggestions */}

        {
          propertiesInRegion.length ?
            <div className="my-5">
              <h2 className="text-dark fs-2">ბინები მსგავს ლოკაციაზე</h2>

              <div className="w-100 position-relative">
                {/* Left arrow */}
                <div style={{left: -35, zIndex: 900}} className="position-absolute h-100 d-flex align-items-center">
                  <FaArrowLeft onClick={() => handleCarouselSlide("left")} className="icon-big" role="button" />
                </div>

                {/* Flats */}

                <div className="mt-4 w-100 container-fluid mx-0 px-0">
                  <div ref={carouselRef} className="custom-carousel row flex-nowrap overflow-hidden">
                    {
                      propertiesInRegion.map((property) => {
                        return (
                          <div key={property.id} className="col-3">
                            <PropertyCard
                              data={{
                                type: property.is_rental === 1 ? "rent" : "sell",
                                address: property.address,
                                area: property.area,
                                price: property.price,
                                imageURL: property.image,
                                roomsQuantity: property.bedrooms,
                                zipCode: property.zip_code,
                                onClick: () => handlePropertyCardClick(property)
                              }}
                              className="w-100"
                            />
                          </div>
                        )
                      })
                    }
                  </div>

                  {/* Right arrow */}
                  <div style={{right: -30, zIndex: 900}} className="position-absolute top-0 h-100 d-flex align-items-center">
                    <FaArrowRight onClick={() => handleCarouselSlide("right")} className="icon-big" role="button" />
                  </div>
                </div>
              </div>
            </div>
          : null
        }      
      </section>

      {/* Delete modal and loading state */}

      { isModal ?
        <div className="custom-modal position-fixed start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center">
          <div style={{maxWidth: 630}} className="w-100 bg-contrast rounded-4 px-4 pb-5 pt-4 text-center">
            <div className="w-100 mb-3 text-end">
              <MdClose onClick={() => setIsModal(false)} role="button" style={{width: 23, height: 23}} />
            </div>
            <span className="text-dark d-block mb-5 fs-5 mx-5">გსურთ წაშალოთ ლისტინგი?</span>
            <div className="d-flex align-items-center justify-content-center gap-3 w-100">
              <Button text="გაუქმება" type="bordered" noIcon onClick={() => setIsModal(false)}/>
              <Button text="დადასტურება" type="filled" noIcon onClick={handleDelete}/>
            </div>
          </div>
        </div> 
      : null }
      { isLoading ?
        <div className="position-fixed start-0 top-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <Loading className="w-100 h-100" />
        </div>
      : null }
    </>
  );
}
 
export default HousePage;