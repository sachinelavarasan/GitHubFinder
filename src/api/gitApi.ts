import { gitInstance } from "./instance";

export const fetchUsers = (data: any) => {
  return gitInstance.get(`search/users?q=${data.q}&page=${data.page}`);
};
export const fetchUser = (username: string) => {
  return gitInstance.get(`users/${username}`);
};
