import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

export default nextConfig;
