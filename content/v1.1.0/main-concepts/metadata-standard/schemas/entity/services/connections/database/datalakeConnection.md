---
title: datalakeConnection
slug: /main-concepts/metadata-standard/schemas/entity/services/connections/database/datalakeconnection
---

# DatalakeConnection

*Datalake Connection Config*

## Properties

- **`type`**: Service Type. Refer to *#/definitions/datalakeType*. Default: `Datalake`.
- **`configSource`**: Available sources to fetch files.
- **`bucketName`** *(string)*: Bucket Name of the data source. Default: ``.
- **`prefix`** *(string)*: Prefix of the data source. Default: ``.
- **`databaseName`** *(string)*: Optional name to give to the database in OpenMetadata. If left blank, we will use default as the database name.
- **`connectionOptions`**: Refer to *../connectionBasicType.json#/definitions/connectionOptions*.
- **`connectionArguments`**: Refer to *../connectionBasicType.json#/definitions/connectionArguments*.
- **`supportsMetadataExtraction`**: Refer to *../connectionBasicType.json#/definitions/supportsMetadataExtraction*.
- **`supportsProfiler`**: Refer to *../connectionBasicType.json#/definitions/supportsProfiler*.
## Definitions

- **`datalakeType`** *(string)*: Service type. Must be one of: `['Datalake']`. Default: `Datalake`.


Documentation file automatically generated at 2023-07-07 05:50:35.981927.
