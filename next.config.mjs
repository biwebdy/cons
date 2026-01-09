/** @type {import('next').NextConfig} */
const origin = process.env.NODE_ENV === "production" ? "https://www.expertree.com" : "http://127.0.0.1:3000";

const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.expertree.com',
      },
      {
        protocol: 'https',
        hostname: 'cms.expertree.com',
      },
      {
        protocol: 'https',
        hostname: 'cms-uat.expertree.com',
      },
      {
        protocol: 'https',
        hostname: 'expertree.com',
      },
      {
        protocol: 'http',
        hostname: '92.205.182.35',
      },
      {
        protocol: 'http',
        hostname: '92.205.233.109',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: '_rsc',
          },
        ],
        permanent: false,
        destination: '/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              
              font-src 'self' data: https://fonts.gstatic.com;
              
              script-src 'self' 'unsafe-inline' 'unsafe-eval'
                https://*.googletagmanager.com
                https://*.google-analytics.com
                https://*.cloudflareinsights.com
                https://snap.licdn.com
                https://*.linkedin.com
                https://px.ads.linkedin.com
                https://connect.facebook.net
                blob:;
              
              style-src 'self' 'unsafe-inline' 
                https://fonts.googleapis.com;
              
              img-src 'self' blob: data:
                https://*.cloudflareinsights.com
                https://*.linkedin.com
                https://*.facebook.com
                https://*.facebook.net
                https://*.google-analytics.com
                https://*.analytics.google.com
                https://*.googletagmanager.com
                https://*.g.doubleclick.net
                https://*.google.com;
              
              connect-src 'self'
                https://*.google-analytics.com
                https://*.analytics.google.com
                https://*.googletagmanager.com
                https://*.cloudflareinsights.com
                https://*.google.com
                https://*.linkedin.com
                https://*.facebook.com
                https://*.facebook.net
                https://*.g.doubleclick.net;
              
              frame-src 'self'
                https://*.googletagmanager.com
                https://*.facebook.com
                https://*.facebook.net
                https://td.doubleclick.net;
              
              worker-src 'self' blob:;
              child-src 'self' blob:;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              upgrade-insecure-requests;
            `.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  }
};

export default nextConfig;
