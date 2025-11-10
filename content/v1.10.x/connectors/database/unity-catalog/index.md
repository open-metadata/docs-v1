---
title: Unity Catalog Connector | OpenMetadata Data Governance
description: Learn how to connect Unity Catalog to OpenMetadata with our comprehensive connector guide. Setup instructions, configuration tips, and metadata integrat...
slug: /connectors/database/unity-catalog
---

{% connectorDetailsHeader
name="Unity Catalog"
stage="PROD"
platform="OpenMetadata"
availableFeatures=["Metadata", "Query Usage", "Data Profiler", "Data Quality", "Lineage", "Column-level Lineage", "dbt", "Sample Data", "Reverse Metadata (Collate Only)", "Owners", "Tags", "Auto-Classification"]
unavailableFeatures=["Stored Procedures"]
/ %}


In this section, we provide guides and references to use the Unity Catalog connector.

Configure and schedule Unity Catalog metadata workflow from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)
- [Data Quality](/how-to-guides/data-quality-observability/quality)
- [Lineage](/connectors/ingestion/lineage)
- [dbt Integration](/connectors/ingestion/workflows/dbt)
- [Troubleshooting](/connectors/database/unity-catalog/troubleshooting)
{% collateContent %}
- [Reverse Metadata](#reverse-metadata)
{% /collateContent %}

{% partial file="/v1.10/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/database/unity-catalog/yaml"} /%}

{% partial file="/v1.10/connectors/external-ingestion-deployment.md" /%}

## Requirements

### Python Requirements

{% partial file="/v1.10/connectors/python-requirements.md" /%}

To run the Unity Catalog ingestion, you will need to install:

```bash
pip3 install "openmetadata-ingestion[databricks]"
```
### Authentication Types

Databricks connector supports three authentication methods:

1. **Personal Access Token (PAT)**: Generated Personal Access Token for Databricks workspace authentication.
2. **Databricks OAuth (Service Principal)**: OAuth2 Machine-to-Machine authentication using a Service Principal.
3. **Azure AD Setup**: Specifically for Azure Databricks workspaces that use Azure Active Directory for identity management. Uses Azure Service Principal authentication through Azure AD.

### Permission Requirements

The required permissions vary based on the authentication method used:

#### Personal Access Token Permissions

When using PAT, the token inherits the permissions of the user who created it. Ensure the user has:

```sql
GRANT USE CATALOG ON CATALOG <catalog_name> TO `<user>`;
GRANT USE SCHEMA ON SCHEMA <schema_name> TO `<user>`;
GRANT SELECT ON TABLE <table_name> TO `<user>`;
GRANT SELECT ON SYSTEM.QUERY.HISTORY TO `<user>`;
GRANT USE SCHEMA ON SCHEMA system.query TO `<user>`;
```

#### Service Principal Permissions (OAuth/Azure AD)

For Service Principal authentication, grant permissions to the Service Principal:

```sql
GRANT USE CATALOG ON CATALOG <catalog_name> TO `<service_principal>`;
GRANT USE SCHEMA ON SCHEMA <schema_name> TO `<service_principal>`;
GRANT SELECT ON TABLE <table_name> TO `<service_principal>`;
GRANT SELECT ON SYSTEM.QUERY.HISTORY TO `<service_principal>`;
GRANT USE SCHEMA ON SCHEMA system.query TO `<service_principal>`;
```

{% note %}

Adjust <user>, <catalog_name>, <schema_name>, and <table_name> according to your specific deployment and security requirements.

{% /note %}

## Getting Connection Details

Here are the steps to get `hostPort`, `httpPath` and authentication credentials:

First login to Azure Databricks and from side bar select SQL Warehouse (In SQL section)


{% image
src="/images/v1.10/connectors/databricks/select-sql-warehouse.png"
alt="Select Sql Warehouse"
caption="Select Sql Warehouse" /%}


Now click on sql Warehouse from the SQL Warehouses list.


{% image
src="/images/v1.10/connectors/databricks/Open-sql-warehouse.png"
alt="Open Sql Warehouse"
caption="Open Sql Warehouse" /%}


Now inside that page go to Connection details section.
In this page Server hostname and Port is your `hostPort`, HTTP path is your `http_path`.



{% image
src="/images/v1.10/connectors/databricks/Connection-details.png"
alt="Connection details"
caption="Connection details" /%}


In Connection details section page click on Create a personal access token.

{% image
src="/images/v1.10/connectors/databricks/Open-create-token-page.png"
alt="Open create token"
caption="Open create token" /%}



Now In this page you can create new `token`.


{% image
src="/images/v1.10/connectors/databricks/Generate-token.png"
alt="Generate token"
caption="Generate token" /%}

## Getting Service Principal Credentials

### For Databricks OAuth (All Platforms)

1. Navigate to your Databricks Account Console
2. Go to **Settings** → **Identity and access** → **Service Principals** → **Add Service Principal**
3. Note down the **Application ID** (this is your `clientId`)
4. Click **Generate Secret** and save the secret (this is your `clientSecret`)

### For Azure AD Setup (Azure Databricks Only)

1. Go to Azure Portal → **Azure Active Directory**
2. Navigate to **Microsoft Entra ID** → **App registrations** → **New registration**
3. After registration, note:
   - **Application (client) ID** (this is your `azureClientId`)
   - **Directory (tenant) ID** (this is your `azureTenantId`)
4. Go to **Certificates & secrets** → **New client secret**
5. Create and save the secret value (this is your `azureClientSecret`)
6. Navigate to your Azure Databricks Account Console
7. Go to **Settings** → **Identity and access** → **Service Principals** → **Add Service Principal**
8. Select **Microsoft Entra ID managed** option and enter your **azureClientId**

### Common Issues

#### Authentication Failures
- **PAT Issues**: Ensure token hasn't expired (max 90 days lifetime)
- **Service Principal**: Verify the Service Principal has necessary permissions
- **Azure AD**: Check if Azure Databricks workspace is configured for Azure AD authentication

#### Permission Errors
- Ensure proper GRANT statements have been executed for your authentication method

## Metadata Ingestion

{% partial 
  file="/v1.10/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "Unity Catalog", 
    selectServicePath: "/images/v1.10/connectors/unitycatalog/select-service.png",
    addNewServicePath: "/images/v1.10/connectors/unitycatalog/add-new-service.png",
    serviceConnectionPath: "/images/v1.10/connectors/unitycatalog/service-connection.png",
} 
/%}

{% stepsContainer %}
{% extraContent parentTagName="stepsContainer" %}

#### Connection Details

- **Host and Port**: Enter the fully qualified hostname and port number for your Databricks deployment in the Host and Port field.
- **Authentication Type**: Choose one of the following authentication methods:
  - **Personal Access Token**: Enter your PAT in the `token` field
  - **Databricks OAuth**: Provide `clientId` and `clientSecret` for Service Principal
  - **Azure AD Setup**: Provide `azureClientId`, `azureClientSecret`, and `azureTenantId`
- **HTTP Path**: Databricks compute resources URL.
- **connectionTimeout**: The maximum amount of time (in seconds) to wait for a successful connection to the data source. If the connection attempt takes longer than this timeout period, an error will be returned.
- **Catalog**: Catalog of the data source(Example: hive_metastore). This is optional parameter, if you would like to restrict the metadata reading to a single catalog. When left blank, OpenMetadata Ingestion attempts to scan all the catalog.
- **DatabaseSchema**: databaseSchema of the data source. This is optional parameter, if you would like to restrict the metadata reading to a single databaseSchema. When left blank, OpenMetadata Ingestion attempts to scan all the databaseSchema.

{% partial file="/v1.10/connectors/database/advanced-configuration.md" /%}

{% /extraContent %}

{% partial file="/v1.10/connectors/test-connection.md" /%}

{% partial file="/v1.10/connectors/database/configure-ingestion.md" /%}

{% partial file="/v1.10/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}

{% collateContent %}
{% partial file="/v1.10/connectors/database/unitycatalog/reverse-metadata.md" /%}
{% /collateContent %}

{% partial file="/v1.10/connectors/database/related.md" /%}
