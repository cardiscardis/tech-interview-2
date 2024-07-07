/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.fragrancex.com',
        port: '',
        pathname: '/images/products/sku/large/**',
      },
    ],
  },
};

export default nextConfig;
