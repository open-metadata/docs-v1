---
title: createPersona
slug: /main-concepts/metadata-standard/schemas/api/teams/createpersona
---

# CreatePersonaRequest

*Persona entity*

## Properties

- **`name`**: Refer to *[../../type/basic.json#/definitions/entityName](#/../type/basic.json#/definitions/entityName)*.
- **`displayName`** *(string)*: Optional name used for display purposes. Example 'Data Steward'.
- **`description`**: Optional description of the team. Refer to *[../../type/basic.json#/definitions/markdown](#/../type/basic.json#/definitions/markdown)*.
- **`users`** *(array)*: Optional IDs of users that are going to assign a Persona. Default: `null`.
  - **Items**: Refer to *[../../type/basic.json#/definitions/uuid](#/../type/basic.json#/definitions/uuid)*.
- **`domain`** *(string)*: Fully qualified name of the domain the Table belongs to.


Documentation file automatically generated at 2025-01-15 09:05:25.266839+00:00.
