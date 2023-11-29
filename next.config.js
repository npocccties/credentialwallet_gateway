/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV == "production";

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  pageExtensions: ["page.tsx", "api.ts"],
  // output: isProduction ? "wallet" : "",
  // assetPrefix: isProduction ? "/wallet" : "",

  // CORS対策
  async headers() {
    return [
      {
        "source": "/api/:path*",
        "headers": [
          { "key": "Access-Control-Allow-Credentials", "value": "true" },
          { "key": "Access-Control-Allow-Origin", "value": "*" },
          { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
        ]
      }
    ]
  },
};

module.exports = nextConfig;
