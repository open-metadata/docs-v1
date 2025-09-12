---
title: Hex Connector | OpenMetadata Integration Documentation
description: Connect Hex to OpenMetadata with our comprehensive dashboard connector guide. Setup instructions, configuration tips, and metadata extraction made simple.
slug: /connectors/dashboard/hex
---

{% connectorDetailsHeader
  name="Hex"
  stage="BETA"
  platform="OpenMetadata"
  availableFeatures=["Dashboards", "Charts", "Lineage", "Owners", "Tags"]
  unavailableFeatures=["Owners", "Datamodels"]
/ %}

In this section, we provide guides and references to use the Hex connector.

Configure and schedule Hex metadata and profiler workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)
- [Troubleshooting](/connectors/dashboard/hex/troubleshooting)

{% partial file="/v1.9/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/dashboard/hex/yaml"} /%}

## Requirements

{% note %}
Hex connector supports both personal and workspace tokens for authentication.
{% /note %}

### Hex Account Setup

Follow the steps below to configure the account setup for Hex connector:

### Step 1: Generate API Token

To generate an API token in Hex:

1. Log into your [Hex](https://app.hex.tech) account
2. Navigate to Account Settings
3. Go to the API Keys section
4. Click on "Create API Key"
5. Choose the token type:
   - **Personal Token**: Provides access to projects you own or have access to
   - **Workspace Token**: Provides access to all projects in the workspace (requires admin privileges)
6. Copy and securely store the generated token

{% note noteType="Warning" %}
API tokens are shown only once when created. Make sure to copy and store them securely.
{% /note noteType="Warning" %}
{% /note %}

### Step 2: Verify API Access

Ensure that the token has appropriate permissions:
- For personal tokens: Verify you have access to the projects you want to ingest
- For workspace tokens: Verify admin privileges are granted

## Metadata Ingestion

{% partial 
  file="/v1.9/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "Hex", 
    selectServicePath: "/images/v1.9/connectors/hex/select-service.png",
    addNewServicePath: "/images/v1.9/connectors/hex/add-new-service.png",
    serviceConnectionPath: "/images/v1.9/connectors/hex/service-connection.png",
} 
/%}

{% stepsContainer %}
{% extraContent parentTagName="stepsContainer" %}

#### Connection Details

**hostPort**: URL to the Hex instance.

Provide the URL to your Hex instance. For Hex cloud users, use `https://app.hex.tech`.

For on-premise installations, provide your custom domain URL.

**tokenType**: Type of authentication token.

Select the type of token you're using:
- **personal**: Personal access token (default)
- **workspace**: Workspace-level token (requires admin privileges)

**token**: Hex API Token.

Provide the API token generated from your Hex account. This token is used for authentication with the Hex APIs.

To generate a token:
- Log into Hex
- Go to Account Settings > API Keys
- Create a new API key
- Copy the generated token

**includeTags**: Import Hex Categories and Status as Tags.

Enable this option to import Hex project categories and status as OpenMetadata tags. This helps in organizing and filtering your Hex projects within OpenMetadata.

By default, this is set to `true`.

**Dashboard Filter Pattern**:

Use regex patterns to include or exclude specific dashboards from ingestion. This helps you control which Hex projects are imported into OpenMetadata.

Examples:
- Include only production projects: `^prod-.*`
- Exclude test projects: `^(?!test-).*`

{% /extraContent %}

{% partial file="/v1.9/connectors/test-connection.md" /%}

{% partial file="/v1.9/connectors/dashboard/configure-ingestion.md" /%}

{% partial file="/v1.9/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}

## Lineage

Hex connector extracts lineage information by:
- **Warehouse Query History**: Directly queries data warehouse logs (Snowflake, BigQuery, Databricks, Redshift, etc.) to find queries executed by Hex
- **Hex Metadata Identification**: Identifies Hex-originated queries using metadata comments embedded by Hex containing project IDs
- **SQL Parsing**: Analyzes the discovered SQL queries to extract upstream table dependencies

The lineage information helps you understand:
- Which data warehouse tables are actually queried by each Hex project
- Real data usage patterns based on executed queries
- Impact analysis when making changes to underlying data sources

**Note**: The connector does not use Hex APIs for lineage. Instead, it discovers lineage by analyzing actual queries executed in your data warehouses, providing more accurate data dependency information.

### Warehouse Query Log Requirements

For lineage extraction to work, query logging must be enabled in your data warehouse:

#### Snowflake
- Requires access to `SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY`
- Query history is automatically maintained by Snowflake

#### BigQuery
- Requires access to `INFORMATION_SCHEMA.JOBS_BY_PROJECT`
- Query history is automatically maintained by BigQuery

#### MySQL
- Requires general_log to be enabled:
```sql
SET GLOBAL general_log = 'ON';
SET GLOBAL log_output = 'TABLE';
```
- Grant access to `mysql.general_log` table

#### Databricks
- Requires access to `system.query.history`
- Query history is automatically maintained

#### Redshift
- Requires access to `stl_query` system table
- Query history is automatically maintained

#### Other Warehouses
- Athena: Access to query history via CloudTrail or S3 logs
- ClickHouse: Access to `system.query_log` table

## Troubleshooting

### Common Issues

#### Authentication Failures
- Verify that your API token is valid and hasn't expired
- Check that the token type matches your access level (personal vs workspace)
- Ensure the API token has necessary permissions

#### Missing Projects
- For personal tokens: Verify you have access to the projects
- For workspace tokens: Confirm admin privileges
- Check the dashboard filter pattern configuration

#### Connection Timeouts
- Verify the hostPort URL is correct
- Check network connectivity to Hex
- For on-premise installations, ensure firewall rules allow access

#### Rate Limiting
- Hex APIs may have rate limits
- Consider adjusting the ingestion schedule if you encounter rate limit errors
- Contact Hex support if persistent rate limiting issues occur