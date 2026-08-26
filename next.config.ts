import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api_proxy/:path*',
        destination: `${process.env.BACKEND_URL || 'http://157.10.252.30/api'}/:path*`,
      },
      {
        source: '/storage_proxy/:path*',
        destination: `${(process.env.BACKEND_URL || 'http://157.10.252.30/api').replace('/api', '')}/storage/:path*`,
      },
    ];
  },
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "157.10.252.30",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "10.129.61.3",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;