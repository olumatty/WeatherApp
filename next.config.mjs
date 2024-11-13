/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true,
    },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Content-Security-Policy",
              value: "upgrade-insecure-requests",
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  