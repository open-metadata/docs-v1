---
title: dataProduct
slug: /main-concepts/metadata-standard/schemas/entity/domains/dataproduct
---

# DataProduct

*A `Data Product` or `Data as a Product` is a logical unit that contains all components to process and store data for analytical or data-intensive use cases made available to data consumers.*

## Properties

- **`id`**: Unique ID of the Data Product. Refer to *../../type/basic.json#/definitions/uuid*.
- **`name`**: A unique name of the Data Product. Refer to *../../type/basic.json#/definitions/entityName*.
- **`fullyQualifiedName`**: FullyQualifiedName is `domain.dataProductName` or `sub-domain.dataProductName`. Refer to *../../type/basic.json#/definitions/fullyQualifiedEntityName*.
- **`displayName`** *(string)*: Name used for display purposes. Example 'Marketing', 'Payments', etc.
- **`description`**: Description of the Data Product. Refer to *../../type/basic.json#/definitions/markdown*.
- **`style`**: Refer to *../../type/basic.json#/definitions/style*.
- **`version`**: Metadata version of the entity. Refer to *../../type/entityHistory.json#/definitions/entityVersion*.
- **`updatedAt`**: Last update time corresponding to the new version of the entity in Unix epoch time milliseconds. Refer to *../../type/basic.json#/definitions/timestamp*.
- **`updatedBy`** *(string)*: User who made the update.
- **`href`**: Link to the resource corresponding to this entity. Refer to *../../type/basic.json#/definitions/href*.
- **`owner`**: Owner of this Data Product. Refer to *../../type/entityReference.json*.
- **`experts`**: List of users who are experts for this Data Product. Refer to *../../type/entityReferenceList.json*. Default: `None`.
- **`domain`**: Domain or sub-domain to which this Data Product belongs to. Refer to *../../type/entityReference.json*.
- **`assets`**: Data assets collection that is part of this data product. Refer to *../../type/entityReferenceList.json*.
- **`changeDescription`**: Change that lead to this version of the entity. Refer to *../../type/entityHistory.json#/definitions/changeDescription*.


Documentation file automatically generated at 2023-10-27 13:55:46.343512.
