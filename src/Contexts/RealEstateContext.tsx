import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../Utilities/functions";

export const RealEstateContext = createContext<{
  properties: Property[],
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>,
  agents: Agent[],
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>,
  triggerPropertyFetch: () => void,
  triggerAgentsFetch: () => void,
  currentProperty: ResponseProperty | undefined,
  setCurrentProperty: React.Dispatch<React.SetStateAction<ResponseProperty | undefined>>
}>({
  properties: [],
  setProperties: () => {},
  triggerPropertyFetch: () => {},
  currentProperty: undefined,
  setCurrentProperty: () => {},
  agents: [],
  setAgents: () => {},
  triggerAgentsFetch: () => {}
});

const RealEstateContextProvider = (props: {children: React.ReactNode}) => {
  // Properties state
  const [properties, setProperties] = useState<Property[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  // Fetch trigger states
  const [propertyFetch, setPropertyRefetch] = useState<boolean>(false);
  const [agentsFetch, setAgentsFetch] = useState<boolean>(false);

  // Check for already fetched current property
  let existingCurrentProperty = JSON.parse(sessionStorage.getItem("currentProperty") || "{}");
  if(!Object.keys(existingCurrentProperty).length) existingCurrentProperty = undefined;

  // Current property
  const [currentProperty, setCurrentProperty] = useState<ResponseProperty | undefined>(existingCurrentProperty);

  // Trigger proeprty fetch
  const triggerPropertyFetch = () => setPropertyRefetch(!fetch);

  // Trigger agents fetch
  const triggerAgentsFetch = () => setAgentsFetch(!agentsFetch);

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
  }, [propertyFetch]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const reuslt = await makeRequest("GET", "agents", true);

        setAgents(reuslt);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAgents();
  }, [agentsFetch]);

  return <RealEstateContext.Provider value={{ properties, setProperties, triggerPropertyFetch, currentProperty, setCurrentProperty, agents, setAgents, triggerAgentsFetch }}>
    {props.children}
  </RealEstateContext.Provider>
}

export default RealEstateContextProvider;