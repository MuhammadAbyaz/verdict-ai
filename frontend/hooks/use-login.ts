import apiClient from "@/lib/api-client";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { useRouter } from "next/navigation";

const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw new Error("Login failed");
  }
};

type LoginCredentials = {
  email: string;
  password: string;
};

/**
 * Hook for login mutation using React Query
 */
export const useLoginMutation = () => {
  const { setAuthToken } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      return await login(credentials.email, credentials.password);
    },
    onSuccess: (data) => {
      // Store the token in auth state
      setAuthToken(data.token);

      // store the user details in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("email", JSON.stringify(data.email));
        localStorage.setItem("username", JSON.stringify(data.username));
        localStorage.setItem("image", JSON.stringify(data.image));
      }

      // Redirect to home page
      router.push("/");
    },
  });
};
