"use client";
import { useAuthClient } from "@/lib/use-auth-client";
import { useQuery } from "@tanstack/react-query";

export const useProgress = (courseId: string | undefined) => {
  const client = useAuthClient();

  return useQuery({
    queryKey: ["progress", courseId],
    queryFn: async () => {
      if (!courseId) return null;

      const { data } = await client.get(`/user-progress/${courseId}`);
      console.log("Progress data:", data);
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!courseId, // Only run the query if courseId is provided
  });
};
