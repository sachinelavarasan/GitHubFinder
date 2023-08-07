import { instance } from "./instance";

export const fetchUsers = (username: string) => {
  return instance.get(`search/users?q=${username}`);
};
export const fetchUser = (username: string) => {
  return instance.get(`users/${username}`);
};
