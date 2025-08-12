---
title: sasConnection
slug: /main-concepts/metadata-standard/schemas/entity/services/connections/database/sasconnection
---

# SASConnection

*SAS Connection Config*

## Properties

- **`type`**: Service Type. Refer to *#/definitions/sasType*. Default: `SAS`.
- **`username`** *(string)*: Username to connect to SAS Viya.
- **`password`** *(string)*: Password to connect to SAS Viya.
- **`serverHost`** *(string)*: Hostname of SAS Viya deployment.
- **`filter`** *(string)*: A filter expression specifying items for import. For more information [see](https://developer.sas.com/apis/rest/DataManagement/#catalog-search)

## Definitions

- **`sasType`** *(string)*: Service type. Must be one of: `['SAS']`. Default: `SAS`.


Documentation file automatically generated at 2023-12-06 13:47:02.454513.
