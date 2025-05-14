import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ActionButton from "./actionButton";

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[260px] h-[260px] lg:w-[454px] lg:h-[454px] mb-8 lg:mb-0">
        <Image src="/hero2.svg" fill alt="Hero" />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          Simplifying Complex Law. Learn, Play and Stay Informed.
        </h1>
        <ActionButton />
      </div>
    </div>
  );
}
