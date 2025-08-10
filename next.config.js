/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : ''
const isUserSite = repo && repo.endsWith('.github.io')

const nextConfig = {
  // Export estático para GitHub Pages
  output: 'export',
  trailingSlash: true,

  // Imagenes sin optimización (requerido por export)
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
  },

  // Soporte de basePath/assetPrefix cuando el repo NO es user/org page
  basePath: isProd && !isUserSite && repo ? `/${repo}` : '',
  assetPrefix: isProd && !isUserSite && repo ? `/${repo}/` : undefined,

  compiler: {
    removeConsole: isProd,
  },
}

module.exports = nextConfig
