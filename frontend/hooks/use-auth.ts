import { useState, useEffect, useCallback } from "react";

const TOKEN_KEY = "auth_token";

/**
 * Custom hook for managing authentication state
 * Handles storing and retrieving authentication token from localStorage
 */
export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize token from localStorage when component mounts
  useEffect(() => {
    // We need to check if window is defined because Next.js does server-side rendering
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  // Save token to localStorage and update state
  const setAuthToken = useCallback((newToken: string | null) => {
    console.log("Setting auth token:", newToken);
    if (typeof window !== "undefined") {
      if (newToken) {
        localStorage.setItem(TOKEN_KEY, newToken);
        console.log("Token set in localStorage:", newToken);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    }
    setToken(newToken);
  }, []);

  // Clear token (logout)
  const clearToken = useCallback(() => {
    setAuthToken(null);
  }, [setAuthToken]);

  // Check if user is authenticated
  const isAuthenticated = !!token;

  return {
    token,
    setAuthToken,
    clearToken,
    isAuthenticated,
    isLoading,
  };
};
