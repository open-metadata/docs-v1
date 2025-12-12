---
title: Run the Airbyte Connector Externally
description: Use YAML to configure Airbyte ingestion and extract metadata from pipeline sources and syncs.
slug: /connectors/pipeline/airbyte/yaml
---

{% connectorDetailsHeader
name="Airbyte"
stage="PROD"
platform="OpenMetadata"
availableFeatures=["Pipelines", "Pipeline Status", "Lineage", "Usage"]
unavailableFeatures=["Owners", "Tags"]
/ %}

In this section, we provide guides and references to use the Airbyte connector.

Configure and schedule Airbyte metadata and profiler workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)

{% partial file="/v1.12/connectors/external-ingestion-deployment.md" /%}

## Requirements

### Python Requirements

{% partial file="/v1.12/connectors/python-requirements.md" /%}

To run the Airbyte ingestion, you will need to install:

```bash
pip3 install "openmetadata-ingestion[airbyte]"
```

## Metadata Ingestion

All connectors are defined as JSON Schemas.
[Here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/services/connections/pipeline/airbyteConnection.json)
you can find the structure to create a connection to Airbyte.

In order to create and run a Metadata Ingestion workflow, we will follow
the steps to create a YAML configuration able to connect to the source,
process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following
[JSON Schema](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/workflow.json)

### 1. Define the YAML Config

This is a sample config for Airbyte:

{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% codeInfo srNumber=1 %}

**hostPort**: Enter the full service endpoint as a URI in the format scheme://hostname:port.
- Examples:
  - Local: `http://localhost:8000`
  - Docker: `http://host.docker.internal:8000`
  - Airbyte Cloud: `https://api.airbyte.com`

{% /codeInfo %}

#### Authentication

Airbyte supports two authentication methods:

**Basic Authentication (for self-hosted Airbyte):**

{% codeInfo srNumber=2 %}

**username**: Username to connect to Airbyte.

{% /codeInfo %}

{% codeInfo srNumber=3 %}

**password**: Password to connect to Airbyte.

{% /codeInfo %}

**OAuth 2.0 Authentication (for Airbyte Cloud):**

{% codeInfo srNumber=4 %}

**clientId**: Client ID for the application registered in Airbyte.

{% /codeInfo %}

{% codeInfo srNumber=5 %}

**clientSecret**: Client Secret for the application registered in Airbyte.

{% /codeInfo %}

#### Other Settings

{% codeInfo srNumber=6 %}

**apiVersion**: The Airbyte REST API version to use. Defaults to `api/v1`. For Airbyte Cloud, you may simply use `v1`.

{% /codeInfo %}


{% partial file="/v1.12/connectors/yaml/pipeline/source-config-def.md" /%}

{% partial file="/v1.12/connectors/yaml/ingestion-sink-def.md" /%}

{% partial file="/v1.12/connectors/yaml/workflow-config-def.md" /%}


{% /codeInfoContainer %}

{% codeBlock fileName="filename.yaml" %}


```yaml {% isCodeBlock=true %}
source:
  type: airbyte
  serviceName: airbyte_source
  serviceConnection:
    config:
      type: Airbyte
```
```yaml {% srNumber=1 %}
      hostPort: http://localhost:8000
```
```yaml {% srNumber=2 %}
      # Basic Authentication (for self-hosted Airbyte)
      username: <username>
```
```yaml {% srNumber=3 %}
      password: <password>
```
```yaml {% srNumber=4 %}
      # OAuth 2.0 Authentication (for Airbyte Cloud)
      # clientId: <client_id>
```
```yaml {% srNumber=5 %}
      # clientSecret: <client_secret>
```
```yaml {% srNumber=6 %}
      apiVersion: api/v1
```

{% partial file="/v1.12/connectors/yaml/pipeline/source-config.md" /%}

{% partial file="/v1.12/connectors/yaml/ingestion-sink.md" /%}

{% partial file="/v1.12/connectors/yaml/workflow-config.md" /%}

{% /codeBlock %}

{% /codePreview %}

{% partial file="/v1.12/connectors/yaml/ingestion-cli.md" /%}
