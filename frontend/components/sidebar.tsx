import Link from "next/link";
import Image from "next/image";

// import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarItem } from "./sidebar-item";



type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div className={cn(
      "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
      className,
    )}>
      <Link href="/learn">
        <div className="pt-8 pl-2 pb-7 flex items-center gap-x-1">
          <Image src="/logo.svg" height={50} width={50} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Verdict AI
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem 
          label="Learn" 
          href="/learn"
          iconSrc="/learn.svg"
        />
        <SidebarItem 
          label="Leaderboard" 
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem 
          label="quests" 
          href="/quests"
          iconSrc="/quests.svg"
        />
        <SidebarItem 
          label="ai-ttorney" 
          href="/ai-ttorney"
          iconSrc="/bot.svg"
        />
      </div>
    <div className="p-4">
      <div className="h-10 w-10">
        <Avatar>
        <AvatarImage src="/placeholder-avatar.png" alt="User avatar" />
        <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </div>
    </div>
  );
};