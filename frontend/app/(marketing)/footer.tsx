import { Button } from "@/components/ui/button";
import { Building, Gavel, Landmark, Scale, Users } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <div className="mr-4 rounded-md">
            <Landmark className="h-8 w-10 text-green-600" />
          </div>
          Contracts
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <div className="mr-4 rounded-md">
            <Scale className="h-8 w-10 text-green-600" />
          </div>
          Litigation
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <div className="mr-4 rounded-md">
            <Building className="h-8 w-10 text-green-600" />
          </div>
          Property Law
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <div className="mr-4 rounded-md">
            <Users className="h-8 w-10 text-green-600" />
          </div>
          Family Law
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <div className="mr-4 rounded-md">
            <Gavel className="h-8 w-10 text-green-600" />
          </div>
          Criminal Law
        </Button>
      </div>
    </footer>
  );
};