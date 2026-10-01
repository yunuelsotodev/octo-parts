import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.143",
    "localhost",
    "emotional-dis-emerging-velocity.trycloudflare.com",
    "*.trycloudflare.com",
  ],
  
};

export default nextConfig;
