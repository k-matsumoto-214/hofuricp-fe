/** @type {import('next').NextConfig} */

const rewrites =
  process.env.NODE_ENV === 'development'
    ? [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8083/:path*',
        },
      ]
    : [];

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return rewrites;
  },
};

module.exports = nextConfig;
