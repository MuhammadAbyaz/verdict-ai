"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";
import { useUser } from "@/hooks/use-user";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { NavUser } from "./sidebar-user";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  const { user } = useUser();
  const { clearToken } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    clearToken();
    if (typeof window !== "undefined") {
      localStorage.removeItem("email");
      localStorage.removeItem("username");
    }
    router.push("/login");
  };
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col py-4",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-2 pb-7 flex items-center gap-x-1">
          <Image src="/logo.svg" height={50} width={50} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Verdict AI
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Learn" href="/learn" iconSrc="/learn.svg" />
        <SidebarItem
          label="Leaderboard"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem label="quests" href="/quests" iconSrc="/quests.svg" />
        <SidebarItem label="ai-ttorney" href="/ai-ttorney" iconSrc="/bot.svg" />
      </div>

      <NavUser user={user} handleLogout={handleLogout} />
    </div>
  );
};
