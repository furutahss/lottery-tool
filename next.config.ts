import type { NextConfig } from "next";

const REPO_NAME = 'lottery-tool';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? `/${REPO_NAME}` : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? `/${REPO_NAME}/` : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
