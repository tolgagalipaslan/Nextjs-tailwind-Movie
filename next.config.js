/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.themoviedb.org", "img.youtube.com"],
  },
};

module.exports = nextConfig;
