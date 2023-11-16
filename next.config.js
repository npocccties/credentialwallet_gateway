/** @type {import('next').NextConfig} */

const isDevelopment = process.env.NODE_ENV == 'production'

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  output: isDevelopment ? "wallet" : "",
  assetPrefix: isDevelopment ? "/wallet" : ""
};

module.exports = nextConfig;
