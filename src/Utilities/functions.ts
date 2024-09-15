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
export const makeRequest = async (method: "GET" | "POST" | "DELETE", endpoint: string, withKey: boolean = false, body?: any) => {
  const options: RequestInit = {
    method,
    mode: "cors",
    cache: "no-cache",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }

  if(body) options.body = JSON.stringify(body);
  if(withKey) (options.headers as Headers).append("Authorization", `Bearer ${key}`);

  const response = await fetch(`${baseUrl}/${endpoint}`, options);

  return await response.json();
}