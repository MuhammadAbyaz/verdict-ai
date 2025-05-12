"use client";
import { useAuthClient } from "@/lib/use-auth-client";
import { useQuery } from "@tanstack/react-query";

export const useLeaderboard = (limit = 10) => {
  const client = useAuthClient();

  return useQuery({
    queryKey: ["leaderboard", limit],
    queryFn: async () => {
      const { data } = await client.get(
        `/user-progress/leaderboard?limit=${limit}`
      );
      return data;
    },
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: true,
  });
};
