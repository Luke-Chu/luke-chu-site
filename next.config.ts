import type { NextConfig } from "next";

const imageHosts = (process.env.NEXT_PUBLIC_IMAGE_HOSTS ?? "")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  { protocol: "http", hostname: "localhost" },
  ...imageHosts.map((hostname) => ({ protocol: "https" as const, hostname })),
];

if (imageHosts.length === 0) {
  // Temporary fallback for phase 1. Replace with explicit OSS hostnames in production.
  remotePatterns.push({ protocol: "https", hostname: "**" });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
