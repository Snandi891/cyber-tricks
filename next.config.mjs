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
        destination: "http://192.168.86.17:3000/api/products",
      },
      {
        source: "/api/students",
        destination: "http://192.168.86.17:3000/api/students",
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
