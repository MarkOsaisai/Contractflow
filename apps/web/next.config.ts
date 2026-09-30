import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@contractflow/contracts-schema"],
};

export default nextConfig;
