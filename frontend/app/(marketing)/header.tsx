import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Header = () => {
    return (
        <header className="h-20 w-full border-b-2 border-slate-200 px-4">
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/logo.svg" height={60} width={60} alt="Mascot" />
                    <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
                        Verdict AI
                    </h1>
                </div>
                <Link href="/login">
                    <Button size="lg" variant="ghost">
                        Login
                    </Button>
                </Link>
            </div>
        </header>
    );
};
