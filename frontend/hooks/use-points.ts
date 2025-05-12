"use client";
import { useAuthClient } from "@/lib/use-auth-client";
import { useQuery } from "@tanstack/react-query";

export const usePoints = () => {
  const client = useAuthClient();

  return useQuery({
    queryKey: ["userPoints"],
    queryFn: async () => {
      const { data } = await client.get("/user-progress");
      return data;
    },
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: true,
  });
};
