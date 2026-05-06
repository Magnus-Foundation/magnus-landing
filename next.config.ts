import type { NextConfig } from "next";
import path from "node:path";

const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(__dirname),
};

export default config;
