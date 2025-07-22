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
  webpack: (config, { isServer, dev }) => {
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

    // Optimize bundle splitting for better performance
    if (!isServer && !dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          reactBootstrap: {
            test: /[\\/]node_modules[\\/]react-bootstrap[\\/]/,
            name: 'react-bootstrap',
            chunks: 'all',
            priority: 10,
          },
        },
      };
    }

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
    // Only apply redirects in production
    if (process.env.NODE_ENV === 'production') {
      return [
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
    }

    // No redirects in development
    return [];
  },
};

module.exports = nextConfig;
