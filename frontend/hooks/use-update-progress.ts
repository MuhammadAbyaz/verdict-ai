"use client";

import { useAuthClient } from "@/lib/use-auth-client";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateProgressData {
  courseId: string;
  moduleOrder: number;
  hearts: number;
}

// Define a more specific type for the expected API response if known, otherwise use 'any'
interface UpdateProgressResponse {
  // Define the expected response structure here
  // For example: success: boolean; message?: string;
  [key: string]: any; // Or a more specific type
}

export const useUpdateProgress = () => {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  const mutationFn = async (
    data: UpdateProgressData
  ): Promise<UpdateProgressResponse> => {
    const response = await client.post("/user-progress", data);
    return response.data;
  };

  const mutationOptions: UseMutationOptions<
    UpdateProgressResponse,
    Error,
    UpdateProgressData
  > = {
    onSuccess: (
      _responseData: UpdateProgressResponse,
      variables: UpdateProgressData
    ) => {
      // Invalidate and refetch progress for the specific course
      queryClient.invalidateQueries({
        queryKey: ["progress", variables.courseId],
      });
      // Invalidate and refetch all courses as progress might affect course completion status
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      // Optionally, invalidate user data if progress affects user stats directly
      queryClient.invalidateQueries({ queryKey: ["user"] });

      toast.success("Progress updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update progress.");
    },
  };

  return useMutation<UpdateProgressResponse, Error, UpdateProgressData>({
    mutationFn,
    ...mutationOptions,
  });
};
