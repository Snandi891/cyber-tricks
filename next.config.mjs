/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/api/products-proxy",
        destination: "https://project-x-five-smoky.vercel.app/api/products",
      },
      {
        source: "/api/products",
        destination: "https://institute-admin-2d99.vercel.app/api/products",
      },
      {
        source: "/api/students",
        destination: "https://institute-admin-2d99.vercel.app/api/students",
      },
      {
        source: "/api/shirt",
        destination: "https://project-x-five-smoky.vercel.app/api/shirt", // Adjust this destination
      },
      {
        source: "/api/jins",
        destination: "https://project-x-five-smoky.vercel.app/api/jins", // Adjust this destination
      },
    ];
  },
};

export default nextConfig;
