"use client";
import { useAuthClient } from "@/lib/use-auth-client";
import { useQuery } from "@tanstack/react-query";

export const useCourse = (courseId: string | undefined) => {
  const client = useAuthClient();

  return useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      if (!courseId) return null;

      const { data } = await client.get(`/courses/${courseId}`);
      const { data: testData } = await client.get(`/tests/${data.test.id}`);
      return { courseData: data, testData };
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!courseId, // Only run the query if courseId is provided
  });
};
