"use client";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { Header } from "./header";
import { Unit } from "./unit";
import { useProgress } from "@/hooks/use-progress";
import { useCourse } from "@/hooks/use-course";
import { useParams } from "next/navigation";
import { Loader, Loader2 } from "lucide-react";

const LearnPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: userProgressData, isLoading: userProgressDataLoading } =
    useProgress(id);
  const { data, isLoading: courseDataLoading } = useCourse(id);

  const { courseData, testData } = data || {};
  const isPro = false;
  const hasActiveSubscription = false;
  console.log("progress", userProgressData);
  console.log("courseData", courseData);
  console.log("testData", testData);

  if (userProgressDataLoading || courseDataLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader className="h-8 w-8 animate-spin text-neutral-500" />
      </div>
    );
  }

  console.log("modules", courseData.modules);

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          hasActiveSubscription={hasActiveSubscription}
          activeCourse={courseData}
          hearts={15}
          points={250}
        />
        {!isPro && <Promo />}
        <Quests points={250} />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={courseData.title} />
        <Unit
          courseId={courseData.id}
          title={courseData.title}
          description={courseData.description}
          modules={[
            ...courseData.modules,
            {
              id: testData.id,
              title: "Final Test",
              description: "This is the final test for the course.",
              order: courseData.modules.length,
              xp: testData?.xp ?? 0,
            },
          ]}
          activeModule={userProgressData.userProgress.moduleProgress}
          order={courseData.modules.order}
        />
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
