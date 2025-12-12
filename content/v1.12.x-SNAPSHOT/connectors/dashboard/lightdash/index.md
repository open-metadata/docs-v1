---
title: Lightdash Connector | OpenMetadata Dashboard Integration
description: Connect Lightdash to OpenMetadata with our comprehensive dashboard connector guide. Set up data lineage, metadata extraction, and BI integration easily.
slug: /connectors/dashboard/lightdash
---

{% connectorDetailsHeader
  name="Lightdash"
  stage="PROD"
  platform="OpenMetadata"
  availableFeatures=["Dashboards", "Charts", "Owners", "Datamodels", "Lineage"]
  unavailableFeatures=["Tags", "Projects"]
/ %}

In this section, we provide guides and references to use the Lightdash connector.

Configure and schedule Lightdash metadata and profiler workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)
- [Lineage](#lineage)
- [Troubleshooting](/connectors/dashboard/lightdash/troubleshooting)

{% partial file="/v1.12/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/dashboard/lightdash/yaml"} /%}

## Requirements

To integrate Lightdash, ensure you are using OpenMetadata version 1.2.x or higher.

## Metadata Ingestion

{% partial 
  file="/v1.12/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "Lightdash", 
    selectServicePath: "/images/v1.12/connectors/lightdash/select-service.png",
    addNewServicePath: "/images/v1.12/connectors/lightdash/add-new-service.png",
    serviceConnectionPath: "/images/v1.12/connectors/lightdash/service-connection.png",
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

- **Host and Port**: Specify the network location where your Lightdash instance is accessible, combining both hostname and port in a URI format: either `http://hostname:port` or `https://hostname:port`, based on your security needs.

   - **Example**: For a local setup, use `http://localhost:8080`; for a server deployment, it might be `https://lightdash.example.com:3000`.
   - Ensure the specified port is open and accessible through network firewall settings.

- **API Key**: This key authenticates requests to your Lightdash instance. Keep the API Key secure, sharing it only with authorized applications or users.

- **Project UUID**: This unique identifier links API requests or configurations to a specific project in Lightdash. 

- **Space UUID**: Identifies a specific "Space" in Lightdash, used to organize dashboards, charts, and assets.

- **Proxy Authentication**: If your Lightdash instance requires authentication through a proxy server, provide proxy credentials. Proxy authentication controls access to external resources and Lightdash.

{% /extraContent %}

{% partial file="/v1.12/connectors/test-connection.md" /%}

{% partial file="/v1.12/connectors/dashboard/configure-ingestion.md" /%}

{% partial file="/v1.12/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}

{% partial file="/v1.12/connectors/dashboard/dashboard-lineage.md" /%}
