import { useContext, useEffect, useState } from "react";
import { Button, ImageField, InputField, Loading, RadioButton, TextareaField } from "../../Components";
import "./AddListingForm.css";
import { GeneralContext } from "../../Contexts/GeneralContext";
import { changePage, makeRequest } from "../../Utilities/functions";
import { PageContext } from "../../Contexts/PageContext";
import { RealEstateContext } from "../../Contexts/RealEstateContext";

const AddListingForm = (props: {
  className?: string
}) => {
  // Props
  const { className } = props;

  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Agents data
  const { agents, triggerAgentsFetch } = useContext(RealEstateContext);

  // Submit button state
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  // Context values
  const { regionsArray, citiesArray } = useContext(GeneralContext);
  const { setCurrentPage } = useContext(PageContext);
  const { triggerPropertyFetch } = useContext(RealEstateContext);

  // Type of listing
  const [type, setType] = useState<"sell" | "rent" | "">("");

  // Address details
  const [address, setAddress] = useState<string>("");
  const [postalIndex, setPostalIndex] = useState<string>("");
  // ID will be stored as a string
  const [region, setRegion] = useState<string>("");
  const [city, setCity] = useState<string>("");
  
  // Filter cities based on region
  const citiesOptions = region ? citiesArray.filter((city: City) => city.region_id === parseInt(region)) : [];

  // Flat details
  const [price, setPrice] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [roomsQuantity, setRoomsQuantity] = useState<string>("");

  // Description
  const [description, setDescription] = useState<string>("");

  // Image
  const [image, setImage] = useState<File | null>(null);

  // Agent
  const [agent, setAgent] = useState<string>("");

  // Error states
  // Address
  const [isAddressValid, setIsAddressValid] = useState<boolean | null>(null);
  const [isPostalIndexValid, setIsPostalIndexValid] = useState<boolean | null>(null);

  // Flat
  const [isPriceValid, setIsPriceValid] = useState<boolean | null>(null);
  const [isAreaValid, setIsAreaValid] = useState<boolean | null>(null);
  const [isRoomsQuantityValid, setIsRoomsQuantityValid] = useState<boolean | null>(null);

  // Description
  const [isDescriptionValid, setIsDescriptionValid] = useState<boolean | null>(null);

  // Fetch agents and update states to saved values
  useEffect(() => {
    setIsLoading(true);
    triggerAgentsFetch();
    setIsLoading(false);

    const savedType = (sessionStorage.getItem("listing-type") as "sell" | "rent") || "";
    const savedAddress = sessionStorage.getItem("listing-address") || "";
    const savedPostalindex = sessionStorage.getItem("listing-postalindex") || "";
    const savedRegion = sessionStorage.getItem("listing-region") || "";
    const savedCity = sessionStorage.getItem("listing-city") || "";
    const savedPrice = sessionStorage.getItem("listing-price") || "";
    const savedArea = sessionStorage.getItem("listing-area") || "";
    const savedRoomsQuantity = sessionStorage.getItem("listing-roomsQuantity") || "";
    const savedDescription = sessionStorage.getItem("listing-description") || "";
    const savedAgent = sessionStorage.getItem("listing-agent") || "";

    setType(savedType);
    setAddress(savedAddress);
    setPostalIndex(savedPostalindex);
    setRegion(savedRegion);
    setCity(savedCity);
    setPrice(savedPrice);
    setArea(savedArea);
    setRoomsQuantity(savedRoomsQuantity);
    setDescription(savedDescription);
    setAgent(savedAgent);
  
  }, []);

  useEffect(() => {
    if(isButtonDisabled) setIsButtonDisabled(false);
  }, [type, address, postalIndex, region, city, price, area, roomsQuantity, description, image, agent]);
  
  const clearSessionStorage = () => {
    sessionStorage.removeItem("listing-type");
    sessionStorage.removeItem("listing-address");
    sessionStorage.removeItem("listing-postalindex");
    sessionStorage.removeItem("listing-region");
    sessionStorage.removeItem("listing-city");
    sessionStorage.removeItem("listing-price");
    sessionStorage.removeItem("listing-area");
    sessionStorage.removeItem("listing-roomsQuantity");
    sessionStorage.removeItem("listing-description");
    sessionStorage.removeItem("listing-agent");
  }

  // Regular expression
  const atLeast2SymbolRegex = /^.{2,}$/;
  const digitsRegex = /^[0-9]*$/;
  const atLeast5WordRegex = /^(\S+ +){4,}\S+\s*$/;

  // Addres field change handlers
  const handleAddressFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if(atLeast2SymbolRegex.test(val)) setIsAddressValid(true);
    else setIsAddressValid(false);

    setAddress(val);
    sessionStorage.setItem("listing-address", val);
  }

  const handlePostalFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    

    if(parseInt(val) && digitsRegex.test(val)) setIsPostalIndexValid(true);
    else setIsPostalIndexValid(false);
    
    setPostalIndex(val);
    sessionStorage.setItem("listing-postalindex", val);
  }

  // Flat field change handlers
  const handlePriceFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if(parseInt(val) && digitsRegex.test(val)) setIsPriceValid(true);
    else setIsPriceValid(false);
    
    setPrice(val);
    sessionStorage.setItem("listing-price", val);
  }

  const handleAreaFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if(parseInt(val) && digitsRegex.test(val)) setIsAreaValid(true);
    else setIsAreaValid(false);
    
    setArea(val);
    sessionStorage.setItem("listing-area", val);
  }

  const handleRoomsQuantityFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if(parseInt(val) && digitsRegex.test(val)) setIsRoomsQuantityValid(true);
    else setIsRoomsQuantityValid(false);
    
    setRoomsQuantity(val);
    sessionStorage.setItem("listing-roomsQuantity", val);
  }

  // Description field change handler
  const handleDescriptionFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;

    if(atLeast5WordRegex.test(val)) setIsDescriptionValid(true);
    else setIsDescriptionValid(false);

    setDescription(val);
    sessionStorage.setItem("listing-description", val);
  }

  // Handle cancel
  const handleCancel = () => {
    clearSessionStorage();
    changePage(setCurrentPage, "");
  }

  // Handle submit
  const handleSubmit = async () => {
    if(type && isAddressValid && isPostalIndexValid && isPriceValid && isAreaValid && isRoomsQuantityValid && isDescriptionValid && image && agent) {
      setIsLoading(true);

      try {
        const body: RealEstatePostRequestBody = {
          is_rental: type === "rent" ? 1 : 0,
          address,
          zip_code: postalIndex,
          region_id: parseInt(region),
          city_id: parseInt(city),
          price: parseInt(price),
          area: parseInt(area),
          bedrooms: parseInt(roomsQuantity),
          description,
          image,
          agent_id: parseInt(agent)
        };

        const result = await makeRequest("POST", "real-estates", true, "multipart/form-data", body);
        if(result) triggerPropertyFetch();
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
      clearSessionStorage();
      changePage(setCurrentPage, "");
    } else {
      setIsButtonDisabled(true);
    }
  }

  return (
    <>
      <section className={`${className || ""} d-flex flex-column gap-5 align-items-center py-5`}>
        <h1 className="text-dark fw-bold fs-3">ლისტინგის დამატება</h1>
        <div className="w-50 mt-2">
          <h2 className="text-dark fs-5">გარიგების ტიპი</h2>
          <div className="w-100 mt-3">
            <RadioButton checked={type === "sell"} onChange={() => { setType("sell"); sessionStorage.setItem("listing-type", "sell"); }} className="me-5" label="იყიდება" />
            <RadioButton checked={type === "rent"} onChange={() => { setType("rent"); sessionStorage.setItem("listing-type", "rent"); }} className="ms-5" label="ქირავდება" />
          </div>
        </div>

        {/* Address details */}

        <div className="w-50 mt-5">
          <h2 className="text-dark fs-5">მდებარეობა</h2>
          <div className="d-flex w-100 gap-4 mt-3">

            {/* Address */}

            <InputField
              value={address}
              setValue={setAddress}
              onChange={handleAddressFieldChange}
              required
              validations={[
                {
                  isValid: isAddressValid === null ? "init" : isAddressValid,
                  text: "მინიმუმ 2 სიმბოლო"
                }
              ]}
              type="text" 
              className="w-50" 
              tag="მისამართი" 
            />

            {/* Postal code */}

            <InputField
              value={postalIndex}
              setValue={setPostalIndex}
              onChange={handlePostalFieldChange}
              required
              validations={[
                {
                  isValid: isPostalIndexValid === null ? "init" : isPostalIndexValid,
                  text: "მხოლოდ რიცხვები"
                }
              ]}
              type="text" 
              className="w-50" 
              tag="საფოსტო ინდექსი" 
            />
          </div>
          <div className="d-flex w-100 gap-4 mt-1">

            {/* Region */}

            <InputField
              value={region}
              setValue={setRegion}
              onSelectChange={(e: React.ChangeEvent<HTMLSelectElement>) => sessionStorage.setItem("listing-region", e.target.value)}
              type="select" 
              className="w-50" 
              tag="რეგიონი" 
              values={regionsArray}
            />

            {/* City */}

            <InputField
              value={city}
              setValue={setCity}
              onSelectChange={(e: React.ChangeEvent<HTMLSelectElement>) => sessionStorage.setItem("listing-city", e.target.value)}
              type="select" 
              className="w-50" 
              tag="ქალაქი" 
              values={citiesOptions}
            />
          </div>
        </div>

        {/* Flat details */}

        <div className="w-50 mt-5">
          <h2 className="text-dark fs-5">ბინის დეტალები</h2>
          <div className="d-flex w-100 gap-4 mt-3">

            {/* Price */}

            <InputField
              value={price}
              setValue={setPrice}
              onChange={handlePriceFieldChange}
              validations={[
                {
                  isValid: isPriceValid === null ? "init" : isPriceValid,
                  text: "მხოლოდ რიცხვები"
                }
              ]}
              type="text" 
              className="w-50" 
              tag="ფასი" 
            />

            {/* Area */}

            <InputField
              value={area}
              setValue={setArea}
              onChange={handleAreaFieldChange}
              validations={[
                {
                  isValid: isAreaValid === null ? "init" : isAreaValid,
                  text: "მხოლოდ რიცხვები"
                }
              ]}
              type="text" 
              className="w-50" 
              tag="ფართობი" 
            />
          </div>
          <div className="d-flex w-100 gap-4 mt-1">

            {/* Rooms quantity */}

            <InputField
              value={roomsQuantity}
              setValue={setRoomsQuantity}
              onChange={handleRoomsQuantityFieldChange}
              required
              validations={[
                {
                  isValid: isRoomsQuantityValid === null ? "init" : isRoomsQuantityValid,
                  text: "მხოლოდ რიცხვები"
                }
              ]}
              type="text" 
              className="w-50" 
              tag="საძინებლების რაოდენობა" 
            />
          </div>

          {/* Description */}

          <TextareaField 
            value={description}
            onChange={handleDescriptionFieldChange}
            required
            validations={[
              {
                isValid: isDescriptionValid === null ? "init" : isDescriptionValid,
                text: "მინიმუმ ხუთი სიტყვა"
              }
            ]}
            tag="აღწერა"
          />

          {/* Image */}

          <ImageField
            setImage={setImage}
            required
            tag="ატვირთეთ ფოტო"
            className="mt-3" 
          />        
        </div>

        {/* Agent details */}
        
        <div className="w-50 mt-5">
          <h2 className="text-dark fs-5">აგენტი</h2>
          <div className="d-flex w-100 mt-1">
            {/* Agent */}
            <InputField
              className="w-50"
              tag="აგენტი"
              type="select"
              value={agent}
              setValue={setAgent}
              onSelectChange={(e: React.ChangeEvent<HTMLSelectElement>) => sessionStorage.setItem("listing-agent", e.target.value)}
              values={agents}
            />
          </div>
        </div>

        {/* Buttons */}

        <div className="w-50 d-flex justify-content-end gap-3 mt-5">
          <Button onClick={handleCancel} text="გაუქმება" type="bordered" noIcon />
          <Button disabled={isButtonDisabled} onClick={handleSubmit} text="დაამატე ლისტინგი" type="filled" noIcon />
        </div>
      </section>
      { isLoading ?
          <div className="position-fixed top-0 start-0 w-100 h-100">
            <Loading className="w-100 h-100" />
          </div>
        : 
          null      
      }
    </>
  );
}
 
export default AddListingForm;