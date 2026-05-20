import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: "out-portfolio",
};

export default nextConfig;
