import type {NextConfig} from "next";

const demoSlug = process.env.DEMO_SLUG;
const basePath = demoSlug ? `/demos/${demoSlug}` : "";

const nextConfig: NextConfig = {
  output: 'export', // нужно для экспорта статических сайтов, без серверной части
  trailingSlash: true, // теперь будет генерировать /who-we-are/index.html вместо who-we-are.html, можно использовать пути без html
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
