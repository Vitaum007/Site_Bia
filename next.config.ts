import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // AVIF primeiro (menor), WebP como alternativa para navegadores sem suporte
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [{ source: '/', destination: '/pt', statusCode: 301 }];
  },
};

export default nextConfig;
