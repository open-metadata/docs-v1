---
title: dbtHttpConfig
slug: /main-concepts/metadata-standard/schemas/metadataingestion/dbtconfig/dbthttpconfig
---

# dbt HTTP Config

*dbt Catalog, Manifest and Run Results HTTP path configuration.*

## Properties

- **`dbtConfigType`** *(string)*: dbt Configuration type. Must be one of: `['http']`. Default: `http`.
- **`dbtCatalogHttpPath`** *(string)*: dbt catalog http file path to extract dbt models with their column schemas.
- **`dbtManifestHttpPath`** *(string)*: dbt manifest http file path to extract dbt models and associate with tables.
- **`dbtRunResultsHttpPath`** *(string)*: dbt run results http file path to extract the test results information.
- **`dbtSourcesHttpPath`** *(string)*: dbt sources http file path to extract freshness test results information.


Documentation file automatically generated at 2025-08-12 05:39:47.683420+00:00.
