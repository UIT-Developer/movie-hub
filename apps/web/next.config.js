//@ts-check

const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
  
  // Skip prerendering admin routes that require runtime API calls
  typescript: {
    tsconfigPath: './tsconfig.json'
  },
  
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
    }
    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  
];

module.exports = composePlugins(...plugins)(nextConfig);
