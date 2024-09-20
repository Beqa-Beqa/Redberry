import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../Utilities/functions";

export const GeneralContext = createContext<GlobalContext>({
  regionsArray: [],
  citiesArray: []
});

const GeneralContextProvider = (props: { children: React.ReactNode }) => {
  // Regions data state
  const [regionsArray, setRegionsArray] = useState<Region[]>([]);
  // City data state 
  const [citiesArray, setCitiesArray] = useState<City[]>([]);

  useEffect(() => {
    const fetchRegions = async () => {
      if(regionsArray.length === 0) {
        // Fetch regions
        try {
          const result = await makeRequest("GET", "regions");
          setRegionsArray(result);
        } catch (err) {
          console.log(err);
        }
      }
    }

    const fetchCities = async () => {
      if(citiesArray.length === 0) {
        // Fetch cities
        try {
          const result = await makeRequest("GET", "cities");
          setCitiesArray(result)
        } catch (err) {
          console.log(err);
        }
      }
    }

    fetchRegions();
    fetchCities();
  }, []);

  return <GeneralContext.Provider value={{ regionsArray, citiesArray }}>
    {props.children}
  </GeneralContext.Provider>
}

export default GeneralContextProvider;