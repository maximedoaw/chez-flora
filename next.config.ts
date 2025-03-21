import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    domains:[
      "images.unsplash.com",
    ]
  },
  experimental: {
    
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
};


export default nextConfig;
