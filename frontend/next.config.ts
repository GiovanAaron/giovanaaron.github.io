import type { NextConfig } from "next";
import { cpSync, mkdirSync } from "node:fs";
import path from "node:path";

// Downloads are served from public; keep them aligned with the source CVs.
const publicCvDirectory = path.join(process.cwd(), "public/cv");
mkdirSync(publicCvDirectory, { recursive: true });
cpSync(path.join(process.cwd(), "src/assets/cv_variants"), publicCvDirectory, {
  recursive: true,
});

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: process.env.NEXT_BASE_PATH || "",
};

export default nextConfig;
