---
title: Run the ADLS Datalake Connector Externally
slug: /connectors/database/adls-datalake/yaml
---

{% connectorDetailsHeader
name="ADLS Datalake"
stage="PROD"
platform="OpenMetadata"
availableFeatures=["Metadata", "Data Profiler", "Data Quality"]
unavailableFeatures=["Query Usage", "Lineage", "Column-level Lineage", "Owners", "dbt", "Tags", "Stored Procedures"]
/ %}

In this section, we provide guides and references to use the ADLS Datalake connector.

Configure and schedule ADLS Datalake metadata and profiler workflows from the OpenMetadata UI:
- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)
- [dbt Integration](#dbt-integration)

{% partial file="/v1.6/connectors/external-ingestion-deployment.md" /%}

## Requirements

**Note:** ADLS Datalake connector supports extracting metadata from file types `JSON`, `CSV`, `TSV` & `Parquet`.

### ADLS Permissions

To extract metadata from Azure ADLS (Storage Account - StorageV2), you will need an **App Registration** with the following
permissions on the Storage Account:
- Storage Blob Data Contributor
- Storage Queue Data Contributor

### Python Requirements

{% partial file="/v1.6/connectors/python-requirements.md" /%}

#### Azure installation

```bash
pip3 install "openmetadata-ingestion[datalake-azure]"
```

## Metadata Ingestion
All connectors are defined as JSON Schemas. Here you can find the structure to create a connection to Datalake.

In order to create and run a Metadata Ingestion workflow, we will follow the steps to create a YAML configuration able to connect to the source, process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following JSON Schema.

## 1. Define the YAML Config

### This is a sample config for Datalake using Azure:

{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% codeInfo srNumber=9 %}

- **Client ID** : Client ID of the data storage account
- **Client Secret** : Client Secret of the account
- **Tenant ID** : Tenant ID under which the data storage account falls
- **Account Name** : Account Name of the data Storage

{% /codeInfo %}


{% partial file="/v1.6/connectors/yaml/database/source-config-def.md" /%}

{% partial file="/v1.6/connectors/yaml/ingestion-sink-def.md" /%}

{% partial file="/v1.6/connectors/yaml/workflow-config-def.md" /%}

{% /codeInfoContainer %}

{% codeBlock fileName="filename.yaml" %}

```yaml {% isCodeBlock=true %}
# Datalake with Azure 
source:
  type: datalake
  serviceName: local_datalake
  serviceConnection:
    config:
      type: Datalake
      configSource:    
```
```yaml {% srNumber=9 %}  
        securityConfig: 
          clientId: client-id
          clientSecret: client-secret
          tenantId: tenant-id
          accountName: account-name
      prefix: prefix
```

{% partial file="/v1.6/connectors/yaml/database/source-config.md" /%}

{% partial file="/v1.6/connectors/yaml/ingestion-sink.md" /%}

{% partial file="/v1.6/connectors/yaml/workflow-config.md" /%}

{% /codeBlock %}

{% /codePreview %}

{% partial file="/v1.6/connectors/yaml/ingestion-cli.md" /%}

## dbt Integration

You can learn more about how to ingest dbt models' definitions and their lineage [here](/connectors/ingestion/workflows/dbt).
