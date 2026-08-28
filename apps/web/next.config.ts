import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@contractflow/contracts'],
};

export default nextConfig;