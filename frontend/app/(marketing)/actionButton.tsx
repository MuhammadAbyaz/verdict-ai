"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useUser } from "@/hooks/use-user";

const ActionButton = () => {
  const { isAuthenticated } = useUser();
  return (
    <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
      {!isAuthenticated ? (
        <>
          <Button size="lg" variant="secondary" className="w-full" asChild>
            <Link href="/courses">Get Started</Link>
          </Button>
          <Button size="lg" variant="primaryOutline" className="w-full" asChild>
            <Link href="/login">I already have an account</Link>
          </Button>
        </>
      ) : (
        <>
          <Button size="lg" variant="secondary" className="w-full" asChild>
            <Link href="/courses">Continue Learning</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default ActionButton;
