---
title: Run the Dagster Connector Externally
description: Use YAML to set up Dagster pipeline ingestion and track transformations, dependencies, and metadata flows.
slug: /connectors/pipeline/dagster/yaml
---

{% connectorDetailsHeader
name="Dagster"
stage="PROD"
platform="OpenMetadata"
availableFeatures=["Pipelines", "Pipeline Status", "Tags", "Usage", "Lineage"]
unavailableFeatures=["Owners"]
/ %}


In this section, we provide guides and references to use the Dagster connector.

Configure and schedule Dagster metadata and profiler workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)

{% partial file="/v1.11/connectors/external-ingestion-deployment.md" /%}

## Requirements

### Python Requirements

{% partial file="/v1.11/connectors/python-requirements.md" /%}

To run the Dagster ingestion, you will need to install:

```bash
pip3 install "openmetadata-ingestion[dagster]"
```

## Metadata Ingestion

All connectors are defined as JSON Schemas.
[Here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/services/connections/pipeline/dagsterConnection.json)
you can find the structure to create a connection to Dagster.

In order to create and run a Metadata Ingestion workflow, we will follow
the steps to create a YAML configuration able to connect to the source,
process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following
[JSON Schema](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/workflow.json)

### 1. Define the YAML Config

This is a sample config for Dagster:

{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% codeInfo srNumber=1 %}

- **host**: host and port for dagster pipeline

**Note**: If dagster is deployed on `localhost` and entering `https://localhost:3000` into hostPort gives a connection refused error, please enter `https://127.0.0.1:3000` into the hostPort and try again.

{% /codeInfo %}

{% codeInfo srNumber=2 %}

**Token** : Need pass token if connecting to `dagster cloud` instance

{% /codeInfo %}

{% codeInfo srNumber=3 %}
**timeout** : Connection Time Limit Between OM and Dagster Graphql API in second
{% /codeInfo %}

{% codeInfo srNumber=4 %}

**stripAssetKeyPrefixLength**: Number of leading segments to remove from asset key paths before resolving to tables.

Dagster asset keys are path-like identifiers represented as arrays of strings (e.g., `["project", "environment", "schema", "table"]`). When OpenMetadata ingests Dagster pipelines, it tries to match these asset keys to table entities using the standard format: `database.schema.table` or `schema.table`.

If your Dagster asset keys include additional prefix segments beyond the database/schema/table hierarchy, use this setting to strip those prefixes. For example:
- Asset key: `["project", "environment", "schema", "table"]`
- Set value to `2` to strip `project` and `environment`
- Result: `schema.table` (matches OpenMetadata table entities)

Common use cases include stripping project/workspace identifiers, environment names (dev/staging/prod), or storage bucket/container prefixes.

Default value is `0` (no stripping).

{% /codeInfo %}

#### Source Configuration - Lineage

{% codeInfo srNumber=5 %}

**lineageInformation**: Configure lineage extraction settings.

- **dbServiceNames**: List of database service names to search for tables when creating lineage. If not specified, OpenMetadata searches all database services. Specifying services improves performance and accuracy.

For lineage to work, ensure:
- Your Dagster assets use [Software-Defined Assets](https://docs.dagster.io/concepts/assets/software-defined-assets)
- Asset dependencies are declared explicitly using `deps`
- Tables exist in OpenMetadata (run database ingestion first)
- Asset keys match table names (use `["database", "schema", "table"]` format)

{% /codeInfo %}

{% partial file="/v1.11/connectors/yaml/pipeline/source-config-def.md" /%}

{% partial file="/v1.11/connectors/yaml/ingestion-sink-def.md" /%}

{% partial file="/v1.11/connectors/yaml/workflow-config-def.md" /%}

{% /codeInfoContainer %}

{% codeBlock fileName="filename.yaml" %}


```yaml {% isCodeBlock=true %}
source:
  type: dagster
  serviceName: dagster_source
  serviceConnection:
    config:
      type: Dagster
```
```yaml {% srNumber=1 %}
        host: "https://<yourorghere>.dagster.cloud/prod"  # REQUIRED - Dagster instance URL
```
```yaml {% srNumber=2 %}
        token: token
```
```yaml {% srNumber=3 %}
        # timeout: 1000
```
```yaml {% srNumber=4 %}
        # stripAssetKeyPrefixLength: 0
```
```yaml {% srNumber=5 %}
  sourceConfig:
    config:
      type: PipelineMetadata
      # Specify database services to search for lineage tables
      lineageInformation:
        dbServiceNames:
          - my_postgres
          - my_snowflake
```

{% partial file="/v1.11/connectors/yaml/pipeline/source-config.md" /%}

{% partial file="/v1.11/connectors/yaml/ingestion-sink.md" /%}

{% partial file="/v1.11/connectors/yaml/workflow-config.md" /%}

{% /codeBlock %}

{% /codePreview %}

{% partial file="/v1.11/connectors/yaml/ingestion-cli.md" /%}
