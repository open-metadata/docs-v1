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

export const BLOGS_INFO = [
  {
    title: "Simple, Easy, and Efficient Data Quality with OpenMetadata",
    text: "Data quality and reliability are two top priorities for organizations. We have a different take on how data quality should be done.",
    link: "https://blog.open-metadata.org/simple-easy-and-efficient-data-quality-with-openmetadata-1c4e7d329364",
    image: <img src="./blogs/simple-easy-data-quality.png" />,
  },
  {
    title: "OpenMetadata 1.1.0 Release",
    text: "UI Overhaul, New Connectors, Improved Lineage Parsing, PII Masking, and lots more",
    link: "https://blog.open-metadata.org/openmetadata-1-1-0-release-97c1fb603bcf",
    image: <img src="./blogs/openmetadata-1.1.0-release.png" />,
  },
  {
    title: "Stuck with Amundsen? Here is how to migrate to OpenMetadata",
    text: "And unlock Collaboration, Data Quality, Data Insights, and more!",
    link: "https://blog.open-metadata.org/stuck-with-amundsen-here-is-how-to-migrate-to-openmetadata-6104cd2d5a71",
    image: <img src="./blogs/stuck-with-amundsen.png" />,
  },
];
