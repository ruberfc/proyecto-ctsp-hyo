/** @type {import('next').NextConfig} */

/** Assets con hash en el nombre: seguros de cachear de forma inmutable. */
const ONE_YEAR_IMMUTABLE = 'public, max-age=31536000, immutable';

const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Las imágenes pueden reemplazarse conservando el mismo nombre.
    minimumCacheTTL: 0,
  },
  async headers() {
    return [
      // JS/CSS/fonts generados en build (nombres con hash)
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: ONE_YEAR_IMMUTABLE }],
      },
      // Imágenes procesadas por next/image; deben reflejar reemplazos con el mismo nombre.
      {
        source: '/_next/image',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
      },
      // Imágenes del sitio público
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
      },
      // Patrones y recursos SVG en /public
      {
        source: '/patterns/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
      },
      // Logo y demás archivos estáticos en la raíz de /public
      {
        source: '/:path*.webp',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
      },
      {
        source: '/:path*.svg',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
      },
      {
        source: '/:path*.png',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
      },
      {
        source: '/:path*.jpg',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
      },
      {
        source: '/:path*.jpeg',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
      },
      {
        source: '/:path*.ico',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
      },
    ];
  },
};

export default nextConfig;
