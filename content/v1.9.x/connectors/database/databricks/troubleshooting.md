---
title: Databricks Connector Troubleshooting
description: Troubleshoot Databricks connector issues including schema extraction errors or driver failures.
slug: /connectors/database/databricks/troubleshooting
---

{% partial file="/v1.9/connectors/troubleshooting.md" /%}

## Databricks connection details

```
source:
  type: databricks
  serviceName: local_databricks
  serviceConnection:
    config:
      catalog: hive_metastore
      databaseSchema: default
      token: <databricks token>
      hostPort: localhost:443
      connectionArguments:
        http_path: <http path of databricks cluster>
  sourceConfig:
    config:
      type: DatabaseMetadata
sink:
  type: metadata-rest
  config: {}
workflowConfig:
  openMetadataServerConfig:
    hostPort: http://localhost:8585/api
    authProvider: no-auth
```
