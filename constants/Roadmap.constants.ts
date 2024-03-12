import {
  RoadmapCategoriesList,
  RoadmapData,
} from "../components/Roadmap/Roadmap.interface";
import { RoadmapCategories } from "../enums/Roadmap.enum";

export const CATEGORY_COLOR = {
  "DATA_DISCOVERY & COLLABORATION": "bg-[#4FC587]",
  "DATA INSIGHTS": "bg-[#FC725E]",
  "DATA QUALITY": "bg-[#E4B4DA]",
  APPLICATIONS: "bg-[#BBACD7]",
  "DATA OBSERVABILITY": "bg-[#E1E49E]",
  INTEGRATIONS: "bg-[#ACD6D6]",
  SECURITY: "bg-[#D7C3AD]",
};

export const ROADMAP_FEATURE_CATEGORY_LIST: Array<RoadmapCategoriesList> = [
  {
    key: 0,
    feature: "",
    color: "",
  },
  {
    key: 1,
    feature: RoadmapCategories["DATA_DISCOVERY & COLLABORATION"],
    color: CATEGORY_COLOR["DATA_DISCOVERY & COLLABORATION"],
  },
  {
    key: 2,
    feature: RoadmapCategories["DATA INSIGHTS"],
    color: CATEGORY_COLOR["DATA INSIGHTS"],
  },
  {
    key: 3,
    feature: RoadmapCategories["DATA QUALITY"],
    color: CATEGORY_COLOR["DATA QUALITY"],
  },
  {
    key: 4,
    feature: RoadmapCategories["APPLICATIONS"],
    color: CATEGORY_COLOR.APPLICATIONS,
  },
  {
    key: 5,
    feature: RoadmapCategories["DATA OBSERVABILITY"],
    color: CATEGORY_COLOR["DATA OBSERVABILITY"],
  },
  {
    key: 6,
    feature: RoadmapCategories["INTEGRATIONS"],
    color: CATEGORY_COLOR.INTEGRATIONS,
  },
  {
    key: 7,
    feature: RoadmapCategories["SECURITY"],
    color: CATEGORY_COLOR.SECURITY,
  },
];

export const ROADMAP_DATA: RoadmapData = {
  "RELEASE 1.4": [
    {
      category: RoadmapCategories["DATA_DISCOVERY & COLLABORATION"],
      features: [
        {
          label: "Bulk Import/Edit of Metadata",
          date: "Feb 7, 2024 – Apr 7, 2024",
          description:
            "Allow Users to bulk edit and update the metadata using APIs & UI.",
          isCollate: true,
        },
        {
          label: "Data LifeCycle - Certification",
          date: "Feb 7, 2024 – Apr 7, 2024",
          description:
            "Introduce Badges as concept to allow users to Certifiy Data Assets.",
        },
        {
          label:
            "Custom Properties - Additional Types, ENUMs, References to Users/Teams/Assets",
          date: "Feb 7, 2024 – Apr 7, 2024",
          description: "Additional Custom Properties to extend Metadata.",
        },
        {
          label: "Add Application Metadata Model",
          date: "Feb 7, 2024 – Apr 7, 2024",
          description:
            "Add Application Metadata Model to capture micro services and REST APIs as Metadata.",
        },
        {
          label: "Data Access Request Workflow",
          date: "Feb 7, 2024 – Apr 7, 2024",
          description:
            "Users can request access by opening a task against the owners of data assets in OpenMetadata.",
          isCollate: true,
        },
        {
          label: "Suggestions – Allow users to add suggestions.",
          date: "Feb 7, 2024 – Apr 7, 2024",
          description:
            "Users to improve Descriptions or Tagging by providing Suggestions. This makes it easy for users to update the documentation without opening Tasks.",
        },
        {
          label: "Glossary Terms Relations",
          date: "Feb 7, 2024 – Apr 7, 2024",
          description:
            "Users can define relationships and associate realtionship between entities and terms. ",
          isCollate: true,
        },
      ],
      release: 1.4,
    },
    {
      category: RoadmapCategories["DATA INSIGHTS"],
      features: [
        {
          label: "Cost Analysis Report - Improvements",
          date: "Feb 7, 2024 – Apr 7, 2024",
          isCollate: true,
          description:
            "Add support for additional data warehouses and improve the coverage.",
        },
      ],
      release: 1.4,
    },
    {
      category: RoadmapCategories["DATA QUALITY"],
      features: [
        {
          label: "Anomaly Detection",
          date: "Feb 7, 2024 – Apr 7, 2024",
          description:
            "Anomaly Detection to identify issues in Table Freshness, Completeness etc.",
          isCollate: true,
        },
        {
          label: "Column Profile Based on the column data type",
          date: "Feb 7, 2024 – Apr 7, 2024",
          isCollate: true,
          description:
            "Based on the Column data type run metrics that are applicable to the data type.",
        },
      ],
      release: 1.4,
    },
    {
      category: RoadmapCategories["APPLICATIONS"],
      features: [
        {
          label: "Metadata Actions",
          date: "Feb 7th, 2024 – April 7th, 2024",
          isCollate: true,
          description:
            "Build quick and easy workflows with rules and schedule them to propagate tags, update entities etc..",
        },
        {
          label: "MetaPilot - GenAI",
          date: "Feb 7th, 2024 – March 7th, 2024",
          isCollate: true,
          description:
            "Collate GenAI Implementation to automate the documentation generation and tags application. Bringing cutting-edge GenAI is our continuous effort and help data teams to be productive.",
        },
      ],
      release: 1.4,
    },
    {
      category: RoadmapCategories["DATA OBSERVABILITY"],
      features: [
        {
          label: "Data quality specific alerts",
          date: "Feb 7th, 2024 – April 4, 2024",
          description: "Create specific alerts for DQ such as schema change.",
        },
        {
          label: "Incident Manager Improvements",
          date: "Feb 7, 2023 – April 7, 2023",
          description:
            "Allow users to file incident not just for DQ failures but for pipelines or Table schema change etc.",
        },
      ],
      release: 1.4,
    },
    {
      category: RoadmapCategories["INTEGRATIONS"],
      features: [
        {
          label: "SAP ERP Connector",
          date: "Feb 7th, 2024 – March 7th, 2024",
          description: "SAP ERP Connector support.",
        },
        {
          label: "Kafka Connect",
          date: "Feb 7th, 2024 – March 7th, 2024",
          isCollate: true,
          description: "Kafka Connect Integration.",
        },
      ],
      release: 1.4,
    },
    {
      category: RoadmapCategories["SECURITY"],
      features: [
        {
          label: "Azure Secret Store Integration ",
          date: "Feb 7, 2024 – March 7, 2024",
          isCollate: true,
          description:
            "Implement Azure Secret Store to store any secrets from services.",
        },
        {
          label: "Manage Roles/Groups in SSO ",
          date: "Feb 7, 2024 – March 7, 2024",
          isCollate: true,
          description:
            "Admins can manage the Roles/Groups with SSO such as Okta and propagate these roles for users into OpenMetadata.",
        },
      ],
      release: 1.4,
    },
  ],
  "RELEASE 1.5": [
    {
      category: RoadmapCategories["DATA_DISCOVERY & COLLABORATION"],
      features: [
        {
          label: "Low Cardinality Columns Documentation",
          date: "April 10, 2024 – Jun 10, 2024",
          isCollate: true,
          description: "",
        },
        {
          label: "Support for Uploading Images",
          date: "April 10, 2024 – Jun 10, 2024",
          isCollate: true,
          description: "Upload images to description and knowledge articles",
        },
        {
          label: "Search/Explore Integrate with RBAC.",
          date: "April 10, 2024 – Jun 10, 2024",
          description:
            "Roles & Policies Integration into search and list the entities that are only available for users based on their role.",
        },
        {
          label: "Data Mesh - Sub Domains.",
          date: "April 10, 2024 – Jun 10, 2024",
          description: "Data Mesh , support for sub domains.",
        },
        {
          label: "Data Products Independent of Domains",
          date: "April 10, 2024 – Jun 10, 2024",
          description:
            "Allow users to tag Data Products without using the Domains.",
        },
      ],
      release: 1.5,
    },
    {
      category: RoadmapCategories["DATA INSIGHTS"],
      features: [
        {
          label: "Allow Users to create custom dashboards using Data Insights",
          date: "April 10, 2024 – Jun 10, 2024",
          isCollate: true,
          description:
            "Users will be able to explore all of the data analytics based on their metadata and create custom dashboards for CDOs and data leaders.",
        },
        {
          label: "Data Quality Dashboard",
          date: "April 10, 2024 – Jun 10, 2024",
          isCollate: true,
          description:
            "Data Quality Dashboard - Show the no.of tables in Tiers and their DQ coverage.",
        },
      ],
      release: 1.5,
    },
    {
      category: RoadmapCategories["DATA QUALITY"],
      features: [
        {
          label: "Data Asset SLAs",
          date: "April 10, 2024 – Jun 7, 2024",
          isCollate: true,
          description:
            "Allow data asset owners to provide SLAs around Completeness & Freshness.",
        },
        {
          label: "Capture Rows failed for DQ Tests",
          date: "April 10, 2024 – Jun 7, 2024",
          isCollate: true,
          description:
            "Based on the Column data type run metrics that are applicable to the data type.",
        },
      ],
      release: 1.5,
    },
    {
      category: RoadmapCategories["APPLICATIONS"],
      features: [
        {
          label: "Slack Application to interact with OpenMetadata",
          date: "April 10, 2024 – Jun 10, 2024",
          isCollate: true,
          description:
            "Slack application will allow users to interact with OpenMetadata.",
        },
        {
          label: "MetaPilot - Query Rewriting",
          date: "April 10th, 2024 – Jun 10th, 2024",
          isCollate: true,
          description:
            "Supporting Query rewrite to enhance the and optimize queries running in an organization",
        },
      ],
      release: 1.5,
    },
    {
      category: RoadmapCategories["INTEGRATIONS"],
      features: [
        {
          label: "Teradata",
          date: "April 7th, 2024 – June 7th, 2024",
          description: "Teradata Connector support.",
        },
        {
          label: "Azure Synapse",
          date: "April 7th, 2024 – June 7th, 2024",
          description: "Azure Synapse Integration.",
        },
      ],
      release: 1.5,
    },
  ],
  "RELEASE 1.6": [
    {
      category: RoadmapCategories["DATA QUALITY"],
      features: [
        {
          label: "Data Diff - Showing diff between tables",
          date: "Aug 10, 2024 – Oct 10, 2024",
          isCollate: true,
          description:
            "Users can run the queries against the data source and generate reports using our SQL editor.",
        },
        {
          label: "Anomaly Detection",
          date: "April 10, 2024 – Jun 7, 2024",
          isCollate: true,
          description:
            "ML Based Anomaly detection and improvements to the feature delivered in 1.4",
        },
        {
          label: "ER Diagram tool at schema level.",
          isCollate: true,
          date: "April 10 2024 - Jun 7, 2024",
          description: "ADD ER Diagram tool at schema level.",
        },
      ],
      release: 1.6,
    },
    {
      category: RoadmapCategories["APPLICATIONS"],
      features: [
        {
          label: "SQL Query Editor",
          date: "Aug 10, 2024 – Oct 10, 2024",
          isCollate: true,
          description:
            "Users can run the queries against the data source and generate reports using our SQL editor.",
        },
        {
          label: "Data Asset Naming Conventions",
          date: "Aug 10, 2024 – Oct 10, 2024",
          isCollate: true,
          description:
            "Define Data Asset naming convetions and use this app to enforce and send a report to teams.",
        },
        {
          label: "Reverse Metadata Applications",
          date: "Aug 10, 2024 – Oct 10, 2024",
          isCollate: true,
          description:
            "Pushing Metadata such as description/tags to data sources.",
        },
      ],
      release: 1.6,
    },
    {
      category: RoadmapCategories["DATA OBSERVABILITY"],
      features: [
        {
          label: "Root Cause Analysis",
          date: "Aug 10, 2024 – Oct 10, 2024",
          isCollate: true,
          description: "RCA of incidents and test failures.",
        },
      ],
      release: 1.6,
    },
    {
      category: RoadmapCategories["INTEGRATIONS"],
      features: [
        {
          label: "KSQL",
          date: "Aug 10th, 2024 – Oct 10th, 2024",
          description: "KSQL Connector support.",
        },
        {
          label: "Vertex AI",
          date: "Aug 10th, 2024 – Oct 10th, 2024",
          description: "Vertex AI support.",
        },
      ],
      release: 1.6,
    },
  ],
  "RELEASE 1.7": [
    {
      category: RoadmapCategories["DATA_DISCOVERY & COLLABORATION"],
      features: [
        {
          label: "NLP Search using LLMs",
          date: "Oct 10, 2024 – Dec 10, 2024",
          isCollate: true,
          description: "Support NLP querying for Search.",
        },
      ],
      release: 1.7,
    },
    {
      category: RoadmapCategories["DATA INSIGHTS"],
      features: [
        {
          label: "Pipeline Dashboard",
          date: "Oct 10, 2024 – Dec 10, 2024",
          isCollate: true,
          description:
            "Pipeline Dashboard - Show all ETL pipelines in an organization and how many succesful/failed/aborted/paused.",
        },
      ],
      release: 1.7,
    },
    {
      category: RoadmapCategories["DATA QUALITY"],
      features: [
        {
          label: "ML based DQ tests",
          date: "Oct 10, 2024 – Dec 10, 2024",
          isCollate: true,
          description: "Auto Suggest DQ Tests.",
        },
      ],
      release: 1.7,
    },
    {
      category: RoadmapCategories["INTEGRATIONS"],
      features: [
        {
          label: "Salesforce Dashboard",
          date: "Oct 10th, 2024 – Dec 10th, 2024",
          description: "Salesforce Dashboard support.",
        },
      ],
      release: 1.7,
    },
  ],
};
