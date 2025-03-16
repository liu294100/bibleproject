/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    // Configure allowed image domains for external images
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
        pathname: '**',
      },
    ],
    // Disable the requirement for the crossOrigin attribute
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // React strict mode can sometimes cause hydration issues in development
  reactStrictMode: false,
};

// Replace this:
// export default nextConfig;

// With this:
module.exports = nextConfig;
