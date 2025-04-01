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

export const ALL_RELEASES_URL = "/releases/all-releases";

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
    feature: RoadmapCategories["LINEAGE"],
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
          label:
            "Custom Properties - Additional Types, ENUMs, References to Users/Teams/Assets",
          description:
            "Additional Custom Properties to extend Metadata. Users can add ENUMs, References to Users/Teams/Assets. This allows users to add more context to the metadata.",
        },
        {
          label: "Schema Definition for Tables.",
          description:
            "Users can view the create table statement for the table. This metadata is automatically colleced from the source.",
        },
        {
          label: "Suggestions – Allow users to add suggestions.",
          description:
            "Users to improve Descriptions or Tagging by providing Suggestions. This makes it easy for users to update the documentation without opening Tasks.",
        },
      ],
      release: 1.4,
    },
    {
      category: RoadmapCategories["DATA INSIGHTS"],
      features: [
        {
          label: "Data Insights Improvements",
          description:
            "Users can drill down to view data assets without descriptions or ownership.",
        },
      ],
      release: 1.4,
    },
    {
      category: RoadmapCategories["DATA QUALITY"],
      features: [
        {
          label: "Show data quality tests for each column.",
          description:
            "Data quality tests are visible in schema tab and in data quality tab.",
        },
        {
          label: "Data Profiler Improvements",
          description:
            "We now compute Unique and Count in the same query to avoid inconsistency due to the high frequency of data insertion.",
        },
        {
          label: "UI performance improvements",
          description:
            "UI performance improvements for Data Quality tests results.",
        },
        {
          label: "Global Data Profiler Configuration.",
          description:
            "Admins can configure the global data profiler settings and exclude/include certain metrics calculation across the tables.",
        },
        {
          label: "Support for complex types in Redshift & DynamoDB.",
          description: "Support for complex types in Redshift & DynamoDB.",
        },
        {
          label: "Incident Manager Improvements",
          description:
            "Notifications are sent for the tasks created by the Incident Manager.",
        },
      ],
      release: 1.4,
    },
    {
      category: RoadmapCategories["LINEAGE"],
      features: [
        {
          label:
            "Field Level Lineage for Containers/Topics/MlModels/Dashboards",
          description:
            "OpenMetadata already supports Column-level lineage, and now we have introduced Task-level lineage for Pipelines, Chart-level lineage for Dashboards, Feature-level lineage for ML Models, Field-level lineage for Topics, and columns for dashboard Data Models.",
        },
        {
          label:
            "Automated Column Level Lineage Tableau, Superset, QlikCloud, and QlikSense",
          description:
            "Automated column-level lineage is now supported for Tableau, Superset, QlikCloud, and QlikSense between Data Models and Tables.",
        },
        {
          label: "Lineage - Introducing Layers.",
          description:
            "Layers in lineage allows users to add incrementally critical information to lineage. For example, a user can add a layer to show the lineage with Data Observability information.",
        },
        {
          label: "Lineage - Export the Lineage data.",
          description:
            "Export the lineage data in CSV format for further analysis.",
        },
        {
          label:
            "Lineage - Support for PowerBI DAX files & Snowflake Dynamic tables.",
          description:
            "We now parse PowerBi DAX files for lineage and support Snowflake Dynamic tables.",
        },
        {
          label: "Lineage - Improvements to Spark Agent.",
          description:
            "OpenMetadata spark agent now supports automated lineage between tables and their origin storage container.",
        },
        {
          label: "Lineage - UX Improvements.",
          description:
            "The child nodes in a lineage graph are sorted in alphabetical order.",
        },
      ],
      release: 1.4,
    },
    {
      category: RoadmapCategories["DATA OBSERVABILITY"],
      features: [
        {
          label: "Activity Feed Improvements",
          description:
            "The Activity Feed provides more contextual information, removing the need to move to entity pages.",
        },
        {
          label: "Alert Improvements",
          description:
            "Alerts give more accurate information about the entity, as well as conversations and tasks associated with the alert.",
        },
      ],
      release: 1.4,
    },
    {
      category: RoadmapCategories["INTEGRATIONS"],
      features: [
        {
          label: "QilkCloud Connector.",
          description: "QilkCloud Connector.",
        },
        {
          label: "Kafka Connect",
          description: "Kafka Connect Integration.",
        },
        {
          label: "Complex Protobuf Parsing support",
          description: "Complex Protobuf Parsing support.",
        },
        {
          label: "Improved Model storage ingestion in Sagemaker and MlFlow.",
          description:
            "Improved Model storage ingestion in Sagemaker and MlFlow.",
        },
        {
          label: "Revamped SSL support for all connectors.",
          description:
            "Revamped SSL support to allow users to upload the required certificates directly in the UI.",
        },
        {
          label: "Added support for Azure Auth in Trino",
          description: "Added support for Azure Auth in Trino.",
        },
      ],
      release: 1.4,
    },
    {
      category: RoadmapCategories["SECURITY"],
      features: [
        {
          label: "Azure Secret Store Integration ",
          description:
            "Implement Azure Secret Store to store any secrets from services.",
        },
        {
          label: "Manage Roles/Groups in SSO ",
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
          label: "Search/Explore Integrate with RBAC.",
          description:
            "Roles & Policies Integration into search and list the entities that are only available for users based on their role.",
        },
        {
          label: "Data Mesh - Sub Domains.",
          description: "Data Mesh , support for sub domains.",
        },
        {
          label: "Data Products Independent of Domains",
          description:
            "Allow users to tag Data Products without using the Domains.",
        },
        {
          label: "Add Application Metadata Model",
          description:
            "Add Application Metadata Model to capture micro services and REST APIs as Metadata.",
        },
        {
          label: "Glossary Terms Relations",
          description:
            "Users can define relationships and associate realtionship between entities and terms. ",
        },
      ],
      release: 1.5,
    },
    {
      category: RoadmapCategories["DATA INSIGHTS"],
      features: [
        {
          label: "Data Insights Improvements",
          description:
            "Improved data insights collection in backend and using search to provide multiple insights.",
        },
        {
          label: "Add custom KPIs.",
          description: "Support for custom KPIs.",
        },
      ],
      release: 1.5,
    },
    {
      category: RoadmapCategories["DATA QUALITY"],
      features: [
        {
          label: "Data Asset SLAs",
          description:
            "Allow data asset owners to provide SLAs around Completeness & Freshness.",
        },
      ],
      release: 1.5,
    },
    {
      category: RoadmapCategories["LINEAGE"],
      features: [],
      release: 1.5,
    },
    {
      category: RoadmapCategories["INTEGRATIONS"],
      features: [
        {
          label: "Teradata",
          description: "Teradata Connector support.",
        },
        {
          label: "Azure Synapse",
          description: "Azure Synapse Integration.",
        },
      ],
      release: 1.5,
    },
  ],
  "RELEASE 1.6": [
    {
      category: RoadmapCategories["DATA QUALITY"],
      features: [],
      release: 1.6,
    },
    {
      category: RoadmapCategories["LINEAGE"],
      features: [
        {
          label: "Data Asset Naming Conventions",
          description:
            "Define Data Asset naming convetions and use this app to enforce and send a report to teams.",
        },
        {
          label: "Reverse Metadata Applications",
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
          description: "RCA of incidents and test failures.",
        },
      ],
      release: 1.6,
    },
    {
      category: RoadmapCategories["INTEGRATIONS"],
      features: [
        {
          label: "Flink",
          description: "Flink Connector support.",
        },
        {
          label: "Vertex AI",
          description: "Vertex AI support.",
        },
      ],
      release: 1.6,
    },
  ],
  "RELEASE 1.7": [
    {
      category: RoadmapCategories["DATA_DISCOVERY & COLLABORATION"],
      features: [],
      release: 1.7,
    },
    {
      category: RoadmapCategories["DATA INSIGHTS"],
      features: [
        {
          label: "Pipeline Dashboard",
          description:
            "Pipeline Dashboard - Show all ETL pipelines in an organization and how many succesful/failed/aborted/paused.",
        },
      ],
      release: 1.7,
    },
    {
      category: RoadmapCategories["DATA QUALITY"],
      features: [],
      release: 1.7,
    },
    {
      category: RoadmapCategories["INTEGRATIONS"],
      features: [
        {
          label: "Salesforce Dashboard",
          description: "Salesforce Dashboard support.",
        },
      ],
      release: 1.7,
    },
    {
        category: 'DATA OBSERVABILITY',
        features: [
        ],
        release: 1.7,
    },
    {
        category: 'INTEGRATIONS',
        features: [
        ],
        release: 1.7,
    },
    {
        category: 'GOVERNANCE',
        features: [
            {
                label: 'SCIM Integration.',
                description:
                    'SSO integration with SCIM to import users/groups.',
            },
            {
                label: 'Certification Workflow',
                description:
                    'Allow Data Stewards to specify automated certification of data assets into Bronze/Silver/Gold.',
            },
            {
                label: 'Data Access Request Workflow',
                description:
                    'Allow users to request access to data assets and go through the approval process to gain access to data assets.',
            },
        ],
        release: 1.7,
    },
]

export const RELEASE_1_8 = [
    {
        category: 'release',
        version: '1.8',
    },
    {
        category: 'DATA_DISCOVERY & COLLABORATION',
        features: [
            {
                label: 'Discussions',
                description:
                    'Allow users to have asset/team/org wide discussions on data.',
            },
        ],
        release: 1.8,
    },
    {
        category: 'DATA INSIGHTS',
        features: [
        ],
        release: 1.8,
    },
    {
        category: 'DATA QUALITY',
        features: [
        ],
        release: 1.8,
    },
    {
        category: 'APPLICATIONS',
        features: [
        ],
        release: 1.8,
    },
    {
        category: 'DATA OBSERVABILITY',
        features: [
        ],
        release: 1.8,
    },
    {
        category: 'INTEGRATIONS',
        features: [
        ],
        release: 1.8,
    },
    {
        category: 'GOVERNANCE',
        features: [
             {
                label: 'Glossary Terms Relations',
                description:
                    'Customizable Relations between the Glossary Terms and Assets.',
            },
        ],
        release: 1.8,
    },
]
