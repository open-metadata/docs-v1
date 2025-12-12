---
title: Unity Catalog Connector Troubleshooting
description: Resolve Unity Catalog connector issues quickly with OpenMetadata'scomprehensive troubleshooting guide. Fix common errors, configuration problems, and c...
slug: /connectors/database/unity-catalog/troubleshooting
---

{% partial file="/v1.11/connectors/troubleshooting.md" /%}

## Databricks Connection Details

### Authentication Methods

Databricks connector supports three authentication methods. Choose the one that best fits your security requirements:

#### 1. Personal Access Token (PAT)
```yaml
source:
  type: databricks
  serviceName: local_databricks
  serviceConnection:
    config:
      catalog: hive_metastore
      databaseSchema: default
      hostPort: adb-xyz.azuredatabricks.net:443
      httpPath: /sql/1.0/warehouses/39c390db3b5e19es
      authType:
        token: dapi1234567890abcxyz
```

#### 2. Databricks OAuth (Service Principal)
```yaml
source:
  type: unitycatalog
  serviceName: local_unity_catalog
  serviceConnection:
    config:
      catalog: hive_metastore
      databaseSchema: default
      hostPort: dbc-xyz.cloud.databricks.com:443
      httpPath: /sql/1.0/warehouses/39c390db3a5e19ee
      authType:
        clientId: 12345678-1234-1234-1234-123456789abc
        clientSecret: dose1234567890abcdef
```

#### 3. Azure AD Setup
```yaml
source:
  type: databricks
  serviceName: local_databricks
  serviceConnection:
    config:
      catalog: hive_metastore
      databaseSchema: default
      hostPort: adb-xyz.azuredatabricks.net:443
      httpPath: /sql/1.0/warehouses/39c390db3a5e19ee
      authType:
        azureClientId: a1b2c3d4-e5f6-7890-abcd-ef1234567890
        azureClientSecret: secret123~value456
        azureTenantId: 98765432-dcba-4321-abcd-1234567890ab
```

### Getting Connection Details

Here are the steps to get `hostPort`, `httpPath` and authentication credentials:

First login to Azure Databricks and from side bar select SQL Warehouse (In SQL section)


{% image
src="/images/v1.11/connectors/unitycatalog/select-sql-warehouse.png"
alt="Select Sql Warehouse"
caption="Select Sql Warehouse" /%}


Now click on sql Warehouse from the SQL Warehouses list.


{% image
src="/images/v1.11/connectors/unitycatalog/Open-sql-warehouse.png"
alt="Open Sql Warehouse"
caption="Open Sql Warehouse" /%}


Now inside that page go to Connection details section.
In this page Server hostname and Port is your `hostPort`, HTTP path is your `http_path`.



{% image
src="/images/v1.11/connectors/unitycatalog/Connection-details.png"
alt="Connection details"
caption="Connection details" /%}


In Connection details section page click on Create a personal access token.

{% image
src="/images/v1.11/connectors/unitycatalog/Open-create-token-page.png"
alt="Open create token"
caption="Open create token" /%}



Now In this page you can create new `token`.


{% image
src="/images/v1.11/connectors/unitycatalog/Generate-token.png"
alt="Generate token"
caption="Generate token" /%}

### Getting Service Principal Credentials

#### For Databricks OAuth (All Platforms)

1. Navigate to your Databricks Account Console
2. Go to **Settings** → **Identity and access** → **Service Principals** → **Add Service Principal**
3. Note down the **Application ID** (this is your `clientId`)
4. Click **Generate Secret** and save the secret (this is your `clientSecret`)

#### For Azure AD Setup (Azure Databricks Only)

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

