/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  pageExtensions: ["page.tsx", "api.ts"],
};

module.exports = nextConfig;
