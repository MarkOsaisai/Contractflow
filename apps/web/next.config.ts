import type { NextConfig } from 'next';
module.exports = {
  allowedDevOrigins: ['192.168.1.208'],
};

const nextConfig: NextConfig = {
  transpilePackages: ['@contractflow/contracts'],
};

export default nextConfig;