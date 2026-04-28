/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath: '/MyProfile',
  assetPrefix: '/MyProfile/',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
