"use client";
import { useCourses } from "@/hooks/use-courses";
import { List } from "@/app/(main)/courses/list";
import { Loader2 } from "lucide-react";

const CoursesPage = () => {
  const { data: coursesData, isLoading } = useCourses();

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto my-6">
      <h1 className="text-2xl font-bold text-neutral-700">All Courses</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-neutral-500" />
        </div>
      ) : (
        <List courses={coursesData?.courses || []} activeCourseId={""} />
      )}
    </div>
  );
};

export default CoursesPage;
