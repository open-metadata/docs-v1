---
title: Run the Hex Connector Externally
description: Learn how to configure Hex dashboard connectors in OpenMetadata using YAML. Step-by-step setup guide with examples and best practices.
slug: /connectors/dashboard/hex/yaml
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

{% partial file="/v1.10/connectors/external-ingestion-deployment.md" /%}

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

### Python Requirements

{% partial file="/v1.10/connectors/python-requirements.md" /%}

To run the Hex ingestion, you will need to install:

```bash
pip3 install "openmetadata-ingestion[hex]"
```

## Metadata Ingestion

All connectors are defined as JSON Schemas.
[Here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/services/connections/dashboard/hexConnection.json)
you can find the structure to create a connection to Hex.

In order to create and run a Metadata Ingestion workflow, we will follow
the steps to create a YAML configuration able to connect to the source,
process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following
[JSON Schema](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/workflow.json)

### 1. Define the YAML Config

This is a sample config for Hex:

{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% codeInfo srNumber=1 %}

**hostPort**: URL to the Hex instance.

Provide the URL to your Hex instance. For Hex cloud users, use `https://app.hex.tech`.

For on-premise installations, provide your custom domain URL.

{% /codeInfo %}

{% codeInfo srNumber=2 %}

**tokenType**: Type of authentication token.

Select the type of token you're using:
- **personal**: Personal access token (default) - Provides access to projects you own or have access to
- **workspace**: Workspace-level token - Provides access to all projects in the workspace (requires admin privileges)

{% /codeInfo %}

{% codeInfo srNumber=3 %}

**token**: Hex API Token.

Provide the API token generated from your Hex account. This token is used for authentication with the Hex APIs.

To generate a token:
- Log into Hex
- Go to Account Settings > API Keys
- Create a new API key
- Copy the generated token

Note: API tokens are shown only once when created. Make sure to copy and store them securely.

{% /codeInfo %}

{% codeInfo srNumber=4 %}

**includeTags**: Import Hex Categories and Status as Tags.

Enable this option to import Hex project categories and status as OpenMetadata tags. This helps in organizing and filtering your Hex projects within OpenMetadata.

By default, this is set to `true`.

When enabled, the following will be imported as tags:
- Project categories
- Project status (e.g., published, draft)
- Other project metadata tags

{% /codeInfo %}

{% codeInfo srNumber=5 %}

**Dashboard Filter Pattern**:

Use regex patterns to include or exclude specific dashboards from ingestion. This helps you control which Hex projects are imported into OpenMetadata.

The filter pattern supports:
- `includes`: List of regex patterns for dashboards to include
- `excludes`: List of regex patterns for dashboards to exclude

Examples:
- Include only production projects: `^prod-.*`
- Exclude test projects: `^(?!test-).*`
- Include specific project names: `^(analytics|reporting|metrics).*`

{% /codeInfo %}

{% partial file="/v1.10/connectors/yaml/dashboard/source-config-def.md" /%}

{% partial file="/v1.10/connectors/yaml/ingestion-sink-def.md" /%}

{% partial file="/v1.10/connectors/yaml/workflow-config-def.md" /%}

{% /codeInfoContainer %}

{% codeBlock fileName="filename.yaml" %}

```yaml {% isCodeBlock=true %}
source:
  type: hex
  serviceName: local_hex
  serviceConnection:
    config:
      type: Hex
```
```yaml {% srNumber=1 %}
      hostPort: https://app.hex.tech
```
```yaml {% srNumber=2 %}
      tokenType: personal  # or workspace
```
```yaml {% srNumber=3 %}
      token: your-hex-api-token
```
```yaml {% srNumber=4 %}
      includeTags: true  # default: true
```
```yaml {% srNumber=5 %}
      # Optional: Filter patterns for dashboards
      # dashboardFilterPattern:
      #   includes:
      #     - "^production.*"
      #     - "^analytics.*"
      #   excludes:
      #     - ".*test.*"
      #     - ".*dev.*"
```

{% partial file="/v1.10/connectors/yaml/dashboard/source-config.md" /%}

{% partial file="/v1.10/connectors/yaml/ingestion-sink.md" /%}

{% partial file="/v1.10/connectors/yaml/workflow-config.md" /%}

{% /codeBlock %}

{% /codePreview %}

### 2. Run with the CLI

First, we will need to save the YAML file. Afterward, and with all requirements installed, we can run:

```bash
metadata ingest -c <path-to-yaml>
```

Note that from connector to connector, this recipe will always be the same. By updating the YAML configuration, you will be able to extract metadata from different sources.

## Advanced Configuration

### Working with Multiple Workspaces

If you need to ingest metadata from multiple Hex workspaces, you can:

1. **Use Workspace Tokens**: If you have admin access, use workspace tokens to access all projects in each workspace
2. **Create Multiple Services**: Create separate Hex services in OpenMetadata for each workspace
3. **Use Filter Patterns**: Apply filter patterns to organize projects by workspace

### Scheduling Ingestion

For production environments, consider:
- Setting up regular ingestion schedules (e.g., daily or hourly)
- Using workflow orchestration tools like Airflow
- Monitoring ingestion logs for failures
- Setting up alerts for ingestion issues

### Performance Optimization

For large Hex deployments:
- Use filter patterns to limit the scope of ingestion
- Consider running ingestion during off-peak hours
- Monitor API rate limits and adjust accordingly
- Use incremental ingestion where possible

## Lineage

Hex connector extracts lineage information by:
- **Warehouse Query History**: Directly queries data warehouse logs (Snowflake, BigQuery, Databricks, Redshift, etc.) to find queries executed by Hex
- **Hex Metadata Identification**: Identifies Hex-originated queries using metadata comments embedded by Hex containing project IDs
- **SQL Parsing**: Analyzes the discovered SQL queries to extract upstream table dependencies

### Lineage Configuration

To configure lineage extraction, add the `lineageInformation` section with `dbServicePrefixes` to specify which database services to query:

```yaml
sourceConfig:
  config:
    type: DashboardMetadata
    lineageInformation:
      dbServicePrefixes:
        - local_clickhouse            # Example: ClickHouse service
        - prod                        # Matches services starting with "prod"
        - bigquery.dataset1           # Specific BigQuery dataset
        - snowflake.PROD_DB.PUBLIC    # Specific Snowflake schema
        - mysql.openmetadata_db       # Specific MySQL database
```

## Troubleshooting

### Common Issues

#### Authentication Failures
```
Error: Authentication failed with provided token
```
**Solution**: 
- Verify your API token is valid and hasn't expired
- Check that the token type matches your access level
- Ensure the token has necessary permissions

#### Missing Projects
```
Warning: Expected projects not found in ingestion
```
**Solution**:
- For personal tokens: Verify you have access to the projects
- For workspace tokens: Confirm admin privileges
- Review dashboard filter patterns

#### Connection Timeouts
```
Error: Connection timeout to Hex API
```
**Solution**:
- Verify the hostPort URL is correct
- Check network connectivity
- For on-premise installations, ensure firewall rules allow access

#### Rate Limiting
```
Error: API rate limit exceeded
```
**Solution**:
- Reduce ingestion frequency
- Contact Hex support for rate limit increases
- Implement exponential backoff in retry logic

### Debug Mode

To enable debug logging for troubleshooting:

```yaml
workflowConfig:
  loggerLevel: DEBUG
```

This will provide detailed logs about:
- API calls being made
- Response data received
- Processing steps
- Any errors or warnings

{% partial file="/v1.10/connectors/yaml/ingestion-cli.md" /%}