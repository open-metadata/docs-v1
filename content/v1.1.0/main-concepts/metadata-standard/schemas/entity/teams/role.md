---
title: role
slug: /main-concepts/metadata-standard/schemas/entity/teams/role
---

# Role

*A `Role` is a collection of `Policies` that provides access control. A user or a team can be assigned one or multiple roles that provide privileges to a user and members of a team to perform the job function.*

## Properties

- **`id`**: Refer to *../../type/basic.json#/definitions/uuid*.
- **`name`**: Refer to *#/definitions/roleName*.
- **`fullyQualifiedName`**: FullyQualifiedName same as `name`. Refer to *../../type/basic.json#/definitions/fullyQualifiedEntityName*.
- **`displayName`** *(string)*: Name used for display purposes. Example 'Data Consumer'.
- **`description`**: Description of the role. Refer to *../../type/basic.json#/definitions/markdown*.
- **`version`**: Metadata version of the entity. Refer to *../../type/entityHistory.json#/definitions/entityVersion*.
- **`updatedAt`**: Last update time corresponding to the new version of the entity in Unix epoch time milliseconds. Refer to *../../type/basic.json#/definitions/timestamp*.
- **`updatedBy`** *(string)*: User who made the update.
- **`href`**: Link to the resource corresponding to this entity. Refer to *../../type/basic.json#/definitions/href*.
- **`changeDescription`**: Change that lead to this version of the entity. Refer to *../../type/entityHistory.json#/definitions/changeDescription*.
- **`allowDelete`** *(boolean)*: Some system roles can't be deleted.
- **`allowEdit`** *(boolean)*: Some system roles can't be edited.
- **`deleted`** *(boolean)*: When `true` indicates the entity has been soft deleted. Default: `False`.
- **`policies`**: Policies that is attached to this role. Refer to *../../type/entityReferenceList.json#/definitions/entityReferenceList*.
- **`users`**: Users that have this role assigned to them. Refer to *../../type/entityReferenceList.json#/definitions/entityReferenceList*.
- **`teams`**: Teams that have this role assigned to them. Refer to *../../type/entityReferenceList.json#/definitions/entityReferenceList*.
- **`provider`**: Refer to *../../type/basic.json#/definitions/providerType*.
- **`disabled`** *(boolean)*: System policy can't be deleted. Use this flag to disable them.
## Definitions

- **`roleName`**: A unique name for the role. Refer to *../../type/basic.json#/definitions/entityName*.


Documentation file automatically generated at 2023-07-07 05:50:35.981927.
