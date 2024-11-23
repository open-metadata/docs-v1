---
title: Matillion
slug: /connectors/pipeline/matillion
collate: true
---

{% connectorDetailsHeader
name="Matillion"
stage="PROD"
platform="Collate"
availableFeatures=["Pipelines", "Lineage"]
unavailableFeatures=["Owners", "Tags", "Pipeline Status"]
/ %}


In this section, we provide guides and references to use the Matillion connector.

Configure and schedule Matillion metadata and profiler workflows from the OpenMetadata UI:

- [Requirements](#requirements)
    - [Matillion Versions](#matillion-versions)
- [Metadata Ingestion](#metadata-ingestion)
    - [Connection Details](#connection-details)
- [Troubleshooting](#troubleshooting)
    - [Workflow Deployment Error](#workflow-deployment-error)

{% partial file="/v1.6/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/pipeline/matillion/yaml"} /%}

## Requirements
To extract metadata from Matillion, you need to create a user with the following permissions:

- `API` Permission ( While Creating the User, from Admin -> User )

### Matillion Versions

OpenMetadata is integrated with matillion up to version [1.75.0](https://docs.matillion.io/getting-started).

## Metadata Ingestion

{% partial 
    file="/v1.6/connectors/metadata-ingestion-ui.md" 
    variables={
        connector: "Matillion", 
        selectServicePath: "/images/v1.6/connectors/matillion/select-service.webp",
        addNewServicePath: "/images/v1.6/connectors/matillion/add-new-service.webp",
        serviceConnectionPath: "/images/v1.6/connectors/matillion/service-connection.webp",
    } 
/%}

{% stepsContainer %}
{% extraContent parentTagName="stepsContainer" %}

#### Connection Details

- **hostPort**: The hostname or IP address with the REST API enabled eg.`https://<your-matillion-host-name-here>`

- **username**: The username to authenticate with the Matillion instance.

- **password**: The password to authenticate with the Matillion instance.

- **caCertificate** : CA Certificate to authenticate with the Matillion instance.

{% /extraContent %}

{% partial file="/v1.6/connectors/test-connection.md" /%}

{% partial file="/v1.6/connectors/pipeline/configure-ingestion.md" /%}

{% partial file="/v1.6/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}

By successfully completing these steps, the lineage information for the service will be displayed.

{% image
  src="/images/v1.6/connectors/matillion/lineage.webp"
  alt="Matillion Lineage" /%}

{% partial file="/v1.6/connectors/troubleshooting.md" /%}
