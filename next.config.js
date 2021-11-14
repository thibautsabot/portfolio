module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer:
        { and: [/\.(js|ts)x?$/]
      },
      use: ["@svgr/webpack"]
    });

    return config;
  },
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    styledComponents: true
  }
}
