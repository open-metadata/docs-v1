---
title: createStoredProcedure
slug: /main-concepts/metadata-standard/schemas/api/data/createstoredprocedure
---

# CreateStoredProcedureRequest

*Create Stored Procedure Request*

## Properties

- **`name`**: Name of a Stored Procedure. Refer to *../../entity/data/storedProcedure.json#/definitions/entityName*.
- **`displayName`** *(string)*: Display Name that identifies this Stored Procedure.
- **`description`**: Description of the Stored Procedure. Refer to *../../type/basic.json#/definitions/markdown*.
- **`owner`**: Owner of this entity. Refer to *../../type/entityReference.json*. Default: `None`.
- **`tags`** *(array)*: Tags for this StoredProcedure. Default: `None`.
  - **Items**: Refer to *../../type/tagLabel.json*.
- **`storedProcedureCode`**: SQL Query definition. Refer to *../../entity/data/storedProcedure.json#/definitions/storedProcedureCode*.
- **`databaseSchema`**: Link to the database schema fully qualified name where this stored procedure is hosted in. Refer to *../../type/basic.json#/definitions/fullyQualifiedEntityName*.
- **`extension`**: Entity extension data with custom attributes added to the entity. Refer to *../../type/basic.json#/definitions/entityExtension*.
- **`sourceUrl`**: Source URL of database schema. Refer to *../../type/basic.json#/definitions/sourceUrl*.
- **`domain`** *(string)*: Fully qualified name of the domain the Stored Procedure belongs to.
- **`lifeCycle`**: Life Cycle of the entity. Refer to *../../type/lifeCycle.json*.


Documentation file automatically generated at 2023-10-27 13:55:46.343512.
