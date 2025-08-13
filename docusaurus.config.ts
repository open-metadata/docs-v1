import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'OpenMetadata Documentation',
  tagline: 'Get Help Instantly',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://docs.open-metadata.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'open-metadata',
  projectName: 'docs-v1',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/open-metadata/docs-v1/tree/main/',
          // Enable versioning (start with current only, add versions later)
          includeCurrentVersion: true,
          lastVersion: 'current',
          // Custom MDX components
          remarkPlugins: [],
          rehypePlugins: [],
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/openmetadata-social-card.jpg',
    navbar: {
      title: 'OpenMetadata',
      logo: {
        alt: 'OpenMetadata Logo',
        src: 'img/openmetadata-logo.png',
        srcDark: 'img/openmetadata-logo-white.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/open-metadata/OpenMetadata',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Quick Start',
              to: '/docs/quick-start',
            },
            {
              label: 'Deployment',
              to: '/docs/deployment',
            },
            {
              label: 'Connectors',
              to: '/docs/connectors',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Slack',
              href: 'https://slack.open-metadata.org/',
            },
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/open-metadata/OpenMetadata/discussions',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/open-metadata/OpenMetadata',
            },
            {
              label: 'Website',
              href: 'https://open-metadata.org',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OpenMetadata. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'python', 'bash', 'json', 'yaml', 'sql'],
    },
    ...(process.env.ALGOLIA_APP_ID && {
      algolia: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY || '',
        indexName: process.env.ALGOLIA_INDEX_NAME || 'openmetadata-docs',
        contextualSearch: true,
        searchParameters: {},
        searchPagePath: 'search',
      },
    }),
  } satisfies Preset.ThemeConfig,

  plugins: [
    // Custom plugin for handling MDX components
    function customMDXPlugin() {
      return {
        name: 'custom-mdx-plugin',
        configureWebpack() {
          return {
            resolve: {
              alias: {
                '@components': require('path').resolve(__dirname, 'src/components'),
              },
            },
          };
        },
      };
    },
  ],
};

export default config;