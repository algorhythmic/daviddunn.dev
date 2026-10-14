/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Unlisted intro pages (/v/<slug>) and their assets (public/video/intro-*)
  // must never be indexed. See docs/VIDEO-PUBLISHING.md. The public explainer
  // (public/video/explainer-*) is deliberately not matched.
  async headers() {
    const noindex = { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }
    return [
      {
        source: '/v/:slug*',
        headers: [noindex, { key: 'Referrer-Policy', value: 'same-origin' }],
      },
      {
        source: '/video/:file(intro-.*)',
        headers: [noindex],
      },
      {
        source: '/video/README.md',
        headers: [noindex],
      },
    ]
  },
}

export default nextConfig
