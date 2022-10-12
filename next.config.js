const withMarkdoc = require("@markdoc/next.js");

module.exports =
  withMarkdoc(/* config: https://markdoc.io/docs/nextjs#options */)({
    webpack: (configuration) => {
      configuration.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack", "file-loader"],
      });
      return configuration;
    },
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdoc"],
  });
