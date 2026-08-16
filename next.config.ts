import type { NextConfig } from "next";

const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL;
const assetRemotePattern = assetBaseUrl
  ? (() => {
      try {
        const url = new URL(assetBaseUrl);

        return {
          protocol: url.protocol.replace(":", "") as "http" | "https",
          hostname: url.hostname,
          port: url.port,
          pathname: "/**"
        };
      } catch {
        return null;
      }
    })()
  : null;

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: assetRemotePattern ? [assetRemotePattern] : []
  },
  async headers() {
    return [
      {
        source: "/images/projects/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
