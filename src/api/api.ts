import { loginInterface, signupInterface } from "../../utils/types";
import { apiInstance } from "./instance";

export const fetchUser = () => {
  return apiInstance.get("api/auth/getuser");
};

export const register = (data: signupInterface) => {
  return apiInstance.post("api/auth/register", data);
};

export const login = (data: loginInterface) => {
  return apiInstance.post("api/auth/login", data);
};
