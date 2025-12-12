---
title: Airbyte Connector | OpenMetadata Pipeline Integration
description: Connect Airbyte data pipelines to OpenMetadata for comprehensive data lineage tracking, metadata discovery, and pipeline monitoring. Setup guide included.
slug: /connectors/pipeline/airbyte
---

{% connectorDetailsHeader
name="Airbyte"
stage="PROD"
platform="OpenMetadata"
availableFeatures=["Pipelines", "Pipeline Status", "Lineage"]
unavailableFeatures=["Owners", "Tags"]
/ %}

In this section, we provide guides and references to use the Airbyte connector.

Configure and schedule Airbyte metadata and profiler workflows from the OpenMetadata UI:

- [Metadata Ingestion](#metadata-ingestion)
- [Troubleshooting](/connectors/pipeline/airbyte/troubleshooting)

{% partial file="/v1.12/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/pipeline/airbyte/yaml"} /%}

## Metadata Ingestion

{% partial 
  file="/v1.12/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "Airbyte", 
    selectServicePath: "/images/v1.12/connectors/airbyte/select-service.png",
    addNewServicePath: "/images/v1.12/connectors/airbyte/add-new-service.png",
    serviceConnectionPath: "/images/v1.12/connectors/airbyte/service-connection.png",
} 
/%}

{% stepsContainer %}
{% extraContent parentTagName="stepsContainer" %}

#### Connection Details

{% collateContent %}

{% note %} 

When using a **Hybrid Ingestion Runner**, any sensitive credential fields—such as passwords, API keys, or private keys—must reference secrets using the following format:

```
password: secret:/my/database/password
```

This applies **only to fields marked as secrets** in the connection form (these typically mask input and show a visibility toggle icon).

For a complete guide on managing secrets in hybrid setups, see the [Hybrid Ingestion Runner Secret Management Guide](https://docs.getcollate.io/getting-started/day-1/hybrid-saas/hybrid-ingestion-runner#3.-manage-secrets-securely).

{% /note %}

{% /collateContent %}

- **Host and Port**: Enter the full service endpoint as a URI in the format scheme://hostname:port.
  - Examples:
    - Local: `http://localhost:8000`
    - Docker: `http://host.docker.internal:8000`
    - Airbyte Cloud: `https://api.airbyte.com`

#### Authentication

Airbyte supports two authentication methods:

**Basic Authentication (for self-hosted Airbyte):**

- **Username**: Username to connect to Airbyte.

- **Password**: Password to connect to Airbyte.

**OAuth 2.0 Authentication (for Airbyte Cloud):**

To obtain OAuth credentials for Airbyte Cloud:

1. Log into your Airbyte Cloud account
2. Navigate to **User Settings > Applications**
3. Click **Create an application**
4. Name your application for easy identification
5. The system will automatically generate a `client_id` and `client_secret`

- **Client ID**: Client ID for the application registered in Airbyte.

- **Client Secret**: Client Secret for the application registered in Airbyte.

#### Other Settings

- **API Version**: The Airbyte REST API version to use. Defaults to `api/v1`. For Airbyte Cloud, you may simply use `v1`.

{% /extraContent %}

{% partial file="/v1.12/connectors/test-connection.md" /%}

{% partial file="/v1.12/connectors/pipeline/configure-ingestion.md" /%}

{% partial file="/v1.12/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}
