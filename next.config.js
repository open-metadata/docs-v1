const withMarkdoc = require("@markdoc/next.js");
const fs = require("fs");

module.exports =
  withMarkdoc(/* config: https://markdoc.io/docs/nextjs#options */)({
    target: "serverless",
    webpack: (configuration) => {
      configuration.module.rules.push(
        {
          test: /\.svg$/,
          use: ["@svgr/webpack", "file-loader"],
        },
        {
          test: /\.ya?ml$/,
          // use: 'js-yaml-loader',
          use: "raw-loader", // Use raw-loader to load YAML as a string to preserve comments
        }
      );
      return configuration;
    },
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdoc"],
    async exportPathMap(defaultPathMap) {
      return {
        ...defaultPathMap,
      };
    },
  });
