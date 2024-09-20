import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../Utilities/functions";

export const GeneralContext = createContext<GlobalContext>({
  regionsArray: [],
  citiesArray: []
});

const GeneralContextProvider = (props: { children: React.ReactNode }) => {
  // Get regions data from session storage
  const fetchedRegions = JSON.parse(sessionStorage.getItem("regionsData") || "[]");
  // Cities data
  const fetchedCitiesData = JSON.parse(sessionStorage.getItem("citiesData") || "[]")

  // Regions data state
  const [regionsArray, setRegionsArray] = useState<Region[]>(fetchedRegions);
  // City data state 
  const [citiesArray, setCitiesArray] = useState<City[]>(fetchedCitiesData);

  useEffect(() => {
    const fetchRegions = async () => {
      if(regionsArray.length === 0) {
        // Fetch regions
        try {
          const result = await makeRequest("GET", "regions");
          sessionStorage.setItem("regionsData", JSON.stringify(result));
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
          sessionStorage.setItem("citiesData", JSON.stringify(result));
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