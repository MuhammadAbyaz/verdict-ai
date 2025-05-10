import Image from "next/image"
import { SignupForm } from "@/components/signup-form"

export default function RegisterPage() {
  return (
    <div className="bg-green-50 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex flex-col items-center gap-2 self-center font-medium">
          <div className="text-primary-foreground flex items-center justify-center rounded-md">
            <Image src="/logo.svg" alt="Logo" width={60} height={60} />
          </div>
          <span className="text-2xl font-bold text-green-600">
            Verdict AI.
            </span>
        </a>
        <SignupForm/>
      </div>
    </div>
  )
}
