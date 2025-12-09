/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // GitHub Pages: serve under /CompanyWeb and use static export.
  output: 'export',
  basePath: '/CompanyWeb',
  assetPrefix: '/CompanyWeb',
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
}

module.exports = nextConfig


