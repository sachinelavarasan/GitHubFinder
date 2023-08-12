import axios from "axios";
import { EXPO_PUBLIC_GIT_TOKEN } from "@env";

export const instance = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    Authorization: `Bearer ${EXPO_PUBLIC_GIT_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
  },
});
