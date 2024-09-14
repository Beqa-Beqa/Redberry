/**
 * 
 * @param setValue React value state value setter
 * @param value String value of region
 * @returns Removes value if already exists in state or appends the value if it doesn't exist
 */
export const handleRegionSelect = (setValue: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
  setValue((prev) => {
    if(prev.includes(value)) {
      // Filter out the value
      const newState = prev.filter((region) => region !== value);
      // Return new state
      return newState;
    } else {
      // Append the value to the state and return new state
      return [...prev, value];
    }
  });
};

// <-------------------------------------------------------------------------------------------------->

/**
 * 
 * @param setValue Price range state setter
 * @param params Object which contains boundaries of price
 * @returns New state with updated range
 */
export const handlePriceOrAreaSelect = (setValue: React.Dispatch<React.SetStateAction<{ start: number; end: number; }>>, params: { start?: number, end?: number }) => {
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

    return newState;
  });
}

export const handlePriceOrAreaInputValueChange = (event: React.ChangeEvent<HTMLInputElement>, type: "start" | "end", setValue: React.Dispatch<React.SetStateAction<{ start: number; end: number; }>>, setError?: React.Dispatch<React.SetStateAction<boolean>> ) => {
  const value = event.target.value;
  const intValue = parseInt(value);
  
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

      return newState;
    });
  }

  if(value === "") {
    setValue((prev) => {
      const newState = {...prev};

      if(type === "start") newState.start = 0;
      if(type === "end") newState.end = Infinity;

      setError && setError(prev => prev && false);

      return newState;
    })
  }
}

// <------------------------------------------------------------------------------------------------------->