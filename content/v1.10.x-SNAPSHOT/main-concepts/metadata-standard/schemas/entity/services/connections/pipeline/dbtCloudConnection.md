---
title: dbtCloudConnection
slug: /main-concepts/metadata-standard/schemas/entity/services/connections/pipeline/dbtcloudconnection
---

# dbtCloudConnection

*dbtCloud Connection Config*

## Properties

- **`type`**: Service Type. Refer to *#/definitions/dbtCloudType*. Default: `dbtCloud`.
- **`host`** *(string)*: dbt cloud Access URL.
- **`discoveryAPI`** *(string)*: dbt cloud Metadata API URL.
- **`accountId`** *(string)*: ID of your dbt cloud account.
- **`jobIds`** *(array)*: List of IDs of your dbt cloud jobs separated by comma `,`.
  - **Items** *(string)*
- **`projectIds`** *(array)*: List of IDs of your dbt cloud projects separated by comma `,`.
  - **Items** *(string)*
- **`numberOfRuns`** *(integer)*: Number of runs to fetch from dbt cloud. Default: `100`.
- **`token`** *(string)*: Generated Token to connect to dbtCloud.
- **`pipelineFilterPattern`**: Regex exclude pipelines. Refer to *../../../../type/filterPattern.json#/definitions/filterPattern*.
- **`supportsMetadataExtraction`**: Refer to *../connectionBasicType.json#/definitions/supportsMetadataExtraction*.
## Definitions

- **`dbtCloudType`** *(string)*: Service type. Must be one of: `['dbtCloud']`. Default: `dbtCloud`.


Documentation file automatically generated at 2025-08-12 05:39:47.683420+00:00.
