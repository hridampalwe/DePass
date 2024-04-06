/** @type {import('next').NextConfig} */
const webpack = require("webpack");
module.exports = {
  // Your Next.js config
  // ...
  webpack: (config, options) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      })
    );
    return config;
  },
};
