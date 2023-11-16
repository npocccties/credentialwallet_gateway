/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  output: "wallet",
  assetPrefix: "/wallet"
};

module.exports = nextConfig;
