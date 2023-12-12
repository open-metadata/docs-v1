---
title: createDashboard
slug: /main-concepts/metadata-standard/schemas/api/data/createdashboard
---

# CreateDashboardRequest

*Create Dashboard entity request*

## Properties

- **`name`**: Name that identifies this dashboard. Refer to *../../type/basic.json#/definitions/entityName*.
- **`displayName`** *(string)*: Display Name that identifies this Dashboard. It could be title or label from the source services.
- **`description`**: Description of the database instance. What it has and how to use it. Refer to *../../type/basic.json#/definitions/markdown*.
- **`dashboardType`**: Refer to *../../entity/data/dashboard.json#/definitions/dashboardType*.
- **`sourceUrl`**: Dashboard URL suffix from its service. Refer to *../../type/basic.json#/definitions/sourceUrl*.
- **`project`** *(string)*: Name of the project / workspace / collection in which the dashboard is contained.
- **`charts`** *(array)*: List of fully qualified name of charts included in this Dashboard. Default: `None`.
  - **Items**: Refer to *../../type/basic.json#/definitions/fullyQualifiedEntityName*.
- **`dataModels`** *(array)*: List of fully qualified name of data models included in this Dashboard. Default: `None`.
  - **Items**: Refer to *../../type/basic.json#/definitions/fullyQualifiedEntityName*.
- **`tags`** *(array)*: Tags for this dashboard. Default: `None`.
  - **Items**: Refer to *../../type/tagLabel.json*.
- **`owner`**: Owner of this dashboard. Refer to *../../type/entityReference.json*.
- **`service`**: Link to the dashboard service fully qualified name where this dashboard is hosted in. Refer to *../../type/basic.json#/definitions/fullyQualifiedEntityName*.
- **`extension`**: Entity extension data with custom attributes added to the entity. Refer to *../../type/basic.json#/definitions/entityExtension*.
- **`domain`**: Fully qualified name of the domain the Dashboard belongs to. Refer to *../../type/basic.json#/definitions/fullyQualifiedEntityName*.
- **`dataProducts`** *(array)*: List of fully qualified names of data products this entity is part of.
  - **Items**: Refer to *../../type/basic.json#/definitions/fullyQualifiedEntityName*.


Documentation file automatically generated at 2023-07-07 05:50:35.981927.
