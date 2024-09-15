/**
 * 
 * @param setValue React value state value setter
 * @param value String value of region
 * @returns Removes value if already exists in state or appends the value if it doesn't exist
 */
export const handleRegionSelect = (setValue: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
  setValue((prev) => {
    let newState = [...prev];

    // Filter out the value
    if(prev.includes(value)) newState = newState.filter((region) => region !== value);
    // Append the value to the state
    else newState.push(value);

    // Update sessionStorage
    sessionStorage.setItem("regionsFilter", JSON.stringify(newState));

    return newState;
  });
};

/**
 * @description Set state directly with provided value
 * @param setValue State setter
 * @param value array of strings
 */
export const handleRegionStateChange = (setValue: React.Dispatch<React.SetStateAction<string[]>>, value: string[]) => {
  setValue(value);
  sessionStorage.setItem("regionsFilter", JSON.stringify(value));
}

// <-------------------------------------------------------------------------------------------------->


/**
 * 
 * @param setValue Price range state setter
 * @param params Object which contains boundaries of price
 * @returns New state with updated range
 */
export const handlePriceOrAreaSelect = (setValue: React.Dispatch<React.SetStateAction<{ start: number; end: number; }>>, params: { start?: number, end?: number }, type: "price" | "area") => {
  setValue((prev) => {
    const newState = {...prev};

    // Prevent start number to be more than end number
    if(params.start) {
      newState.start = params.start;
      if(newState.start > newState.end) newState.end = Infinity;
    } 

    if(params.end) {
      newState.end = params.end;
      if(newState.start > newState.end) newState.start = 0;
    }

    const dataTag = type === "price" ? "pricesFilter" : "areasFilter";
    sessionStorage.setItem(dataTag, JSON.stringify(newState));

    return newState;
  });
}


/**
 * @description Set state directly with provided object
 * @param setValue state setter
 * @param params new object with proper values
 * @param type type of filter
 */
export const handlePriceOrAreaStateChange = (setValue: React.Dispatch<React.SetStateAction<{ start: number; end: number; }>>, params: { start: number, end: number }, type: "price" | "area") => {
  const dataToStore = type === "price" ? "pricesFilter" : "areasFilter";
  setValue(params);
  sessionStorage.setItem(dataToStore, JSON.stringify(params));
}


/**
 * 
 * @param event Event target element
 * @param type start value or end value
 * @param setValue state setter
 * @param setError error state setter ( optional )
 * @returns updates states and controls validation message
 */
export const handlePriceOrAreaInputValueChange = (event: React.ChangeEvent<HTMLInputElement>, type: "start" | "end", setValue: React.Dispatch<React.SetStateAction<{ start: number; end: number; }>>,  dataType: "price" | "area", setError?: React.Dispatch<React.SetStateAction<boolean>>) => {
  const value = event.target.value;
  const intValue = parseInt(value);
  const dataTag = dataType === "price" ? "pricesFilter" : "areasFilter";

  let dataToStore = "";
  
  if(intValue) {
    setValue((prev) => {
      const newState = {...prev};
      
      if(type === "start")  {
        newState.start = intValue;
        if(newState.start > newState.end) setError && setError(true);
        else setError && setError(false);
      }
      if(type === "end") {
        newState.end = intValue;
        if(newState.start > newState.end) setError && setError(true);
        else setError && setError(false);
      }

      // Data to cache in session storage
      dataToStore = JSON.stringify(newState);
      sessionStorage.setItem(dataTag, dataToStore);

      return newState;
    });
  }

  if(value === "") {
    setValue((prev) => {
      const newState = {...prev};

      if(type === "start") newState.start = 0;
      if(type === "end") newState.end = Infinity;

      setError && setError(prev => prev && false);

      // Data to cache in session storage
      dataToStore = JSON.stringify(newState);
      sessionStorage.setItem(dataTag, dataToStore);

      return newState;
    });
  }
}

// <------------------------------------------------------------------------------------------------------->

/**
 * 
 * @param setValue state setter
 * @param value number value for setting state to that value
 */
export const handleRoomsQuantitySelect = (setValue: React.Dispatch<React.SetStateAction<number>>, value: number) => {
  setValue(value);
  sessionStorage.setItem("roomsQuantityFilter", value.toString());
}