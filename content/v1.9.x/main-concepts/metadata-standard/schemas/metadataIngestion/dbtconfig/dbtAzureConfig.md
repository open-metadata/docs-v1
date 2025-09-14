---
title: dbtAzureConfig | OpenMetadata dbt Azure Config
description: Represent dbt Azure configuration for reading files from Azure Blob Storage for ingestion.
slug: /main-concepts/metadata-standard/schemas/metadataingestion/dbtconfig/dbtazureconfig
---

# dbt Azure Config

*dbt Catalog, Manifest and Run Results files in Azure bucket. We will search for catalog.json, manifest.json and run_results.json.*

## Properties

- **`dbtConfigType`** *(string)*: dbt Configuration type. Must be one of: `["azure"]`. Default: `"azure"`.
- **`dbtSecurityConfig`**: Refer to *[../../security/credentials/azureCredentials.json](#/../security/credentials/azureCredentials.json)*.
- **`dbtPrefixConfig`** *(object)*: Details of the bucket where the dbt files are stored. Cannot contain additional properties.
  - **`dbtBucketName`** *(string)*: Name of the bucket where the dbt files are stored.
  - **`dbtObjectPrefix`** *(string)*: Path of the folder where the dbt files are stored.


Documentation file automatically generated at 2025-01-15 09:05:41.923720+00:00.
