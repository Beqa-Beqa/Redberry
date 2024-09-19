import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../Utilities/functions";

export const RealEstateContext = createContext<{
  properties: Property[],
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>,
  triggerPropertyFetch: () => void,
  currentProperty: ResponseProperty | undefined,
  setCurrentProperty: React.Dispatch<React.SetStateAction<ResponseProperty | undefined>>
}>({
  properties: [],
  setProperties: () => {},
  triggerPropertyFetch: () => {},
  currentProperty: undefined,
  setCurrentProperty: () => {}
});

const RealEstateContextProvider = (props: {children: React.ReactNode}) => {
  // Properties state
  const [properties, setProperties] = useState<Property[]>([]);
  // Fetch triggers tate
  const [fetch, setRefetch] = useState<boolean>(false);

  // Check for already fetched current property
  let existingCurrentProperty = JSON.parse(sessionStorage.getItem("currentProperty") || "{}");
  if(!Object.keys(existingCurrentProperty).length) existingCurrentProperty = undefined;

  // Current property
  const [currentProperty, setCurrentProperty] = useState<ResponseProperty | undefined>(existingCurrentProperty);

  // Trigger proeprty fetch
  const triggerPropertyFetch = () => setRefetch(!fetch);

  // Fetch proeprties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const result = await makeRequest("GET", "real-estates", true, "");
        if(result) setProperties(result);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProperties();
  }, [fetch]);

  return <RealEstateContext.Provider value={{ properties, setProperties, triggerPropertyFetch, currentProperty, setCurrentProperty }}>
    {props.children}
  </RealEstateContext.Provider>
}

export default RealEstateContextProvider;