---
title: Dagster Connector | OpenMetadata Pipeline Integration
description: Connect Dagster pipelines to OpenMetadata with our comprehensive integration guide. Learn setup, configuration, and metadata extraction in minutes.
slug: /connectors/pipeline/dagster
---

{% connectorDetailsHeader
name="Dagster"
stage="PROD"
platform="OpenMetadata"
availableFeatures=["Pipelines", "Pipeline Status", "Tags", "Usage"]
unavailableFeatures=["Owners", "Lineage"]
/ %}


In this section, we provide guides and references to use the Dagster connector.

Configure and schedule Dagster metadata and profiler workflows from the OpenMetadata UI:

- [Requirements](#requirements)
  - [Dagster Versions](#dagster-versions)
- [Metadata Ingestion](#metadata-ingestion)
    - [Service Name](#service-name)
    - [Connection Details](#connection-details)
    - [Metadata Ingestion Options](#metadata-ingestion-options)
- [Troubleshooting](/connectors/pipeline/dagster/troubleshooting)
  - [Workflow Deployment Error](#workflow-deployment-error)

{% partial file="/v1.9/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/pipeline/dagster/yaml"} /%}

## Requirements

### Dagster Versions

OpenMetadata is integrated with dagster up to version [1.0.13](https://docs.dagster.io/getting-started) and will continue to work for future dagster versions.

The ingestion framework uses [dagster graphql python client](https://docs.dagster.io/_apidocs/libraries/dagster-graphql#dagster_graphql.DagsterGraphQLClient) to connect to the dagster instance and perform the API calls

## Metadata Ingestion

{% partial 
  file="/v1.9/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "Dagster", 
    selectServicePath: "/images/v1.9/connectors/dagster/select-service.png",
    addNewServicePath: "/images/v1.9/connectors/dagster/add-new-service.png",
    serviceConnectionPath: "/images/v1.9/connectors/dagster/service-connection.png",
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

- **Host**: Host of the dagster eg.`https://localhost:300` or `https://127.0.0.1:3000` or `https://<yourorghere>.dagster.cloud/prod`
- **Token** : Need pass token if connecting to `dagster cloud` instance
  - Log in to your Dagster account.
  - Click on the "Settings" link in the top navigation bar.
  - Click on the "API Keys" tab.
  - Click on the "Create a New API Key" button.
  - Give your API key a name and click on the "Create API Key" button.
  - Copy the generated API key to your clipboard and paste it in the field.

{% /extraContent %}

{% partial file="/v1.9/connectors/test-connection.md" /%}

{% partial file="/v1.9/connectors/pipeline/configure-ingestion.md" /%}

{% partial file="/v1.9/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}
