import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../Utilities/functions";

export const GeneralContext = createContext<GlobalContext>({
  regionsArray: []
});

const GeneralContextProvider = (props: { children: React.ReactNode }) => {
  // Get regions data from session storage
  const fetchedRegions = JSON.parse(sessionStorage.getItem("regionsData") || "[]");

  // Regions data state
  const [regionsArray, setRegionsArray] = useState<Region[]>(fetchedRegions);

  useEffect(() => {
    const fetchRegions = async () => {
      if(regionsArray.length === 0) {
        // Fetch regions
        const result = await makeRequest("GET", "regions");
        // Set regions
        setRegionsArray(result);
      }
    }

    fetchRegions();
  }, []);

  return <GeneralContext.Provider value={{ regionsArray }}>
    {props.children}
  </GeneralContext.Provider>
}

export default GeneralContextProvider;