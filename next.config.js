const withMarkdoc = require("@markdoc/next.js");
const fs = require("fs");

module.exports =
  withMarkdoc(/* config: https://markdoc.io/docs/nextjs#options */)({
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.hashnode.com",
          port: "",
        },
      ],
    },
    webpack: (configuration) => {
      configuration.module.rules.push(
        {
          test: /\.svg$/,
          use: ["@svgr/webpack", "file-loader"],
        },
        {
          test: /\.md$/,
          use: "frontmatter-markdown-loader",
        },
        {
          test: /\.ya?ml$/,
          // use: 'js-yaml-loader',
          use: "raw-loader", // Use raw-loader to load YAML as a string to preserve comments
        }
      );
      return configuration;
    },
    async exportPathMap(defaultPathMap) {
      return {
        ...defaultPathMap,
      };
    },
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdoc"],
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
    async redirects() {
      return [
        {
          source: '/:prefix*/how-to-guides/data-governance/classification/auto',
          destination: '/how-to-guides/data-governance/classification/auto-classification',
          permanent: true,
        },
        {
          source: '/:prefix*/how-to-guides/data-governance/classification/auto/workflow',
          destination: '/how-to-guides/data-governance/classification/auto-classification/workflow',
          permanent: true,
        },
        {
          source: '/:prefix*/how-to-guides/data-governance/classification/auto/external-workflow',
          destination: '/how-to-guides/data-governance/classification/auto-classification/external-workflow',
          permanent: true,
        },
        {
          source: '/:prefix*/how-to-guides/data-governance/classification/auto/auto-pii-tagging',
          destination: '/how-to-guides/data-governance/classification/auto-classification/auto-pii-tagging',
          permanent: true,
        },
        {
          source: '/:prefix*/connectors/search/airflow/troubleshooting',
          destination: '/connectors/pipeline/airflow/troubleshooting',
          permanent: true,
        },
        {
          source: '/:prefix*/how-to-guides/admin-guide/roles-policies/overviewg',
          destination: '/how-to-guides/admin-guide/roles-policies/authorization',
          permanent: true,
        },
      ]
    },
  });