import { instance } from "./instance";

export const fetchUsers=(query:string)=>{
    return instance.get(`search/users?q=${query}`);
}