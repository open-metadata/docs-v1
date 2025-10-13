---
title: dbtLocalConfig
slug: /main-concepts/metadata-standard/schemas/metadataingestion/dbtconfig/dbtlocalconfig
---

# dbt Local Config

*dbt Catalog, Manifest and Run Results file path config.*

## Properties

- **`dbtConfigType`** *(string)*: dbt Configuration type. Must be one of: `['local']`. Default: `local`.
- **`dbtCatalogFilePath`** *(string)*: dbt catalog file path to extract dbt models with their column schemas.
- **`dbtManifestFilePath`** *(string)*: dbt manifest file path to extract dbt models and associate with tables.
- **`dbtRunResultsFilePath`** *(string)*: dbt run results file path to extract the test results information.
- **`dbtSourcesFilePath`** *(string)*: dbt sources file path to extract the freshness test result.


Documentation file automatically generated at 2025-08-12 05:39:47.683420+00:00.
