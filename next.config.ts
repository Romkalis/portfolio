import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // With output: "export", distDir is the export target and `next build` keeps its
  // intermediates in .next, so `npm run dev` uses its own folder (NEXT_DIST_DIR)
  // instead of either; sharing one broke a running dev server (ENOENT, 500).
  distDir: process.env.NEXT_DIST_DIR || "out-portfolio",
};

export default nextConfig;
