---
title: elasticSearchConfiguration
slug: /main-concepts/metadata-standard/schemas/configuration/elasticsearchconfiguration
---

# ElasticSearchConfiguration

*This schema defines the Elastic Search Configuration.*

## Properties

- **`host`** *(string)*: Elastic Search Host.
- **`port`** *(integer)*: Elastic Search port.
- **`scheme`** *(string)*: Http/Https connection scheme.
- **`username`** *(string)*: Elastic Search Username for Login.
- **`password`** *(string)*: Elastic Search Password for Login.
- **`truststorePath`** *(string)*: Truststore Path.
- **`truststorePassword`** *(string)*: Truststore Password.
- **`connectionTimeoutSecs`** *(integer)*: Connection Timeout in Seconds. Default: `5`.
- **`socketTimeoutSecs`** *(integer)*: Socket Timeout in Seconds. Default: `60`.
- **`keepAliveTimeoutSecs`** *(integer)*: Keep Alive Timeout in Seconds.
- **`batchSize`** *(integer)*: Batch Size for Requests. Default: `10`.
- **`searchIndexMappingLanguage`**: Refer to *#/definitions/searchIndexMappingLanguage*.
- **`searchType`** *(string)*: This enum defines the search Type elastic/open search. Must be one of: `['elasticsearch', 'opensearch']`. Default: `elasticsearch`.
## Definitions

- **`searchIndexMappingLanguage`** *(string)*: This schema defines the language options available for search index mappings. Must be one of: `['EN', 'JP', 'ZH']`. Default: `EN`.


Documentation file automatically generated at 2023-07-07 05:50:35.981927.
