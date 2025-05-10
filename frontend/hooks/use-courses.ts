"use client";
import { useAuthClient } from "@/lib/use-auth-client";
import { useQuery } from "@tanstack/react-query";

export const useCourses = () => {
  const client = useAuthClient();

  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await client.get("/courses");
      console.log("Courses data:", data);
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
