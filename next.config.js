/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["img.icons8.com"],
  },
};

module.exports = nextConfig;
