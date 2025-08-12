---
title: addDomainAction
slug: /main-concepts/metadata-standard/schemas/entity/applications/configuration/external/automator/adddomainaction
---

# AddDomainAction

*Add an owner to the selected assets.*

## Properties

- **`type`**: Application Type. Refer to *[#/definitions/addDomainActionType](#definitions/addDomainActionType)*. Default: `"AddDomainAction"`.
- **`domain`**: Domain to apply. Refer to *[../../../../../type/entityReference.json](#/../../../../type/entityReference.json)*.
- **`overwriteMetadata`** *(boolean)*: Update the domain even if it is defined in the asset. By default, we will only apply the domain to assets without domain. Default: `false`.
## Definitions

- **`addDomainActionType`** *(string)*: Add Owner Action Type. Must be one of: `["AddDomainAction"]`. Default: `"AddDomainAction"`.


Documentation file automatically generated at 2025-01-15 09:05:25.266839+00:00.
