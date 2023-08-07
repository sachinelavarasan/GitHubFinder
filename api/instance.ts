import axios from "axios";
const EXPO_PUBLIC_GIT_TOKEN = "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";

export const instance = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    Authorization: `Bearer ${EXPO_PUBLIC_GIT_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
  },
});
