import { ReactComponent as DeploymentIcon } from "../images/icons/deploymentTile.svg";
import { ReactComponent as KnowledgeBaseIcon } from "../images/icons/knowledge.svg";
import { ReactComponent as SaasIcon } from "../images/icons/saas.svg";

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
    url: "https://cloud.getcollate.io",
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

export const NEWS_ENTRY_INFO = [
  {
    title: "How we Built the Ingestion Framework",
    text: "Extracting Metadata from Every Corner: The evolution of the Ingestion Framework at OpenMetadata.",
    link: "https://blog.open-metadata.org/how-we-built-the-ingestion-framework-1af0b6ff5c81",
    image: <img src="./blogs/how-we-built-the-ingestion-framework.png" />,
  },
  {
    title: "OpenMetadata 0.13.2 Release",
    text: "Improved SQL Lineage, Glossary Bulk Upload, Unified Tag Category API, Mutually Exclusive Tags, Chrome Extension, and lots more.",
    link: "https://blog.open-metadata.org/openmetadata-0-13-2-release-e32c0de93361",
    image: <img src="./blogs/0132-release.png" />,
  },
  {
    title: "How to Integrate OpenMetadata Test Suites with your Data Pipelines",
    text: "Create and execute test suites from the UI or include them to your existing ETLs.",
    link: "https://blog.open-metadata.org/how-to-integrate-openmetadata-test-suites-with-your-data-pipelines-d83fb55fa494",
    image: <img src="./blogs/test-suite.png" />,
  },
];
