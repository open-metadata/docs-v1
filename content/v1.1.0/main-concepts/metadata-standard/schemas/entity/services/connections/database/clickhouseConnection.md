---
title: clickhouseConnection
slug: /main-concepts/metadata-standard/schemas/entity/services/connections/database/clickhouseconnection
---

# ClickhouseConnection

*Clickhouse Connection Config*

## Properties

- **`type`**: Service Type. Refer to *#/definitions/clickhouseType*. Default: `Clickhouse`.
- **`scheme`**: SQLAlchemy driver scheme options. Refer to *#/definitions/clickhouseScheme*. Default: `clickhouse+http`.
- **`username`** *(string)*: Username to connect to Clickhouse. This user should have privileges to read all the metadata in Clickhouse.
- **`password`** *(string)*: Password to connect to Clickhouse.
- **`hostPort`** *(string)*: Host and port of the Clickhouse service.
- **`databaseName`** *(string)*: Optional name to give to the database in OpenMetadata. If left blank, we will use default as the database name.
- **`databaseSchema`** *(string)*: Database Schema of the data source. This is optional parameter, if you would like to restrict the metadata reading to a single schema. When left blank, OpenMetadata Ingestion attempts to scan all the schemas.
- **`duration`** *(integer)*: Clickhouse SQL connection duration.
- **`secure`** *(boolean)*: Establish secure connection with clickhouse.
- **`keyfile`** *(boolean)*: Path to key file for establishing secure connection.
- **`connectionOptions`**: Refer to *../connectionBasicType.json#/definitions/connectionOptions*.
- **`connectionArguments`**: Refer to *../connectionBasicType.json#/definitions/connectionArguments*.
- **`supportsMetadataExtraction`**: Refer to *../connectionBasicType.json#/definitions/supportsMetadataExtraction*.
- **`supportsUsageExtraction`**: Refer to *../connectionBasicType.json#/definitions/supportsUsageExtraction*.
- **`supportsLineageExtraction`**: Refer to *../connectionBasicType.json#/definitions/supportsLineageExtraction*.
- **`supportsDBTExtraction`**: Refer to *../connectionBasicType.json#/definitions/supportsDBTExtraction*.
- **`supportsProfiler`**: Refer to *../connectionBasicType.json#/definitions/supportsProfiler*.
- **`supportsQueryComment`**: Refer to *../connectionBasicType.json#/definitions/supportsQueryComment*.
## Definitions

- **`clickhouseType`** *(string)*: Service type. Must be one of: `['Clickhouse']`. Default: `Clickhouse`.
- **`clickhouseScheme`** *(string)*: SQLAlchemy driver scheme options. Must be one of: `['clickhouse+http', 'clickhouse+native']`. Default: `clickhouse+http`.


Documentation file automatically generated at 2023-07-07 05:50:35.981927.
