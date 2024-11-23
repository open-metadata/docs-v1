---
title: ADLS Datalake
slug: /connectors/database/adls-datalake
---

{% connectorDetailsHeader
name="ADLS Datalake"
stage="PROD"
platform="OpenMetadata"
availableFeatures=["Metadata", "Data Profiler", "Data Quality"]
unavailableFeatures=["Query Usage", "Lineage", "Column-level Lineage", "Owners", "dbt", "Tags", "Stored Procedures"]
/ %}

In this section, we provide guides and references to use the ADLS Datalake connector.

Configure and schedule Datalake metadata and profiler workflows from the OpenMetadata UI:
- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)
- [Data Profiler](/how-to-guides/data-quality-observability/profiler/workflow)
- [Data Quality](/how-to-guides/data-quality-observability/quality)

{% partial file="/v1.5/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/database/adls-datalake/yaml"} /%}

## Requirements

{% note %}
The ADLS Datalake connector supports extracting metadata from file types `JSON`, `CSV`, `TSV` & `Parquet`.
{% /note %}

### ADLS Permissions

To extract metadata from Azure ADLS (Storage Account - StorageV2), you will need an **App Registration** with the following
permissions on the Storage Account:
- Storage Blob Data Contributor
- Storage Queue Data Contributor

## Metadata Ingestion

{% partial 
  file="/v1.5/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "Datalake", 
    selectServicePath: "/images/v1.5/connectors/datalake/select-service.png",
    addNewServicePath: "/images/v1.5/connectors/datalake/add-new-service.png",
    serviceConnectionPath: "/images/v1.5/connectors/datalake/service-connection.png",
} 
/%}

{% stepsContainer %}
{% extraContent parentTagName="stepsContainer" %}

#### Connection Details for Azure

- **Azure Credentials**

  - **Client ID** : Client ID of the data storage account
  - **Client Secret** : Client Secret of the account
  - **Tenant ID** : Tenant ID under which the data storage account falls
  - **Account Name** : Account Name of the data Storage

- **Required Roles**

  Please make sure the following roles associated with the data storage account.
   - `Storage Blob Data Contributor`
   - `Storage Queue Data Contributor`

The current approach for authentication is based on `app registration`, reach out to us on [slack](https://slack.open-metadata.org/) if you find the need for another auth system

{% partial file="/v1.5/connectors/database/advanced-configuration.md" /%}

{% /extraContent %}

{% partial file="/v1.5/connectors/test-connection.md" /%}

{% partial file="/v1.5/connectors/database/configure-ingestion.md" /%}

{% partial file="/v1.5/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}

{% partial file="/v1.5/connectors/troubleshooting.md" /%}

{% partial file="/v1.5/connectors/database/related.md" /%}
