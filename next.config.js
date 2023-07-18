/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ["pt-br"],
    defaultLocale: "pt-br",
  },
};

module.exports = nextConfig;

const withFonts = require("next-fonts");
module.exports = withFonts();
