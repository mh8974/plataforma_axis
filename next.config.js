
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:8080'
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL || 'http://localhost:8080'}/api/:path*`
      }
    ]
  }
}

module.exports = nextConfig