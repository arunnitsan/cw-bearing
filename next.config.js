const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  // Optimize for content updates
  generateEtags: false, // Disable ETags for better cache control
  compress: true,
  poweredByHeader: false,
  // Enable Turbopack for faster development (Next.js 14 feature)
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  webpack: (config, { isServer }) => {
    // Handle font files and other assets
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name][ext]',
      },
    });

    // Handle slick-carousel fonts specifically
    config.module.rules.push({
      test: /slick\.(eot|woff|ttf|svg)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/slick/[name][ext]',
      },
    });

    return config;
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cwbackend.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cwbearing.de',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
    ];
  },
  async redirects() {
    return [
      // Local
      // {
      //   source: "/en/:path*",
      //   destination: "de.localhost:3000/en",
      //   permanent: false,
      // },
      // {
      //   source: "/en",
      //   destination: "de.localhost:3000/en",
      //   permanent: false,
      // },
      // {
      //   source: "/it/:path*",
      //   destination: "de.localhost:3000/it",
      //   permanent: false,
      // },
      // {
      //   source: "/it",
      //   destination: "de.localhost:3000/it",
      //   permanent: false,
      // },
      // {
      //   source: "/fr",
      //   destination: "de.localhost:3000/fr",
      //   permanent: false,
      // },
      // {
      //   source: "/fr/:path*",
      //   destination: "de.localhost:3000/fr",
      //   permanent: false,
      // },
      // {
      //   source: "/pl",
      //   destination: "de.localhost:3000/pl",
      //   permanent: false,
      // },
      // {
      //   source: "/pl/:path*",
      //   destination: "de.localhost:3000/pl",
      //   permanent: false,
      // },
      // Live
      {
        source: "/en/:path*",
        destination: "cwbearing.de/en",
        permanent: false,
      },
      {
        source: "/en",
        destination: "cwbearing.de/en",
        permanent: false,
      },
      {
        source: "/it/:path*",
        destination: "cwbearing.de/it",
        permanent: false,
      },
      {
        source: "/it",
        destination: "cwbearing.de/it",
        permanent: false,
      },
      {
        source: "/fr",
        destination: "cwbearing.de/fr",
        permanent: false,
      },
      {
        source: "/fr/:path*",
        destination: "cwbearing.de/fr",
        permanent: false,
      },
      {
        source: "/pl",
        destination: "cwbearing.de/pl",
        permanent: false,
      },
      {
        source: "/pl/:path*",
        destination: "cwbearing.de/pl",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
