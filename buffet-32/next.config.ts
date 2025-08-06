// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... otras configuraciones que ya tengas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      // ... otras configuraciones de dominios remotos si las tienes
    ],
  },
};

module.exports = nextConfig;