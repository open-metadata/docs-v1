---
title: entityHierarchy
slug: /main-concepts/metadata-standard/schemas/type/entityhierarchy
---

# EntityHierarchy

*This schema defines the entity hierarchy structure.*

## Properties

- **`id`**: Unique identifier of an entity hierarchy instance. Refer to *[../type/basic.json#/definitions/uuid](#/type/basic.json#/definitions/uuid)*.
- **`name`**: Preferred name for the entity hierarchy. Refer to *[../type/basic.json#/definitions/entityName](#/type/basic.json#/definitions/entityName)*.
- **`displayName`** *(string)*: Display name that identifies this hierarchy.
- **`description`**: Description of the entity hierarchy. Refer to *[../type/basic.json#/definitions/markdown](#/type/basic.json#/definitions/markdown)*.
- **`fullyQualifiedName`**: A unique name that identifies an entity within the hierarchy. It captures name hierarchy in the form of `rootEntity.childEntity`. Refer to *[../type/basic.json#/definitions/fullyQualifiedEntityName](#/type/basic.json#/definitions/fullyQualifiedEntityName)*.
- **`children`**: Other entities that are children of this entity. Refer to *[#/definitions/entityHierarchyList](#definitions/entityHierarchyList)*.
## Definitions

- **`entityHierarchyList`** *(array)*: Default: `[]`.
  - **Items**: Refer to *[entityHierarchy.json](#tityHierarchy.json)*.


Documentation file automatically generated at 2025-01-15 09:05:25.266839+00:00.
