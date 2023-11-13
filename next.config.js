/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  pageExtensions: ["page.tsx", "api.ts"],
};

module.exports = nextConfig;
