import axios from "axios";
import apiClient from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { useRouter } from "next/navigation";

const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const response = await apiClient.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
    throw new Error("Registration failed");
  }
};

type RegisterCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

/**
 * Hook for register mutation using React Query
 */
export const useRegisterMutation = () => {
  const { setAuthToken } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      return await register(
        credentials.firstName,
        credentials.lastName,
        credentials.email,
        credentials.password
      );
    },
    onSuccess: (data) => {
      // Store the token in auth state
      setAuthToken(data.token);

      // Redirect to home page
      router.push("/");
    },
  });
};
