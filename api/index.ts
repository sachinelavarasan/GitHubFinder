import { instance } from "./instance";

export const fetchUsers = (data: any) => {
  return instance.get(`search/users?q=${data.q}&page=${data.page}`);
};
export const fetchUser = (username: string) => {
  return instance.get(`users/${username}`);
};
