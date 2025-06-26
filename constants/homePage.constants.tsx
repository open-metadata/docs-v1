import { ReactComponent as DeploymentIcon } from "../images/icons/deploymentTile.svg";
import { ReactComponent as KnowledgeBaseIcon } from "../images/icons/knowledge.svg";
import { ReactComponent as SaasIcon } from "../images/icons/saas.svg";

export const HOME_PAGE_BANNER_VIDEO_ID = "x5o7DACNdjo";
export const HOME_PAGE_BANNER_INFO = {
  title: "OpenMetadata Documentation",
  description:
    "Unlock the value of data assets with an end-to-end metadata management solution that includes data discovery, governance, data quality, observability, and people collaboration.",
};

export const BANNER_LINKS_INFO = [
  {
    title: "Quick Start",
    description: "Install OpenMetadata to explore its full potential.",
    linkTitle: "Get Started",
    href: "/quick-start",
    theme: "green",
  },
  {
    title: "How-to Guides",
    description:
      "Get a complete overview of the features in OpenMetadata from our How-to Guides",
    linkTitle: "Explore Features",
    href: "/how-to-guides",
    theme: "purple",
  },
  {
    title: "Join the OSS Community",
    description:
      "Connect with 1000s of OpenMetadata users. Get support for all your questions from data experts.",
    linkTitle: "Join Slack Now!",
    href: "https://slack.open-metadata.org",
    theme: "pink",
    externalURL: true,
  },
];

export const OVERVIEW_INFO = {
  title: "Overview",
  description:
    "OpenMetadata is a unified platform for discovery, observability, and governance powered by a central metadata repository, in-depth lineage, and seamless team collaboration. It is one of the fastest-growing open-source projects with a vibrant community and adoption by a diverse set of companies in a variety of industry verticals. Based on Open Metadata Standards and APIs, supporting connectors to a wide range of data services, OpenMetadata enables end-to-end metadata management, giving you the freedom to unlock the value of your data assets.",
};

export const QUICK_LINK_CARDS = [
  {
    heading: "Deployment",
    content: "Deploy in Bare Metal, Docker or Kubernetes on any cloud 🎉",
    url: "/deployment",
    isExternalLink: false,
    icon: (
      <span className="card-icon-container card-green-icon">
        <DeploymentIcon height={36} />
      </span>
    ),
  },
  {
    heading: "SaaS",
    content: "Enjoy 100% of OpenMetadata with 0% of the hassle 🚀",
    url: "https://getcollate.io",
    isExternalLink: true,
    icon: (
      <span className="card-icon-container card-purple-icon">
        <SaasIcon height={36} />
      </span>
    ),
  },
  {
    heading: "Knowledge Base",
    content: "Check out some frequent Questions & Answers 💬",
    url: "https://github.com/open-metadata/OpenMetadata/discussions/categories/q-a",
    isExternalLink: true,
    icon: (
      <span className="card-icon-container card-pink-icon">
        <KnowledgeBaseIcon height={36} />
      </span>
    ),
  },
];

export const BLOGS_INFO = [
  {
    title: "OpenMetadata Release 1.7",
    text: "INew innovations like AutoPilot, Persona Customizations, Improved UX, Search Relevancy Settings, Enhanced Lineage Layers, New Connectors, and more",
    link: "https://blog.open-metadata.org/announcing-openmetadata-1-7-9f9778579704",
    image: "/blogs/openmetadata-1.7.0-release.webp",
  },
  {
    title: "OpenMetadata Release 1.6.0",
    text: "Key features to unify Metric definitions, Search RBAC, Alerts Debuggability, Terraform module, and more!",
    link: "https://blog.open-metadata.org/announcing-openmetadata-release-1-6-f4fdd7f66f72",
    image: "/blogs/openmetadata-1.6.0-release.webp",
  },
  {
    title: "Announcing OpenMetadata Release 1.5.0",
    text: "Key features improving data quality and insights, Data diff quality tests, APIs as a metadata asset, and more!",
    link: "https://blog.open-metadata.org/announcing-openmetadata-release-1-5-0-2b2fae95ff1c",
    image: "/blogs/openmetadata-1.5.0-release.webp",
  },
];
