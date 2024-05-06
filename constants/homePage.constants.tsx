import Image from "next/image";

import { ReactComponent as DeploymentIcon } from "../images/icons/deploymentTile.svg";
import { ReactComponent as KnowledgeBaseIcon } from "../images/icons/knowledge.svg";
import { ReactComponent as SaasIcon } from "../images/icons/saas.svg";

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
    title: "OpenMetadata Release 1.3",
    text: "Intuitive Lineage UI, Data Observability Alerts, Data Quality Incident Manager, Custom Metrics for Profiler, Knowledge Center Improvements, and lots more",
    link: "https://blog.open-metadata.org/openmetadata-release-1-3-ac801834ee80",
    image: (
      <Image
        width={1000}
        height={1000}
        src="/blogs/openmetadata-1.3.0-release.webp"
        alt="openmetadata-1.3.0-release"
      />
    ),
  },
  {
    title: "Leveraging the Power of OpenMetadata Data Quality Framework",
    text: "OpenMetadata offers the possibility to execute data quality tests directly from the UI, making it a powerful tool for everyone in the company.",
    link: "https://blog.open-metadata.org/leveraging-the-power-of-openmetadata-data-quality-framework-385ba2d8eaf",
    image: (
      <Image
        width={1000}
        height={1000}
        src="/blogs/simple-easy-data-quality.webp"
        alt="simple-easy-data-quality"
      />
    ),
  },
  {
    title: "OpenMetadata Release 1.2",
    text: "Domains, Data Products, Search Index, Stored Procedures, Glossary Approval Workflow, Customizable Landing Page, Applications, Knowledge Center, Cost Analysis, and lots more",
    link: "https://blog.open-metadata.org/openmetadata-release-1-2-531f0e3c6d9a",
    image: (
      <Image
        className="w-full h-full"
        width={1000}
        height={1000}
        src="/blogs/openmetadata-1.2.0-release.webp"
        alt="openmetadata-1.2.0-release"
      />
    ),
  },
];
