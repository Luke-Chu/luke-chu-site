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
  // 第一阶段联调用兜底配置；生产环境请替换为明确的 OSS 域名白名单。
  remotePatterns.push({ protocol: "https", hostname: "**" });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
