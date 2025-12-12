---
title: Collibra Connector | Official Documentation
description: Connect Collibra to OpenMetadata seamlessly with our comprehensive connector guide. Learn setup, configuration, and metadata synchronization steps.
slug: /connectors/metadata/collibra
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

Configure and schedule Collibra metadata workflow from the OpenMetadata UI:

- [Requirements](#requirements)
- [Data Mapping and Assumptions](#data-mapping-and-assumptions)
- [Metadata Ingestion](#metadata-ingestion)

{% partial file="/v1.11/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/metadata/collibra/yaml"} /%}

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
- Use the glossaryFilterPattern to include or exclude specific glossaries based on their names.
- Use the domainFilterPattern to include or exclude specific domains and communities based on their names.

## Metadata Ingestion

{% partial
  file="/v1.11/connectors/metadata-ingestion-ui.md"
  variables={
    connector: "Collibra",
    selectServicePath: "/images/v1.11/connectors/collibra/select-service.png",
    addNewServicePath: "/images/v1.11/connectors/collibra/add-new-service.png",
    serviceConnectionPath: "/images/v1.11/connectors/collibra/service-connection.png",
  }
/%}

{% stepsContainer %}
{% extraContent parentTagName="stepsContainer" %}

#### Connection Options

**hostPort**: Host and port of the Collibra instance.

```bash
https://your-instance.collibra.com
```

**username**: Username to connect to Collibra. This user should have privileges to read all the metadata in Collibra.

**password**: Password for the Collibra user account.

**glossaryFilterPattern**: Regex pattern to include or exclude glossaries based on their names. Use this to control which glossaries are ingested.

Examples:
- Include specific glossaries: `^(BusinessGlossary|DataGlossary)$`
- Exclude test glossaries: `^(?!.*test).*$`

**domainFilterPattern**: Regex pattern to include or exclude domains and communities based on their names.

Examples:
- Include specific domains: `^(Finance|Sales)$`
- Exclude archived domains: `^(?!.*archived).*$`

**enableEnrichment**: When enabled, the connector will enrich existing OpenMetadata assets with metadata from Collibra (descriptions, tags, owners) by matching Collibra assets to OpenMetadata entities. This will not create new assets, only update existing ones.

By default, this is set to `false`.

{% partial file="/v1.11/connectors/database/advanced-configuration.md" /%}

{% /extraContent %}

{% partial file="/v1.11/connectors/test-connection.md" /%}

{% partial file="/v1.11/connectors/metadata/configure-ingestion.md" /%}

{% partial file="/v1.11/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}
