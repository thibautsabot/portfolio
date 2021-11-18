module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer:
        { and: [/\.(js|ts)x?$/]
      },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            titleProp: true,
          },
        },
      ],
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
