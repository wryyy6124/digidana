/** @type {import('next').NextConfig} */
// const nextConfig = {};

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "books.google.com",
        port: "",
        pathname: "/books/content",
      },
    ],
  },
};

export default nextConfig;
