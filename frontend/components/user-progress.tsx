"use client";
import Link from "next/link";
import Image from "next/image";
import { InfinityIcon, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePoints } from "@/hooks/use-points";

type Props = {
  activeCourse?: Course;
  hasActiveSubscription: boolean;
};

export const UserProgress = ({
  activeCourse,
  hasActiveSubscription,
}: Props) => {
  const { data } = usePoints();
  if (!data) {
    return (
      <div className="flex h-20 w-full items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-neutral-500" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      {activeCourse && (
        <Link href="/courses">
          <Button variant="ghost">
            <Image
              src={activeCourse.thumbnail}
              alt={activeCourse.title}
              className="rounded-md "
              width={32}
              height={32}
            />
          </Button>
        </Link>
      )}
      <Link href="#">
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="/points.svg"
            height={28}
            width={28}
            alt="Points"
            className="mr-2"
          />
          {data.totalXp}
        </Button>
      </Link>
      <Link href="#">
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="/heart.svg"
            height={22}
            width={22}
            alt="Hearts"
            className="mr-2"
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            data.hearts
          )}
        </Button>
      </Link>
    </div>
  );
};
