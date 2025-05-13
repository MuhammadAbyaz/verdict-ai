"use client";
import { useAuthClient } from "@/lib/use-auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useHearts = () => {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (hearts: number) => {
      const { data } = await client.post("/user-progress/hearts", { hearts });
      return data;
    },
    onSuccess: () => {
      // Invalidate the userPoints query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["userPoints"] });
    },
  });
};
