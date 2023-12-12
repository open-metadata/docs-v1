---
title: How to Create a Custom Property for a Data Asset
slug: /how-to-guides/user-guide-for-data-stewards/overview-data-assets/custom
---

# How to Create a Custom Property for a Data Asset

OpenMetadata uses a schema-first approach, and that's why we support custom properties for all types of data assets. Organizations can extend the attributes as required to capture custom metadata. You can view the Custom Properties tab in the detailed view for all types of data assets.

To create a Custom Property in OpenMetadata:
- Navigate to **Settings** >> **Custom Attributes**
- Click on the type of data asset you would like to create a custom property for.
- Click on **Add Property**

{% image
src="/images/v1.1/how-to-guides/discovery/custom1.png"
alt="Create a Custom Property"
caption="Create a Custom Property"
/%}

- Enter the required details: `Name`, `Type`, and `Description`. You can lookup for the details of the information asked on the right side panel.
  - **Name:** The name must start with a lowercase letter, as preferred in the camelCase format. Uppercase letters and numbers can be included in the field name; but spaces, underscores, and dots are not supported.
  - **Type:** Integer, Markdown, and String are supported.
  - **Description:** Describe your custom property to provide more information to your team.
- Click on **Create**.

{% image
src="/images/v1.1/how-to-guides/discovery/custom2.png"
alt="Define a Custom Property"
caption="Define a Custom Property"
/%}

Once the custom property has been created for a type of data asset, you can add the values for the custom property from the Custom Property tab in the detailed view of the data assets.

{% image
src="/images/v1.1/how-to-guides/discovery/custom3.png"
alt="Enter the Value for a Custom Property"
caption="Enter the Value for a Custom Property"
/%}