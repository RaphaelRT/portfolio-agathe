import type { NextConfig } from "next";

const isExportMode = process.env.NEXT_PUBLIC_EXPORT_MODE === "true";

const nextConfig: NextConfig = isExportMode
  ? {
      output: "export",
      trailingSlash: true,
      images: {
        unoptimized: true,
      },
      distDir: "build",
    }
  : {};

export default nextConfig;
