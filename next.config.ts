import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project sits inside the ~/my-work workspace folder, which is not a
  // repo and carries unrelated lockfiles. Pin the root so Turbopack ignores them.
  turbopack: { root: __dirname },
};

export default nextConfig;
