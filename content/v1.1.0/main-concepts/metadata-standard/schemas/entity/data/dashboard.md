---
title: dashboard
slug: /main-concepts/metadata-standard/schemas/entity/data/dashboard
---

# Dashboard

*This schema defines the Dashboard entity. Dashboards are computed from data and visually present data, metrics, and KPIs. They are typically updated in real-time and allow interactive data exploration.*

## Properties

- **`id`**: Unique identifier that identifies a dashboard instance. Refer to *../../type/basic.json#/definitions/uuid*.
- **`name`**: Name that identifies this dashboard. Refer to *../../type/basic.json#/definitions/entityName*.
- **`displayName`** *(string)*: Display Name that identifies this Dashboard. It could be title or label from the source services.
- **`fullyQualifiedName`**: A unique name that identifies a dashboard in the format 'ServiceName.DashboardName'. Refer to *../../type/basic.json#/definitions/fullyQualifiedEntityName*.
- **`description`**: Description of the dashboard, what it is, and how to use it. Refer to *../../type/basic.json#/definitions/markdown*.
- **`project`** *(string)*: Name of the project / workspace / collection in which the dashboard is contained.
- **`version`**: Metadata version of the entity. Refer to *../../type/entityHistory.json#/definitions/entityVersion*.
- **`updatedAt`**: Last update time corresponding to the new version of the entity in Unix epoch time milliseconds. Refer to *../../type/basic.json#/definitions/timestamp*.
- **`updatedBy`** *(string)*: User who made the update.
- **`dashboardType`**: Refer to *#/definitions/dashboardType*.
- **`sourceUrl`**: Dashboard URL suffix from its service. Refer to *../../type/basic.json#/definitions/sourceUrl*.
- **`charts`**: All the charts included in this Dashboard. Refer to *../../type/entityReferenceList.json#/definitions/entityReferenceList*. Default: `None`.
- **`dataModels`**: List of data models used by this dashboard or the charts contained on it. Refer to *../../type/entityReferenceList.json#/definitions/entityReferenceList*. Default: `None`.
- **`href`**: Link to the resource corresponding to this entity. Refer to *../../type/basic.json#/definitions/href*.
- **`owner`**: Owner of this dashboard. Refer to *../../type/entityReference.json*.
- **`followers`**: Followers of this dashboard. Refer to *../../type/entityReferenceList.json#/definitions/entityReferenceList*.
- **`tags`** *(array)*: Tags for this dashboard. Default: `None`.
  - **Items**: Refer to *../../type/tagLabel.json*.
- **`service`**: Link to service where this dashboard is hosted in. Refer to *../../type/entityReference.json*.
- **`serviceType`**: Service type where this dashboard is hosted in. Refer to *../services/dashboardService.json#/definitions/dashboardServiceType*.
- **`usageSummary`**: Latest usage information for this dashboard. Refer to *../../type/usageDetails.json*. Default: `None`.
- **`changeDescription`**: Change that lead to this version of the entity. Refer to *../../type/entityHistory.json#/definitions/changeDescription*.
- **`deleted`** *(boolean)*: When `true` indicates the entity has been soft deleted. Default: `False`.
- **`extension`**: Entity extension data with custom attributes added to the entity. Refer to *../../type/basic.json#/definitions/entityExtension*.
- **`domain`**: Domain the Dashboard belongs to. When not set, the Dashboard inherits the domain from the dashboard service it belongs to. Refer to *../../type/entityReference.json*.
- **`dataProducts`**: List of of data products this entity is part of. Refer to *../../type/entityReferenceList.json#/definitions/entityReferenceList*.
## Definitions

- **`dashboardType`** *(string)*: This schema defines the type used for describing different types of dashboards. Must be one of: `['Dashboard', 'Report']`. Default: `Dashboard`.


Documentation file automatically generated at 2023-07-07 05:50:35.981927.
