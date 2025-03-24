import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error("API_URL is not set");
}

export const v1client = axios.create({
  baseURL: `${baseURL}/v1`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
