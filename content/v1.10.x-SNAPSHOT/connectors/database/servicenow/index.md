---
title: ServiceNow Connector | OpenMetadata Integration Guide
description: Connect ServiceNow to OpenMetadata to automatically discover, catalog, and manage your ServiceNow metadata. Step-by-step configuration guide.
slug: /connectors/database/servicenow
Collate: true
---

{% connectorDetailsHeader
name="ServiceNow"
stage="BETA"
platform="Collate"
availableFeatures=["Metadata", "Lineage"]
unavailableFeatures=["Query Usage", "Data Profiler", "Data Quality", "dbt", "Stored Procedures", "Owners", "Tags", "Sample Data", "Auto-Classification"]
/ %}

In this section, we provide guides and references to use the ServiceNow connector.

Configure and schedule ServiceNow metadata workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)

{% partial file="/v1.9/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/database/servicenow/yaml"} /%}

## Requirements

To fetch metadata from ServiceNow into OpenMetadata you will need:

1. An accessible ServiceNow instance URL (e.g. `https://your-instance.service-now.com`).
2. A ServiceNow username with read access to `sys_db_object` and `sys_dictionary` tables.
3. The password for the ServiceNow user.

## Metadata Ingestion

{% partial 
  file="/v1.9/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "ServiceNow", 
    selectServicePath: "/images/v1.9/connectors/servicenow/select-service.png",
    addNewServicePath: "/images/v1.9/connectors/servicenow/add-new-service.png",
    serviceConnectionPath: "/images/v1.9/connectors/servicenow/service-connection.png",
} 
/%}

{% stepsContainer %}
{% extraContent parentTagName="stepsContainer" %}

#### Connection Details

- **ServiceNow Instance URL**: Your ServiceNow instance URL (e.g., `https://your-instance.service-now.com`).
- **Username**: Username to connect to ServiceNow. This user should have read access to `sys_db_object` and `sys_dictionary` tables.
- **Password**: Password to connect to ServiceNow.
- **Include Scopes as Schemas**: If true, ServiceNow application scopes will be imported as database schemas. Otherwise, a single default schema will be used. Default: `false`.
- **Include System Tables**: If true, both admin and system tables (`sys_*` tables) will be fetched. If false, only admin tables will be fetched. Default: `false`.

{% partial file="/v1.9/connectors/database/advanced-configuration.md" /%}

{% /extraContent %}

{% partial file="/v1.9/connectors/test-connection.md" /%}

{% partial file="/v1.9/connectors/database/configure-ingestion.md" /%}

{% partial file="/v1.9/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}

{% partial file="/v1.9/connectors/database/related.md" /%}