/** @type {import('next').NextConfig} */

const rewrites =
  process.env.NODE_ENV === 'development'
    ? [
        {
          source: '/api/:path*',
          destination: 'https://hofuri.keisukematsumoto.com/:path*',
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
