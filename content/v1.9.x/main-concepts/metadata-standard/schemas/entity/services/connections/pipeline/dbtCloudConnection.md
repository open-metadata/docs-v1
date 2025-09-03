---
title: dbt Cloud Connection | OpenMetadata dbt Cloud
description: Get started with dbtcloudconnection. Setup instructions, features, and configuration details inside.
slug: /main-concepts/metadata-standard/schemas/entity/services/connections/pipeline/dbtcloudconnection
---

# dbtCloudConnection

*dbtCloud Connection Config*

## Properties

- **`type`**: Service Type. Refer to *[#/definitions/dbtCloudType](#definitions/dbtCloudType)*. Default: `"dbtCloud"`.
- **`host`** *(string, format: uri)*: dbt cloud Access URL.
- **`discoveryAPI`** *(string, format: uri)*: dbt cloud Metadata API URL.
- **`accountId`** *(string)*: ID of your dbt cloud account.
- **`jobIds`** *(array)*: List of IDs of your dbt cloud jobs separated by comma `,`.
  - **Items** *(string)*
- **`projectIds`** *(array)*: List of IDs of your dbt cloud projects separated by comma `,`.
  - **Items** *(string)*
- **`token`** *(string, format: password)*: Generated Token to connect to dbtCloud.
## Definitions

- **`dbtCloudType`** *(string)*: Service type. Must be one of: `["dbtCloud"]`. Default: `"dbtCloud"`.


Documentation file automatically generated at 2025-01-15 09:05:41.923720+00:00.
