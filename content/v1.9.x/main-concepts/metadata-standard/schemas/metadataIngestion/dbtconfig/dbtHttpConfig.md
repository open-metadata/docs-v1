---
title: dbtHttpConfig | OpenMetadata dbt HTTP Config
description: Capture dbt HTTP configuration for ingesting dbt files from public or private HTTP sources.
slug: /main-concepts/metadata-standard/schemas/metadataingestion/dbtconfig/dbthttpconfig
---

# dbt HTTP Config

*dbt Catalog, Manifest and Run Results HTTP path configuration.*

## Properties

- **`dbtConfigType`** *(string)*: dbt Configuration type. Must be one of: `["http"]`. Default: `"http"`.
- **`dbtCatalogHttpPath`** *(string)*: dbt catalog http file path to extract dbt models with their column schemas.
- **`dbtManifestHttpPath`** *(string)*: dbt manifest http file path to extract dbt models and associate with tables.
- **`dbtRunResultsHttpPath`** *(string)*: dbt run results http file path to extract the test results information.
- **`dbtSourcesHttpPath`** *(string)*: dbt sources http file path to extract freshness test results information.


Documentation file automatically generated at 2025-01-15 09:05:41.923720+00:00.
