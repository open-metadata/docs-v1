---
title: Snowplow Connector for Pipeline Metadata | Collate
Description: Configure and schedule Snowplow metadata ingestion to track pipelines, lineage, and statuses. Supports BDP and Community deployments with flexible setup.
slug: /connectors/pipeline/snowplow
collate: true
---

{% connectorDetailsHeader
name="Snowplow"
stage="BETA"
platform="Collate"
availableFeatures=["Pipelines", "Pipeline Status", "Lineage"]
unavailableFeatures=["Tags", "Owners"]
/ %}

In this section, we provide guides and references to use the Snowplow connector.

Configure and schedule Snowplow metadata workflow from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)
    - [Connection Details](#connection-details)
- [Troubleshooting](/connectors/pipeline/snowplow/troubleshooting)

{% partial file="/v1.9/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/pipeline/snowplow/yaml"} /%}

## Requirements

The Snowplow connector supports two deployment types:

### BDP (Business Data Platform) Deployment
For Snowplow BDP managed deployments, you need:
- Access to the Snowplow Console
- An API Key with read permissions for accessing pipeline configurations
- Your Organization ID from the Snowplow Console

### Community Deployment
For self-hosted Snowplow Community deployments, you need:
- Access to your Snowplow pipeline configuration files
- Read permissions on the configuration directory
- The file system path to your configuration files

## Metadata Ingestion

{% partial 
  file="/v1.9/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "Snowplow", 
    selectServicePath: "/images/v1.9/connectors/snowplow/select-service.png",
    addNewServicePath: "/images/v1.9/connectors/snowplow/add-new-service.png",
    serviceConnectionPath: "/images/v1.9/connectors/snowplow/service-connection.png",
} 
/%}

{% stepsContainer %}
{% extraContent parentTagName="stepsContainer" %}

#### Connection Details

- **Deployment Type**: Select your Snowplow deployment type:
  - **BDP**: For Snowplow's managed Business Data Platform
  - **Community**: For self-hosted Snowplow deployments

The required configuration fields will change based on your deployment type selection.

### BDP Deployment Configuration

For BDP deployments, provide the following:

- **Console URL**: The base URL of your Snowplow Console where you access the UI (e.g., `https://console.snowplow.io`)

- **API Key**: Your Snowplow Console API Key with appropriate read permissions. To generate an API key:
  1. Log into your Snowplow Console
  2. Navigate to Account Settings
  3. Select the API Keys section
  4. Create a new API key with read permissions for pipeline configurations

- **Organization ID**: Your unique Snowplow BDP Organization ID. You can find this in:
  - Snowplow Console Account Settings
  - The URL when accessing your console (e.g., `https://console.snowplow.io/organizations/{org-id}`)

### Community Deployment Configuration

For Community deployments, provide:

- **Configuration Path**: The file system path to your Snowplow pipeline configuration files. This should point to the directory containing your Snowplow configuration files such as:
  - Collector configurations
  - Enrichment configurations
  - Storage loader configurations
  - Pipeline orchestration files
  
  Example: `/opt/snowplow/configs`

> **Important:**  
> If you are using the **Configuration Path** option for Community deployments, you must run the ingestion workflow through the **CLI** instead of the UI. This is because the ingestion process needs direct access to your local filesystem, which is not available when running ingestion jobs from the UI or server.

### Additional Configuration

- **Cloud Provider**: Select the cloud provider where your Snowplow infrastructure is deployed:
  - **AWS**: Amazon Web Services (default)
  - **GCP**: Google Cloud Platform
  - **Azure**: Microsoft Azure
  
  This information helps optimize metadata extraction based on cloud-specific configurations.

- **Pipeline Filter Pattern**: Optionally provide a regular expression pattern to exclude certain pipelines from ingestion. Examples:
  - Exclude test pipelines: `.*test.*`
  - Exclude development pipelines: `^dev-.*`
  - Exclude multiple patterns: `(.*test.*|.*dev.*|.*staging.*)`
  
  Leave empty to ingest all available pipelines.

{% /extraContent %}

{% partial file="/v1.9/connectors/test-connection.md" /%}

{% partial file="/v1.9/connectors/pipeline/configure-ingestion.md" /%}

{% partial file="/v1.9/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}