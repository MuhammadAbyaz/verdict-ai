import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://zzqyqwzefyvlufafjuzz.supabase.co/**")],
  },
};

export default nextConfig;
