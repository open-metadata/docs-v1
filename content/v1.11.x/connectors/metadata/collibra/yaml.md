---
title: Run the Collibra Connector Externally
description: Use YAML to configure Collibra metadata integration and capture glossary terms, domains, and asset enrichment.
slug: /connectors/metadata/collibra/yaml
collate: true
---

{% connectorDetailsHeader
name="Collibra"
stage="BETA"
platform="Collate"
availableFeatures=["Metadata"]
unavailableFeatures=[]
/ %}

In this section, we provide guides and references to use the Collibra connector.

Configure and schedule Collibra metadata workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)


{% partial file="/v1.11/connectors/external-ingestion-deployment.md" /%}

## Requirements

To connect to Collibra, you will need:
- **Username**: A user account with privileges to read all metadata in Collibra
- **Password**: The password for the user account
- **Host and Port**: The URL of your Collibra instance (e.g., https://your-instance.collibra.com)

## Data Mapping and Assumptions

Following entities are supported and will be mapped to the OpenMetadata entities as shown below.

{% multiTablesWrapper %}

| Collibra Entity          | OpenMetadata Entity          |
| :----------------------- | :--------------------------- |
| Glossary                 | Glossary                     |
| Glossary Terms           | Glossary Terms               |
| Domains                  | Domains                      |
| Communities              | Domains                      |

{% /multiTablesWrapper %}

- Collibra glossaries will be mapped to OpenMetadata glossaries with their terms and relationships preserved.
- When **Enable Asset Enrichment** is enabled, the connector will match Collibra assets to existing OpenMetadata entities and enrich them with descriptions, tags, and ownership information from Collibra without creating new assets.


### Python Requirements

To run the Collibra ingestion, you will need to install:

```bash
pip3 install "openmetadata-ingestion[collibra]"
```

## Metadata Ingestion

All connectors are defined as JSON Schemas.
[Here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/services/connections/metadata/collibraConnection.json)
you can find the structure to create a connection to Collibra.

In order to create and run a Metadata Ingestion workflow, we will follow
the steps to create a YAML configuration able to connect to the source,
process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following
[JSON Schema](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/workflow.json)

### 1. Define the YAML Config

{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% codeInfo srNumber=12 %}

**hostPort**: Host and port of the Collibra instance.

{% /codeInfo %}

{% codeInfo srNumber=13 %}

**username**: Username to connect to Collibra. This user should have privileges to read all the metadata in Collibra.

{% /codeInfo %}

{% codeInfo srNumber=14 %}

**password**: Password for the Collibra user account.

{% /codeInfo %}

{% codeInfo srNumber=15 %}

**glossaryFilterPattern**: Regex pattern to include or exclude glossaries based on their names. Use this to control which glossaries are ingested.

Examples:
- Include specific glossaries: `^(BusinessGlossary|DataGlossary)$`
- Exclude test glossaries: `^(?!.*test).*$`

{% /codeInfo %}

{% codeInfo srNumber=16 %}

**domainFilterPattern**: Regex pattern to include or exclude domains and communities based on their names.

Examples:
- Include specific domains: `^(Finance|Sales)$`
- Exclude archived domains: `^(?!.*archived).*$`

{% /codeInfo %}

{% codeInfo srNumber=17 %}

**enableEnrichment**: When enabled, the connector will enrich existing OpenMetadata assets with metadata from Collibra (descriptions, tags, owners) by matching Collibra assets to OpenMetadata entities. This will not create new assets, only update existing ones.

By default, this is set to `false`.

{% /codeInfo %}

#### Sink Configuration

{% codeInfo srNumber=18 %}

To send the metadata to OpenMetadata, it needs to be specified as `type: metadata-rest`.

{% /codeInfo %}

{% partial file="/v1.11/connectors/yaml/workflow-config-def.md" /%}
{% /codeInfoContainer %}

{% codeBlock fileName="filename.yaml" %}

```yaml {% isCodeBlock=true %}
source:
  type: Collibra
  serviceName: local_collibra
  serviceConnection:
    config:
      type: Collibra
```
```yaml {% srNumber=12 %}
      hostPort: https://your-instance.collibra.com
```
```yaml {% srNumber=13 %}
      username: your_username
```
```yaml {% srNumber=14 %}
      password: your_password
```
```yaml {% srNumber=15 %}
      glossaryFilterPattern:
        includes:
          - "^BusinessGlossary$"
          - "^DataGlossary$"
        # excludes:
        #   - "^.*test.*$"
```
```yaml {% srNumber=16 %}
      domainFilterPattern:
        includes:
          - "^Finance$"
          - "^Sales$"
        # excludes:
        #   - "^.*archived.*$"
```
```yaml {% srNumber=17 %}
      enableEnrichment: false # true or false
```
```yaml {% srNumber=19 %}
  sourceConfig:
    config:
      type: DatabaseMetadata
```
```yaml {% srNumber=18 %}
sink:
  type: metadata-rest
  config: {}
```

{% partial file="/v1.11/connectors/yaml/workflow-config.md" /%}

{% /codeBlock %}

{% /codePreview %}

{% partial file="/v1.11/connectors/yaml/ingestion-cli.md" /%}
