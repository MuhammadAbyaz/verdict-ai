"use client";

import { useAuthClient } from "@/lib/use-auth-client";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateTestProgressData {
  courseId: string;
}

// Define a more specific type for the expected API response if known, otherwise use 'any'
interface UpdateTestProgressResponse {
  // Define the expected response structure here
  // For example: success: boolean; message?: string;
  [key: string]: any; // Or a more specific type
}

export const useUpdateTestProgress = () => {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  const mutationFn = async (
    data: UpdateTestProgressData
  ): Promise<UpdateTestProgressResponse> => {
    const response = await client.post("/user-progress/test", data);
    return response.data;
  };

  const mutationOptions: UseMutationOptions<
    UpdateTestProgressResponse,
    Error,
    UpdateTestProgressData
  > = {
    onSuccess: (
      _responseData: UpdateTestProgressResponse,
      variables: UpdateTestProgressData
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

  return useMutation<UpdateTestProgressResponse, Error, UpdateTestProgressData>(
    {
      mutationFn,
      ...mutationOptions,
    }
  );
};
