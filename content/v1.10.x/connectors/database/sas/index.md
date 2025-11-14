---
title: SAS Connector | OpenMetadata Analytics Integration Guide
description: Connect SAS databases to OpenMetadata with our comprehensive connector guide. Step-by-step setup, configuration, and metadata extraction instructions.
slug: /connectors/database/sas
---

{% connectorDetailsHeader
name="SAS"
stage="BETA"
platform="OpenMetadata"
availableFeatures=["Metadata"]
unavailableFeatures=["Query Usage", "Data Profiler", "Data Quality", "Lineage", "Column-level Lineage", "dbt", "Stored Procedures", "Owners", "Tags", "Sample Data", "Auto-Classification"]
/ %}

In this section, we provide guides and references to use the SAS connector.

Configure and schedule SAS metadata workflow from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)
- [Troubleshooting](/connectors/database/sas/troubleshooting)

{% partial file="/v1.10/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/database/sas/yaml"} /%}

## Requirements

{%inlineCallout icon="description" bold="OpenMetadata 1.3 or later" href="/deployment"%}
To deploy OpenMetadata, check the Deployment guides.
{%/inlineCallout%}

## Metadata Ingestion

Prepare the SAS Service and configure the Ingestion:

{% partial 
  file="/v1.10/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "SAS", 
    selectServicePath: "/images/v1.10/connectors/sas/select-service.png",
    addNewServicePath: "/images/v1.10/connectors/sas/add-new-service.png",
    serviceConnectionPath: "/images/v1.10/connectors/sas/service-connection.png",
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

- **ServerHost**: Host and port of the SAS Viya deployment.
- **Username**: Username to connect to SAS Viya. This user should have privileges to read all the metadata in SAS Information Catalog.
- **Password**: Password to connect to SAS Viya.
- **Filter**: A filter expression specifying items for import. For more information [see](https://developer.sas.com/apis/rest/DataManagement/#catalog)

{% /extraContent %}

{% partial file="/v1.10/connectors/test-connection.md" /%}

{% partial file="/v1.10/connectors/metadata/configure-ingestion.md" /%}

{% partial file="/v1.10/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}
