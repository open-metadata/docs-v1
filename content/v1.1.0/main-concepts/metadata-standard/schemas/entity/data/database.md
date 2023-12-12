---
title: database
slug: /main-concepts/metadata-standard/schemas/entity/data/database
---

# Database

*This schema defines the Database entity. A database also referred to as Database Catalog is a collection of schemas.*

## Properties

- **`id`**: Unique identifier that identifies this database instance. Refer to *../../type/basic.json#/definitions/uuid*.
- **`name`**: Name that identifies the database. Refer to *#/definitions/entityName*.
- **`fullyQualifiedName`**: Name that uniquely identifies a database in the format 'ServiceName.DatabaseName'. Refer to *../../type/basic.json#/definitions/fullyQualifiedEntityName*.
- **`displayName`** *(string)*: Display Name that identifies this database.
- **`description`**: Description of the database instance. Refer to *../../type/basic.json#/definitions/markdown*.
- **`tags`** *(array)*: Tags for this Database. Default: `None`.
  - **Items**: Refer to *../../type/tagLabel.json*.
- **`version`**: Metadata version of the entity. Refer to *../../type/entityHistory.json#/definitions/entityVersion*.
- **`updatedAt`**: Last update time corresponding to the new version of the entity in Unix epoch time milliseconds. Refer to *../../type/basic.json#/definitions/timestamp*.
- **`updatedBy`** *(string)*: User who made the update.
- **`href`**: Link to the resource corresponding to this entity. Refer to *../../type/basic.json#/definitions/href*.
- **`owner`**: Owner of this database. Refer to *../../type/entityReference.json*.
- **`service`**: Link to the database cluster/service where this database is hosted in. Refer to *../../type/entityReference.json*.
- **`serviceType`**: Service type where this database is hosted in. Refer to *../services/databaseService.json#/definitions/databaseServiceType*.
- **`location`**: Reference to the Location that contains this database. Refer to *../../type/entityReference.json*.
- **`usageSummary`**: Latest usage information for this database. Refer to *../../type/usageDetails.json*. Default: `None`.
- **`databaseSchemas`**: References to schemas in the database. Refer to *../../type/entityReferenceList.json#/definitions/entityReferenceList*.
- **`changeDescription`**: Change that lead to this version of the entity. Refer to *../../type/entityHistory.json#/definitions/changeDescription*.
- **`default`** *(boolean)*: Some databases don't support a database/catalog in the hierarchy and use default database. For example, `MySql`. For such databases, set this flag to true to indicate that this is a default database. Default: `False`.
- **`deleted`** *(boolean)*: When `true` indicates the entity has been soft deleted. Default: `False`.
- **`retentionPeriod`**: Retention period of the data in the database. Period is expressed as duration in ISO 8601 format in UTC. Example - `P23DT23H`. Refer to *../../type/basic.json#/definitions/duration*.
- **`extension`**: Entity extension data with custom attributes added to the entity. Refer to *../../type/basic.json#/definitions/entityExtension*.
- **`domain`**: Domain the Database belongs to. When not set, the Database inherits the domain from the database service it belongs to. Refer to *../../type/entityReference.json*.
## Definitions

- **`entityName`** *(string)*: Name of a table. Expected to be unique within a database.


Documentation file automatically generated at 2023-07-07 05:50:35.981927.
