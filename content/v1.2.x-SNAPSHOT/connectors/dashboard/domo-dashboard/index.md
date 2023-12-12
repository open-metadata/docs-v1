---
title: Domo Dashboard
slug: /connectors/dashboard/domo-dashboard
---

# Domo Dashboard

| Stage      | PROD                         |
|------------|------------------------------|
| Dashboards | {% icon iconName="check" /%} |
| Charts     | {% icon iconName="check" /%} |
| Owners     | {% icon iconName="check" /%} |
| Tags       | {% icon iconName="cross" /%} |
| Datamodels | {% icon iconName="cross" /%} |
| Lineage    | {% icon iconName="cross" /%} |

In this section, we provide guides and references to use the DomoDashboard connector.

Configure and schedule DomoDashboard metadata and profiler workflows from the OpenMetadata UI:
- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)

{% partial file="/v1.2/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/dashboard/domo-dashboard/yaml"} /%}

## Requirements

For metadata ingestion, make sure to add at least `data` scopes to the clientId provided.
For questions related to scopes, click [here](https://developer.domo.com/portal/1845fc11bbe5d-api-authentication).

## Metadata Ingestion

{% partial 
  file="/v1.2/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "Domo Dashboard", 
    selectServicePath: "/images/v1.2/connectors/domodashboard/select-service.png",
    addNewServicePath: "/images/v1.2/connectors/domodashboard/add-new-service.png",
    serviceConnectionPath: "/images/v1.2/connectors/domodashboard/service-connection.png",
} 
/%}

{% stepsContainer %}
{% extraContent parentTagName="stepsContainer" %}

#### Connection Details

- **Client ID**: Client ID to Connect to DOMO Dashboard.
- **Secret Token**: Secret Token to Connect DOMO Dashboard.
- **Access Token**: Access to Connect to DOMO Dashboard.
- **API Host**:  API Host to Connect to DOMO Dashboard instance.
- **Instance Domain**: URL to connect to your Domo instance UI. For example `https://<your>.domo.com`.

{% /extraContent %}

{% partial file="/v1.2/connectors/test-connection.md" /%}

{% partial file="/v1.2/connectors/dashboard/configure-ingestion.md" /%}

{% partial file="/v1.2/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}

{% partial file="/v1.2/connectors/troubleshooting.md" /%}
