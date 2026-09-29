import Cookies from "js-cookie";

// for local development
export const baseApiUrl = "http://localhost:3000/api";

export const loginPages = ["/login", "/register"];
export const loginRestrictedPages = ["/todos"];

export const validateToken = (token: string | undefined) => {
  return token !== undefined && token.length !== 0;
};

export const logout = () => {
  Cookies.remove("userToken");
};

export function get(obj: any, path: any, defaultValue?: any) {
  const pathArray = Array.isArray(path) ? path : path.split(".");

  const result = pathArray.reduce((acc: any, key: any) => acc && acc[key], obj);

  return result === undefined ? defaultValue : result;
}

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
