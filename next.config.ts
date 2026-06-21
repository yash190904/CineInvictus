import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Temporary remote sources carried over from the old Framer site
    // (YouTube thumbnails + Framer-hosted images). Swap these for your
    // own optimized assets in /public when you have them, then remove
    // this block.
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
