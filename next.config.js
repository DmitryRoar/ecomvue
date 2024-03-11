/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      type: 'asset',
      resourceQuery: /url/ // *.svg?url
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
      use: ['@svgr/webpack']
    });
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_MEDIA_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_MEDIA_HOSTNAME
      }
    ]
  },
  i18n: {
    locales: ['ru', 'en-US'],
    defaultLocale: 'ru',
    localeDetection: true
  },
  async redirects() {
    return [
      ...['/auth', '/login'].map((source) => ({ source, destination: '/auth/login', permanent: true })),
      {
        source: '/projects',
        destination: '/create',
        permanent: true
      },
      {
        source: '/',
        destination: '/dashboard',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
