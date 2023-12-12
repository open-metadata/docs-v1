---
title: mlmodelService
slug: /main-concepts/metadata-standard/schemas/entity/services/mlmodelservice
---

# MlModelService

*MlModel Service Entity, such as MlFlow.*

## Properties

- **`id`**: Unique identifier of this pipeline service instance. Refer to *../../type/basic.json#/definitions/uuid*.
- **`name`**: Name that identifies this pipeline service. Refer to *../../type/basic.json#/definitions/entityName*.
- **`fullyQualifiedName`**: FullyQualifiedName same as `name`. Refer to *../../type/basic.json#/definitions/fullyQualifiedEntityName*.
- **`serviceType`**: Type of pipeline service such as Airflow or Prefect... Refer to *#/definitions/mlModelServiceType*.
- **`description`** *(string)*: Description of a pipeline service instance.
- **`displayName`** *(string)*: Display Name that identifies this pipeline service. It could be title or label from the source services.
- **`version`**: Metadata version of the entity. Refer to *../../type/entityHistory.json#/definitions/entityVersion*.
- **`updatedAt`**: Last update time corresponding to the new version of the entity in Unix epoch time milliseconds. Refer to *../../type/basic.json#/definitions/timestamp*.
- **`updatedBy`** *(string)*: User who made the update.
- **`pipelines`**: References to pipelines deployed for this pipeline service to extract metadata. Refer to *../../type/entityReferenceList.json#/definitions/entityReferenceList*.
- **`connection`**: Refer to *#/definitions/mlModelConnection*.
- **`testConnectionResult`**: Last test connection results for this service. Refer to *connections/testConnectionResult.json*.
- **`tags`** *(array)*: Tags for this MlModel Service. Default: `None`.
  - **Items**: Refer to *../../type/tagLabel.json*.
- **`owner`**: Owner of this pipeline service. Refer to *../../type/entityReference.json*.
- **`href`**: Link to the resource corresponding to this pipeline service. Refer to *../../type/basic.json#/definitions/href*.
- **`changeDescription`**: Change that lead to this version of the entity. Refer to *../../type/entityHistory.json#/definitions/changeDescription*.
- **`deleted`** *(boolean)*: When `true` indicates the entity has been soft deleted. Default: `False`.
- **`domain`**: Domain the MLModel service belongs to. Refer to *../../type/entityReference.json*.
## Definitions

- **`mlModelServiceType`** *(string)*: Type of MlModel service. Must be one of: `['Mlflow', 'Sklearn', 'CustomMlModel', 'SageMaker']`.
- **`mlModelConnection`** *(object)*: MlModel Connection. Cannot contain additional properties.
  - **`config`**


Documentation file automatically generated at 2023-07-07 05:50:35.981927.
