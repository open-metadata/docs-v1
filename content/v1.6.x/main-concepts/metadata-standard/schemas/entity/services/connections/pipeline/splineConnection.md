---
title: splineConnection
slug: /main-concepts/metadata-standard/schemas/entity/services/connections/pipeline/splineconnection
---

# SplineConnection

*Spline Metadata Database Connection Config*

## Properties

- **`type`**: Service Type. Refer to *[#/definitions/SplineType](#definitions/SplineType)*. Default: `"Spline"`.
- **`hostPort`** *(string, format: uri)*: Spline REST Server Host & Port.
- **`uiHostPort`** *(string, format: uri)*: Spline UI Host & Port.
- **`supportsMetadataExtraction`**: Refer to *[../connectionBasicType.json#/definitions/supportsMetadataExtraction](#/connectionBasicType.json#/definitions/supportsMetadataExtraction)*.
## Definitions

- **`SplineType`** *(string)*: Service type. Must be one of: `["Spline"]`. Default: `"Spline"`.


Documentation file automatically generated at 2025-01-15 09:05:25.266839+00:00.
