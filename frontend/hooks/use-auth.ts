"use client";
import { useState, useCallback } from "react";

const TOKEN_KEY = "auth_token";

/**
 * Custom hook for managing authentication state
 * Handles storing and retrieving authentication token from localStorage
 */
export const useAuth = () => {
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null
  );
  const [isLoading, setIsLoading] = useState(true);

  const setAuthToken = useCallback(
    (newToken: string | null) => {
      if (typeof window !== "undefined") {
        if (newToken) {
          localStorage.setItem(TOKEN_KEY, newToken);
          // also set in http only cookie
          document.cookie = `auth_token=${newToken}; path=/; secure; samesite=strict`;
        } else {
          localStorage.removeItem(TOKEN_KEY);
        }
        setToken(newToken);
      }
    },
    [setToken]
  );

  // Clear token (logout)
  const clearToken = useCallback(() => {
    setAuthToken(null);
    // also clear in http only cookie
    document.cookie = `auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
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
