import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  i18n: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
  },
};

export default nextConfig;
