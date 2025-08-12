---
title: lightdashConnection
slug: /main-concepts/metadata-standard/schemas/entity/services/connections/dashboard/lightdashconnection
---

# LightdashConnection

*Lightdash Connection Config*

## Properties

- **`type`**: Service Type. Refer to *[#/definitions/lightdashType](#definitions/lightdashType)*. Default: `"Lightdash"`.
- **`hostPort`** *(string, format: uri)*: Address for your running Lightdash instance. Default: `"http://localhost:5000"`.
- **`apiKey`** *(string, format: password)*: The personal access token you can generate in the Lightdash app under the user settings.
- **`projectUUID`** *(string)*: The Project UUID for your Lightdash instance.
- **`spaceUUID`** *(string)*: The Space UUID for your Lightdash instance.
- **`proxyAuthentication`** *(string, format: password)*: Use if your Lightdash instance is behind a proxy like (Cloud IAP).
- **`supportsMetadataExtraction`**: Refer to *[../connectionBasicType.json#/definitions/supportsMetadataExtraction](#/connectionBasicType.json#/definitions/supportsMetadataExtraction)*.
## Definitions

- **`lightdashType`** *(string)*: Lightdash service type. Must be one of: `["Lightdash"]`. Default: `"Lightdash"`.


Documentation file automatically generated at 2025-01-15 09:05:25.266839+00:00.
