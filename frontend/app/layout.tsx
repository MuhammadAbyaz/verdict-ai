import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { Toaster } from "sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Verdict AI",
  description: "Empowering Justice Through AI-Driven Literacy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        {/* <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        /> */}
        <body className={font.className}>{children}</body>
        <Toaster richColors />
        <ExitModal />
        <PracticeModal />
        <HeartsModal />
      </html>
    </ReactQueryClientProvider>
  );
}
