/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["flaticon.com", "res.cloudinary.com"],
  },
  swcMinify: true,
};

module.exports = nextConfig;
