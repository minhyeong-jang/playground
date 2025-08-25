import type { NextConfig } from "next";

// GitHub Pages 배포 시에만 basePath 적용
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(isGithubPages && {
    basePath: "/playground",
    assetPrefix: "/playground",
  }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
