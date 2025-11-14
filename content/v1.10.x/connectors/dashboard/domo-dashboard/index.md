---
title: Domo Dashboard | OpenMetadata Connector Setup Guide
description: Connect Domo dashboards to OpenMetadata with our comprehensive connector guide. Easy setup, configuration steps, and metadata extraction explained.
slug: /connectors/dashboard/domo-dashboard
---

{% connectorDetailsHeader
  name="Domo"
  stage="PROD"
  platform="OpenMetadata"
  availableFeatures=["Dashboards", "Charts", "Owners"]
  unavailableFeatures=["Tags", "Datamodels", "Projects", "Lineage"]
/ %}

In this section, we provide guides and references to use the DomoDashboard connector.

Configure and schedule DomoDashboard metadata and profiler workflows from the OpenMetadata UI:
- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)
- [Troubleshooting](/connectors/dashboard/domo-dashboard/troubleshooting)

{% partial file="/v1.10/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/dashboard/domo-dashboard/yaml"} /%}

## Requirements

For metadata ingestion, make sure to add at least `data` scopes to the clientId provided.
For questions related to scopes, click [here](https://developer.domo.com/portal/1845fc11bbe5d-api-authentication).

## Metadata Ingestion

{% partial 
  file="/v1.10/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "Domo Dashboard", 
    selectServicePath: "/images/v1.10/connectors/domodashboard/select-service.png",
    addNewServicePath: "/images/v1.10/connectors/domodashboard/add-new-service.png",
    serviceConnectionPath: "/images/v1.10/connectors/domodashboard/service-connection.png",
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

- **Client ID**: Client ID to Connect to DOMO Dashboard.
- **Secret Token**: Secret Token to Connect DOMO Dashboard.
- **Access Token**: Access to Connect to DOMO Dashboard.
- **API Host**:  API Host to Connect to DOMO Dashboard instance.
- **Instance Domain**: URL to connect to your Domo instance UI. For example `https://<your>.domo.com`.

{% /extraContent %}

{% partial file="/v1.10/connectors/test-connection.md" /%}

{% partial file="/v1.10/connectors/dashboard/configure-ingestion.md" /%}

{% partial file="/v1.10/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}
