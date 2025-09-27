//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Or 'http' if applicable, but 'https' is recommended
        hostname: 'cinestar.com.vn', // Replace with the actual hostname of your image server
        // port: '', // Optional: specify if not using default port
        // pathname: '/path/to/images/**', // Optional: restrict to a specific path
      },
      // Add more objects for other remote hosts if needed
    ],
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  
];

module.exports = composePlugins(...plugins)(nextConfig);
