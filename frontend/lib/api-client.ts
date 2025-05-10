import axios from "axios";

// Create a base axios instance with common configuration
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL, // Default fallback URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
