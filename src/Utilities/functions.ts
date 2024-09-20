import { baseUrl, key } from "./api";

/**
 * 
 * @param num number
 * @param flag flag to add in the end
 * @returns string from number, separated thousands with comma and added flag in the end if provided
 */
export const deriveNumTag = (num: number | string, flag?: string, separator?: string) => {
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
        "Accept": "application/json"
      })
    }

    if(body && contentType !== "multipart/form-data") {
      (options.headers as Headers).append("Content-Type", contentType || "application/json");
      options.body = JSON.stringify(body);
    }

    if(body && contentType === "multipart/form-data") {
      const formData = new FormData();

      for(const key in body) { formData.append(key, body[key]) };

      options.body = formData;
    }

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
 * @param setState State setter
 * @param value value for set state
 */
export const changeCurrentProperty = (setState: React.Dispatch<React.SetStateAction<ResponseProperty | undefined>>, value: ResponseProperty | undefined) => {
  setState(value);
  sessionStorage.setItem("currentProperty", JSON.stringify(value));
}