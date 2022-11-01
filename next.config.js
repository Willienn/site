/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;

const withFonts = require("next-fonts");
module.exports = withFonts();
