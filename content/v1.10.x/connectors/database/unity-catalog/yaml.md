---
title: Run the Unity Catalog Connector Externally
description: Configure Unity Catalog database connector with OpenMetadata using YAML. Step-by-step setup guide, configuration examples, and best practices included.
slug: /connectors/database/unity-catalog/yaml
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
- [Query Usage](#query-usage)
- [Lineage](#lineage)
- [dbt Integration](#dbt-integration)
{% collateContent %}
- [Reverse Metadata](/applications/reverse-metadata)
{% /collateContent %}

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

All connectors are defined as JSON Schemas.
[Here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/services/connections/database/databricksConnection.json)
you can find the structure to create a connection to Databricks.

In order to create and run a Metadata Ingestion workflow, we will follow
the steps to create a YAML configuration able to connect to the source,
process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following
[JSON Schema](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/workflow.json)

### 1. Define the YAML Config

This is a sample config for Unity Catalog:

{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% codeInfo srNumber=1 %}

**catalog**: Catalog of the data source(Example: hive_metastore). This is optional parameter, if you would like to restrict the metadata reading to a single catalog. When left blank, OpenMetadata Ingestion attempts to scan all the catalog.

{% /codeInfo %}

{% codeInfo srNumber=2 %}

**databaseSchema**: DatabaseSchema of the data source. This is optional parameter, if you would like to restrict the metadata reading to a single databaseSchema. When left blank, OpenMetadata Ingestion attempts to scan all the databaseSchema.

{% /codeInfo %}

{% codeInfo srNumber=3 %}

**hostPort**: Enter the fully qualified hostname and port number for your Databricks deployment in the Host and Port field.

{% /codeInfo %}

{% codeInfo srNumber=4 %}

**authType**: Authentication configuration. Choose one of:
- **Personal Access Token**: Use `token` field with your PAT
- **Databricks OAuth**: Use `clientId` and `clientSecret` for Service Principal
- **Azure AD Setup**: Use `azureClientId`, `azureClientSecret`, and `azureTenantId`


{% /codeInfo %}

{% codeInfo srNumber=5 %}

**httpPath**: Databricks compute resources URL.

{% /codeInfo %}

{% codeInfo srNumber=6 %}

**connectionTimeout**: The maximum amount of time (in seconds) to wait for a successful connection to the data source. If the connection attempt takes longer than this timeout period, an error will be returned.

{% /codeInfo %}


{% partial file="/v1.10/connectors/yaml/database/source-config-def.md" /%}

{% partial file="/v1.10/connectors/yaml/ingestion-sink-def.md" /%}

{% partial file="/v1.10/connectors/yaml/workflow-config-def.md" /%}

#### Advanced Configuration

{% codeInfo srNumber=7 %}

**Connection Options (Optional)**: Enter the details for any additional connection options that can be sent to database during the connection. These details must be added as Key-Value pairs.

{% /codeInfo %}

{% codeInfo srNumber=8 %}

**Connection Arguments (Optional)**: Enter the details for any additional connection arguments such as security or protocol configs that can be sent to database during the connection. These details must be added as Key-Value pairs.

- In case you are using Single-Sign-On (SSO) for authentication, add the `authenticator` details in the Connection Arguments as a Key-Value pair as follows: `"authenticator" : "sso_login_url"`

{% /codeInfo %}

{% /codeInfoContainer %}

{% codeBlock fileName="filename.yaml" %}

```yaml {% isCodeBlock=true %}
source:
  type: unitycatalog
  serviceName: local_unitycatalog
  serviceConnection:
    config:
      type: UnityCatalog
```
```yaml {% srNumber=1 %}
      catalog: hive_metastore
```
```yaml {% srNumber=2 %}
      databaseSchema: default
```
```yaml {% srNumber=3 %}
      hostPort: adb-xyz.databricks.com:443  # Your Databricks host and port
```
```yaml {% srNumber=4 %}
      # Choose ONE authentication method:
      
      # Option 1: Personal Access Token
      authType:
        token: dapi1234567890abcxyz
      
      # Option 2: Databricks OAuth (Service Principal)
      # authType:
      #   clientId: 12345678-1234-1234-1234-123456789xyz
      #   clientSecret: dose1234507890abcdef
      
      # Option 3: Azure AD Setup
      # authType:
      #   azureClientId: a1b2c3d4-e5f6-7890-abcd-ef1234567890
      #   azureClientSecret: secret123~value456
      #   azureTenantId: 98765432-fcba-4321-abcd-1234567890ab
```
```yaml {% srNumber=5 %}
      httpPath: /sql/1.0/warehouses/39c340db3a3e19za
```
```yaml {% srNumber=6 %}
      connectionTimeout: 120
```
```yaml {% srNumber=7 %}
      # connectionOptions:
      #   key: value
```
```yaml {% srNumber=8 %}
      # connectionArguments:
      #   key: value
```


{% partial file="/v1.10/connectors/yaml/database/source-config.md" /%}

{% partial file="/v1.10/connectors/yaml/ingestion-sink.md" /%}

{% partial file="/v1.10/connectors/yaml/workflow-config.md" /%}

{% /codeBlock %}

{% /codePreview %}

{% partial file="/v1.10/connectors/yaml/ingestion-cli.md" /%}

{% partial file="/v1.10/connectors/yaml/query-usage.md" variables={connector: "unitycatalog"} /%}

{% partial file="/v1.10/connectors/yaml/lineage.md" variables={connector: "unitycatalog"} /%}

## dbt Integration

You can learn more about how to ingest dbt models' definitions and their lineage [here](/connectors/ingestion/workflows/dbt).
