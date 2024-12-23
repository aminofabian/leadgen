/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['randomuser.me', 'images.unsplash.com'], // Add domains for avatar images
  },
  experimental: {
    serverActions: true,
  },

};

export default nextConfig;
