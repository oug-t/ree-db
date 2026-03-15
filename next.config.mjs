/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api.php",
        destination: "http://localhost:8000/api.php",
      },
    ];
  },
};

export default nextConfig;
