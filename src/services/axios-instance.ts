import { API_URL } from "@/config";
import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Assuming you have a Bearer token stored in a variable
// const bearerToken = 'your_bearer_token_here';

// Add the Bearer token to the headers of the Axios instance
// axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${bearerToken}`;
