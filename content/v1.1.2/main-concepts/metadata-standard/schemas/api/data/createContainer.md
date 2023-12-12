---
title: createContainer
slug: /main-concepts/metadata-standard/schemas/api/data/createcontainer
---

# CreateContainerRequest

*Create Container Model entity request*

## Properties

- **`name`**: Name that identifies this Container model. Refer to *../../entity/data/container.json#/definitions/entityName*.
- **`displayName`** *(string)*: Display Name that identifies this Container model.
- **`description`**: Description of the Container instance. Refer to *../../type/basic.json#/definitions/markdown*.
- **`service`**: Link to the storage service where this container is hosted in. Refer to *../../type/basic.json#/definitions/fullyQualifiedEntityName*.
- **`parent`**: Link to the parent container under which this entity sits. Refer to *../../type/entityReference.json*.
- **`dataModel`**: References to the container's data model, if data is structured, or null otherwise. Refer to *../../entity/data/container.json#/definitions/containerDataModel*. Default: `None`.
- **`prefix`** *(string)*: Optional prefix path defined for this container. Default: `None`.
- **`numberOfObjects`** *(number)*: The number of objects/files this container has. Default: `None`.
- **`size`** *(number)*: The total size in KB this container has. Default: `None`.
- **`fileFormats`** *(array)*: File & data formats identified for the container:  e.g. dataFormats=[csv, json]. These can be present both when the container has a dataModel or not. Default: `None`.
  - **Items**: Refer to *../../entity/data/container.json#/definitions/fileFormat*.
- **`owner`**: Owner of this database. Refer to *../../type/entityReference.json*.
- **`tags`** *(array)*: Tags for this Container Model. Default: `None`.
  - **Items**: Refer to *../../type/tagLabel.json*.
- **`extension`**: Entity extension data with custom attributes added to the entity. Refer to *../../type/basic.json#/definitions/entityExtension*.
- **`domain`** *(string)*: Fully qualified name of the domain the Container belongs to.


Documentation file automatically generated at 2023-07-07 05:50:35.981927.
