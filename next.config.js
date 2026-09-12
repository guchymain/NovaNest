/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['realtor.realtyapi.io', 'images.unsplash.com', 'photos.zillowstatic.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig
