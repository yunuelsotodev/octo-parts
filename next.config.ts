import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-16d0c5d6a27f41eda2dcdb2cc47d49ad.r2.dev'
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com'
      },
      {
        protocol: 'https',
        hostname: 'http2.mlstatic.com'
      },
      {
        protocol: 'https',
        hostname: '**.gstatic.com'
      }
    ]
  },
  allowedDevOrigins: [
    "192.168.1.143",
    "localhost",
    "emotional-dis-emerging-velocity.trycloudflare.com",
    "*.trycloudflare.com",
  ],
  
};

export default nextConfig;
