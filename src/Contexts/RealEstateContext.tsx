import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../Utilities/functions";

export const RealEstateContext = createContext<{
  properties: Property[],
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>,
  triggerPropertyFetch: () => void
}>({
  properties: [],
  setProperties: () => {},
  triggerPropertyFetch: () => {}
});

const RealEstateContextProvider = (props: {children: React.ReactNode}) => {
  // Properties state
  const [properties, setProperties] = useState<Property[]>([]);
  // Fetch triggers tate
  const [fetch, setRefetch] = useState<boolean>(false);

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

  return <RealEstateContext.Provider value={{ properties, setProperties, triggerPropertyFetch }}>
    {props.children}
  </RealEstateContext.Provider>
}

export default RealEstateContextProvider;