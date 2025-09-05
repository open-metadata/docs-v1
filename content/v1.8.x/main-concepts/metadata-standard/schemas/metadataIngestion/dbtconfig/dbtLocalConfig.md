---
title: dbtLocalConfig | OpenMetadata dbt Local Config
description: Define the dbt Local Config schema used to manage local dbt ingestion, including project path, profiles directory, and target specifications.
slug: /main-concepts/metadata-standard/schemas/metadataingestion/dbtconfig/dbtlocalconfig
---

# dbt Local Config

*dbt Catalog, Manifest and Run Results file path config.*

## Properties

- **`dbtConfigType`** *(string)*: dbt Configuration type. Must be one of: `["local"]`. Default: `"local"`.
- **`dbtCatalogFilePath`** *(string)*: dbt catalog file path to extract dbt models with their column schemas.
- **`dbtManifestFilePath`** *(string)*: dbt manifest file path to extract dbt models and associate with tables.
- **`dbtRunResultsFilePath`** *(string)*: dbt run results file path to extract the test results information.
- **`dbtSourcesFilePath`** *(string)*: dbt sources file path to extract the freshness test result.


Documentation file automatically generated at 2025-01-15 09:05:41.923720+00:00.
