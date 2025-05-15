"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

// import { courses, userProgress } from "@/db/schema";
// import { upsertUserProgress } from "@/actions/user-progress";

import { Card } from "./card";
import { useAuthClient } from "@/lib/use-auth-client";

type Props = {
  courses: Course[];
  activeCourseId?: string;
};

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const authClient = useAuthClient();

  const onClick = (id: string) => {
    router.push(`/learn/${id}`);
  };

  return (
    <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.thumbnail}
          onClick={onClick}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
