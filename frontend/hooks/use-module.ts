"use client";
import { useAuthClient } from "@/lib/use-auth-client";
import { useQuery } from "@tanstack/react-query";

export const useModule = (moduleId: string | undefined) => {
  const client = useAuthClient();

  return useQuery({
    queryKey: ["module", moduleId],
    queryFn: async () => {
      if (!moduleId) return null;

      const { data } = await client.get(`/modules/${moduleId}`);
      console.log("Module data:", data);
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!moduleId, // Only run the query if moduleId is provided
  });
};
