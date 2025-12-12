---
title: Qlik Cloud Connector | OpenMetadata Dashboard Integration
description: Connect QlikCloud dashboards to OpenMetadata effortlessly. Complete setup guide, configuration steps, and metadata extraction for seamless data governance.
slug: /connectors/dashboard/qlikcloud
---

{% connectorDetailsHeader
  name="Qlik Cloud"
  stage="PROD"
  platform="OpenMetadata"
  availableFeatures=["Projects", "Dashboards", "Charts", "Datamodels", "Lineage", "Column Lineage"]
  unavailableFeatures=["Owners", "Tags"]
/ %}

In this section, we provide guides and references to use the Qlik Cloud connector.

Configure and schedule QlikCloud metadata and profiler workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)
- [Lineage](#lineage)
- [Troubleshooting](/connectors/dashboard/qlikcloud/troubleshooting)

{% partial file="/v1.12/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/dashboard/qlikcloud/yaml"} /%}

## Requirements

{%inlineCallout icon="description" bold="OpenMetadata 1.1.1 or later" href="/deployment"%}
To deploy OpenMetadata, check the Deployment guides.
{%/inlineCallout%}

## Metadata Ingestion

{% partial
  file="/v1.12/connectors/metadata-ingestion-ui.md"
  variables={
    connector: "QlikCloud",
    selectServicePath: "/images/v1.12/connectors/qlikcloud/select-service.png",
    addNewServicePath: "/images/v1.12/connectors/qlikcloud/add-new-service.png",
    serviceConnectionPath: "/images/v1.12/connectors/qlikcloud/service-connection.png",
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

- **Qlik Cloud Host Port**: This field refers to the base url of your Qlik Cloud Portal, will be used for generating the redirect links for dashboards and charts. Example: `https://<TenantURL>.qlikcloud.com`
- **Qlik Cloud API Token**: Enter the API token for Qlik Cloud APIs access. Refer to [this](https://help.qlik.com/en-US/cloud-services/Subsystems/Hub/Content/Sense_Hub/Admin/mc-generate-api-keys.htm) document for more details about. Example: `eyJhbGciOiJFU***`.
- **Qlik Cloud Space Types**: Select relevant space types of Qlik Cloud to filter the dashboards ingested into the platform. Example: `Personal`, `Shared`, `Managed`, `Data`.

{% /extraContent %}

{% partial file="/v1.12/connectors/test-connection.md" /%}

{% partial file="/v1.12/connectors/dashboard/configure-ingestion.md" /%}

{% partial file="/v1.12/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}

{% partial file="/v1.12/connectors/dashboard/dashboard-lineage.md" /%}
