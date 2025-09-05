---
title: Run the Snowplow Connector Externally
Description: Run the Snowplow connector externally with YAML to ingest pipelines, schemas, and lineage across BDP or Community deployments.
slug: /connectors/pipeline/snowplow/yaml
---

# Run the Snowplow Connector Externally

{% connectorDetailsHeader
name="Snowplow"
stage="BETA"
platform="Collate"
availableFeatures=["Pipelines", "Pipeline Status", "Lineage"]
unavailableFeatures=["Owners", "Tags"]
/ %}

In this section, we provide guides and references to use the Snowplow connector.

Configure and schedule Snowplow metadata workflow from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)

{% partial file="/v1.9/connectors/external-ingestion-deployment.md" /%}

## Requirements

### Snowplow BDP (Business Data Platform)

For Snowplow BDP deployments, you'll need:
- **Console URL**: The URL of your Snowplow Console (e.g., `https://console.snowplowanalytics.com`)
- **API Key**: An API key with read access to your Snowplow organization
- **Organization ID**: Your Snowplow BDP organization identifier

### Snowplow Community Edition

For self-hosted Community Edition deployments, you'll need:
- **Configuration Path**: The path to your Snowplow configuration files
- **Iglu Server URL** (optional): If you're using an Iglu Server for schema management

{% partial file="/v1.9/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/pipeline/snowplow/yaml"} /%}

## Metadata Ingestion

### 1. Define the YAML Config

This is a sample config for Snowplow:

{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% codeInfo srNumber=1 %}

**type**: Must be `Snowplow`.

{% /codeInfo %}

{% codeInfo srNumber=2 %}

**deployment**: Choose between `BDP` (managed) or `Community` (self-hosted).

{% /codeInfo %}

{% codeInfo srNumber=3 %}

**consoleUrl**: Required for BDP deployment. The URL of your Snowplow Console.

{% /codeInfo %}

{% codeInfo srNumber=4 %}

**apiKey**: Required for BDP deployment. Your Snowplow API key.

{% /codeInfo %}

{% codeInfo srNumber=5 %}

**organizationId**: Required for BDP deployment. Your organization ID.

{% /codeInfo %}

{% codeInfo srNumber=6 %}

**configPath**: Required for Community deployment. Path to configuration files.

{% /codeInfo %}

{% codeInfo srNumber=7 %}

**cloudProvider**: The cloud provider where Snowplow is deployed (AWS, GCP, or Azure).

{% /codeInfo %}

#### Source Configuration - Pipeline Filter Pattern

{% codeInfo srNumber=8 %}

To send the metadata of only selected pipelines, enter the regex pattern for pipeline names to include or exclude.

{% /codeInfo %}

{% partial file="/v1.9/connectors/yaml/pipeline/source-config-def.md" /%}

{% partial file="/v1.9/connectors/yaml/ingestion-sink-def.md" /%}

{% partial file="/v1.9/connectors/yaml/workflow-config-def.md" /%}

{% /codeInfoContainer %}

{% codeBlock fileName="filename.yaml" %}

```yaml {% isCodeBlock=true %}
source:
  type: snowplow
  serviceName: snowplow_pipeline
  serviceConnection:
    config:
      type: Snowplow
      deployment: BDP  # or Community {% srNumber=2 %}
      # For BDP deployment:
      consoleUrl: https://console.snowplowanalytics.com {% srNumber=3 %}
      apiKey: your-api-key {% srNumber=4 %}
      organizationId: your-org-id {% srNumber=5 %}
      # For Community deployment:
      # configPath: /path/to/snowplow/config {% srNumber=6 %}
      cloudProvider: AWS {% srNumber=7 %}
  sourceConfig:
    config:
      type: PipelineMetadata
      # pipelineFilterPattern:
      #   includes:
      #     - pipeline1
      #     - pipeline2
      #   excludes:
      #     - pipeline3
      #     - pipeline4
```

{% partial file="/v1.9/connectors/yaml/ingestion-sink.md" /%}

{% partial file="/v1.9/connectors/yaml/workflow-config.md" /%}

{% /codeBlock %}

{% /codePreview %}

- You can learn more about how to configure and run the Ingestion Framework [here](/connectors/ingestion-framework/run).

### 2. Run the Command

After saving the YAML config, run the following command:

```bash
metadata ingest -c <path-to-yaml>
```

## Data Model

The Snowplow connector extracts the following metadata:

- **Pipelines**: Each Snowplow pipeline is imported with its configuration
- **Pipeline Components**: Collectors, enrichments, and loaders are imported as pipeline tasks
- **Event Schemas**: Iglu schemas are imported as table entities showing the structure of events
- **Lineage**: Data flow from pipelines to destination tables is captured

### Supported Destinations

The connector can track lineage to the following Snowplow loader destinations:
- Amazon Redshift
- Google BigQuery
- Snowflake
- Databricks
- PostgreSQL
- Amazon S3 (Data Lake)
- Google Cloud Storage
- Azure Data Lake Storage

## Troubleshooting

### Connection Errors

If you encounter connection errors:

1. **For BDP**: Verify your API key has the necessary permissions and the organization ID is correct
2. **For Community**: Ensure the configuration path exists and is readable

### Missing Schemas

If Iglu schemas are not being imported:

1. **For BDP**: Check that your API key has access to the Iglu repositories
2. **For Community**: Verify the Iglu server URL is accessible or local schema files are present

### Performance

For large deployments with many schemas:
- Use pipeline and schema filter patterns to limit the scope of ingestion
- Consider running the ingestion during off-peak hours