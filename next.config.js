// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withMDX({
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
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
})
