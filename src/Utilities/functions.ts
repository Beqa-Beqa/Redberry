import { baseUrl, key } from "./api";

/**
 * 
 * @param num number
 * @param flag flag to add in the end
 * @returns string from number, separated thousands with comma and added flag in the end if provided
 */
export const deriveNumTag = (num: number, flag?: string, separator?: string) => {
  let result = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator ? separator : ",");
  if(flag) result += " " + flag;
  return result;
};


/**
 * 
 * @param method Request method
 * @param endpoint API endpoint
 * @param withKey If endpoint needs key this should be true
 * @param body Body for request if neeeded
 * @returns Data returned form request
 * 
 */
export const makeRequest = async (method: "GET" | "POST" | "DELETE", endpoint: string, withKey: boolean = false, contentType?: string, body?: any) => {
  try {
    const options: RequestInit = {
      method,
      mode: "cors",
      cache: "no-cache",
      headers: new Headers({
        "Content-Type": contentType ? contentType : "application/json"
      })
    }
    
    if(body) options.body = JSON.stringify(body);
    if(withKey) (options.headers as Headers).append("Authorization", `Bearer ${key}`);

    const response = await fetch(`${baseUrl}/${endpoint}`, options);

    return await response.json();
  } catch (err) {
    console.log(err);
  }
}


/**
 * 
 * @param setState page state setter
 * @param value page
 */
export const changePage = (setState: React.Dispatch<React.SetStateAction<Page>>, value: Page) => {
  setState(value);
  sessionStorage.setItem("currentPage", value);
}


/**
 * 
 * @param file File to convert to binary string ( base 64 )
 * @returns Promise that either resolves to base 64 string or rejects with error
 */
export const imageToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);  // Converts the image to base64
    reader.onload = () => resolve(reader.result as string); // Resolve with base64 string
    reader.onerror = error => reject(error); // Reject in case of an error
  });
}
