---
title: Databricks Pipeline | OpenMetadata Integration Guide
description: Configure metadata ingestion from Databricks pipelines for job flows, dependencies, and structured datasets.
slug: /connectors/pipeline/databricks-pipeline
---

{% connectorDetailsHeader
name="Databricks Pipeline"
stage="PROD"
platform="OpenMetadata"
availableFeatures=["Pipelines", "Pipeline Status", "Usage"]
unavailableFeatures=["Owners", "Tags", "Lineage"]
/ %}

In this section, we provide guides and references to use the Databricks Pipeline connector.

Configure and schedule Databricks Pipeline metadata workflows from the OpenMetadata UI:

- [Metadata Ingestion](#metadata-ingestion)
- [Troubleshooting](/connectors/pipeline/databricks-pipeline/troubleshooting)

{% partial file="/v1.11/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/pipeline/databricks-pipeline/yaml"} /%}

## Metadata Ingestion

{% partial 
  file="/v1.11/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "Databricks Pipeline", 
    selectServicePath: "/images/v1.11/connectors/databrickspipeline/select-service.png",
    addNewServicePath: "/images/v1.11/connectors/databrickspipeline/add-new-service.png",
    serviceConnectionPath: "/images/v1.11/connectors/databrickspipeline/service-connection.png",
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

- **Host and Port**: Enter the fully qualified hostname and port number for your Databricks Pipeline deployment in the Host and Port field.
- **Token**: Generated Token to connect to Databricks Pipeline.
- **HTTP Path**: Databricks Pipeline compute resources URL.
- **Connection Arguments (Optional)**: Enter the details for any additional connection arguments such as security or protocol configs that can be sent to Databricks during the connection. These details must be added as Key-Value pairs.
  - In case you are using Single-Sign-On (SSO) for authentication, add the `authenticator` details in the Connection Arguments as a Key-Value pair as follows: `"authenticator" : "sso_login_url"`

{% partial file="/v1.11/connectors/test-connection.md" /%}

{% partial file="/v1.11/connectors/pipeline/configure-ingestion.md" /%}

{% partial file="/v1.11/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}
