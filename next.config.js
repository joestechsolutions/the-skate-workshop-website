/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gunkypvebhqlnjxmgexn.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'theresandiego.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 56, 64, 80, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 31536000, // 1 year cache
    // Next 16 only accepts quality=75 unless listed here; the logo uses 100
    // (Navigation, Footer) and the coach photo 90 — without these they 400.
    qualities: [75, 90, 100],
    loader: 'default',
    // Next 16 rejects query strings on local images unless localPatterns
    // explicitly allows them. The tsw-logo.png?v=2 cache-buster (Navigation,
    // Footer) needs a pattern that permits a search string.
    localPatterns: [
      // All local images WITHOUT a query string (about, features, home pages).
      { pathname: '**', search: '' },
      // Cache-busted logo served with ?v=2 (src/components/Navigation.tsx,
      // src/components/Footer.tsx). search matches url.search exactly,
      // including the leading "?".
      { pathname: '/images/logo/**', search: '?v=2' },
    ],
  },
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig
