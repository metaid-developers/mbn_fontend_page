import createNextIntlPlugin from "next-intl/plugin";
import { NextConfig } from "next";
import { codeInspectorPlugin } from "code-inspector-plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(codeInspectorPlugin({ bundler: "webpack" }));
    return config;
  },
};

export default withNextIntl(nextConfig);
