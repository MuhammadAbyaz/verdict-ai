import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://zzqyqwzefyvlufafjuzz.supabase.co/**")],
  },
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;
