import { useEffect, useRef } from "react";
import apiClient from "./api-client";
import { useAuth } from "@/hooks/use-auth";

/**
 * Hook that provides an authenticated axios instance
 * Automatically adds the auth token to requests when available
 */
export const useAuthClient = () => {
  const { token } = useAuth();
  const clientRef = useRef(apiClient);

  // Set up interceptor to add auth token to requests
  useEffect(() => {
    // Remove any existing interceptors to prevent duplicates
    const interceptorId = clientRef.current.interceptors.request.use(
      (config) => {
        // Only add the Authorization header if we have a token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Clean up interceptor on unmount
    return () => {
      clientRef.current.interceptors.request.eject(interceptorId);
    };
  }, [token]);

  return clientRef.current;
};
