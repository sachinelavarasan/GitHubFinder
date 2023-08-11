import axios from "axios";
const EXPO_PUBLIC_GIT_TOKEN = "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";

export const instance = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    Authorization: `Bearer ${EXPO_PUBLIC_GIT_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
  },
});
