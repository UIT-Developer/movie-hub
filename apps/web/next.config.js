//@ts-check

const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
  
  // Build mode
  output: 'standalone',
  
  // Disable static optimization globally
  experimental: {
    isrFlushToDisk: false,
  },
  
  // Generate build ID
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  
  // Skip prerendering admin routes that require runtime API calls
  typescript: {
    tsconfigPath: './tsconfig.json'
  },

  // Skip static generation for error pages
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: false,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
  
    ],
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Provide empty modules for server-side only dependencies in client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'class-transformer/storage': false,
        'class-transformer': false,
        'class-validator': false,
      };
      
      // Mock next/document to prevent Html import errors
      config.resolve.alias = {
        ...config.resolve.alias,
        'next/document': false,
      };
    }
    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  
];

module.exports = composePlugins(...plugins)(nextConfig);
