/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "https://didactoysperu.com",
      "localhost",
      "ec2-54-189-90-96.us-west-2.compute.amazonaws.com",
    ],
  },
  trailingSlash: true,
  distDir: "build",
};

module.exports = nextConfig;
