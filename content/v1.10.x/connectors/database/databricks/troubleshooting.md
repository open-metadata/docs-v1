---
title: Databricks Connector Troubleshooting
description: Troubleshoot Databricks connector issues including schema extraction errors or driver failures.
slug: /connectors/database/databricks/troubleshooting
---

{% partial file="/v1.10/connectors/troubleshooting.md" /%}

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
  type: databricks
  serviceName: local_databricks
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
