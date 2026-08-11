/** @type {import('next').NextConfig} */
const nextConfig = {
  // Erzeugt einen eigenstaendigen Server-Build — Voraussetzung fuer das
  // schlanke Container-Image, das auf Cloud Run laeuft.
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
