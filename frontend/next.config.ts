import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  output: "export",
  basePath: process.env.NEXT_BASE_PATH || "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
