import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_GIT_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
  },
});
