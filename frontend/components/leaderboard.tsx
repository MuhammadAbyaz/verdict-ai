"use client";
import Image from "next/image";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserProgress } from "@/components/user-progress";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Loader } from "lucide-react";

const Leaderboard = () => {
  const { data } = useLeaderboard(10);
  const leaderboard = data?.leaderboard;

  const isPro = false;

  if (!leaderboard) {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-neutral-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress hasActiveSubscription={isPro} />
        {!isPro && <Promo />}
        <Quests />
      </StickyWrapper>

      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image
            src="/leaderboard.svg"
            alt="Leaderboard"
            height={90}
            width={90}
          />

          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            Leaderboard
          </h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">
            See where you stand among other learners in the community.
          </p>

          <Separator className="mb-4 h-0.5 rounded-full" />
          {leaderboard.map((userProgress, i) => (
            <div
              key={userProgress.userId}
              className="flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50"
            >
              <p className="mr-4 font-bold text-primary-700">{i + 1}</p>

              <Avatar className="ml-3 mr-6 h-12 w-12 border flex items-center justify-center bg-secondary">
                <AvatarImage
                  src={userProgress.userImageSrc}
                  className="object-cover"
                />
                <AvatarFallback>
                  {userProgress.username
                    ? userProgress.username
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()
                    : ""}
                </AvatarFallback>
              </Avatar>

              <p className="flex-1 font-bold text-neutral-800">
                {userProgress.username}
              </p>
              <p className="text-muted-foreground">{userProgress.xp} XP</p>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default Leaderboard;
