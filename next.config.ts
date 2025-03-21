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

module.exports = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig;
