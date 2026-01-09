---
title: Apache Ranger
slug: /connectors/security/ranger
collate: true
---

{% connectorDetailsHeader
name="Ranger"
stage="Beta"
platform="Collate"
availableFeatures=["Reverse Metadata (Collate Only)"]
unavailableFeatures=[]
/ %}

In this section, we provide guides and references to use the Apache Ranger connector for reverse metadata ingestion.

Configure and schedule Apache Ranger reverse metadata workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Reverse Metadata Ingestion](#reverse-metadata-ingestion)
- [Connection Details](#connection-details)
- [Troubleshooting](#troubleshooting)

## Requirements

### Apache Ranger Setup
Apache Ranger 2.0 or greater is required. The user should have access to the Apache Ranger Admin API with appropriate privileges to manage policies and tags.

### Permissions
The user connecting to Apache Ranger should have the following permissions:
- Access to Apache Ranger Admin API endpoints
- Write access to policies and tag definitions
- Write access to tag management
- Read access to service definitions for verification

```bash
# Create a service user in Apache Ranger with the following permissions:
# - Write access to tag management
# - Write access to policy management
# - Read access to service definitions
```

### Connection Details

{% collateContent %}

{% note %} 

When using a **Hybrid Ingestion Runner**, any sensitive credential fields—such as passwords, API keys, or private keys—must reference secrets using the following format:

```
password: secret:/my/database/password
```

This applies **only to fields marked as secrets** in the connection form (these typically mask input and show a visibility toggle icon).

For a complete guide on managing secrets in hybrid setups, see the [Hybrid Ingestion Runner Secret Management Guide](https://docs.getcollate.io/getting-started/day-1/hybrid-saas/hybrid-ingestion-runner#3.-manage-secrets-securely).

{% /note %}

{% /collateContent %}

We support Apache Ranger with Basic Authentication using username and password.


## Reverse Metadata Ingestion

The Apache Ranger connector is designed specifically for **reverse metadata ingestion**. This means that OpenMetadata will sync metadata information (primarily tags) from your data sources back to Apache Ranger.

### How Reverse Metadata Works

1. **Configure Ranger as Sink Service**: Set up Apache Ranger as a sink service in your reverse metadata configuration
2. **Source Service Integration**: When you ingest metadata from source services like Snowflake, Trino, or other databases, OpenMetadata can sync this metadata back to Ranger
3. **Tag Synchronization**: Currently, we sync tag information from OpenMetadata to Apache Ranger, allowing you to manage security policies based on discovered metadata
4. **Policy Management**: While we sync tags to Ranger, the communication between Ranger and your specific data sources needs to be configured separately

### Important Considerations

- **Service Name Matching**: The service name configured in Apache Ranger must match exactly with the service name in OpenMetadata for reverse metadata synchronization to work properly
- **Tag Synchronization**: Currently, we only sync tag information to Ranger.
- **Source-Ranger Communication**: You are responsible for configuring the communication between Apache Ranger and your actual data sources. OpenMetadata only handles the metadata synchronization to Ranger
- **Bidirectional Sync**: This is currently a one-way sync from OpenMetadata to Ranger

### Tag Synchronization Details

Understanding how tag synchronization works between OpenMetadata and Apache Ranger is crucial for proper implementation.

#### What Gets Created During Reverse Metadata Ingestion

During reverse metadata ingestion, OpenMetadata creates **only the mapping** between:
- **Ranger Resources**: The specific entity (database, schema, table, or column)
- **Tags**: The tag name and tag value

**Important:** We do **not** create or depend on tag policies during the reverse metadata workflow. The policy creation is **not mandatory** for the workflow to function. Policies can be created in Ranger after the reverse metadata workflow completes.

#### Policy Management

The actual application of tag-based policies—such as access control, data masking, or row-level filtering—is handled **entirely by Apache Ranger**. OpenMetadata's role is limited to:
1. Syncing tag metadata from OpenMetadata to actual data sources
2. Creating tag-to-resource mappings in Ranger
3. Keeping these mappings synchronized as tags change in OpenMetadata

#### Supported Tag Levels

We provide comprehensive tag support at multiple levels:
- **Database level**: Tags applied to entire databases
- **Schema level**: Tags applied to schemas
- **Table level**: Tags applied to tables
- **Column level**: Tags applied to individual columns

This multi-level support allows you to implement fine-grained governance policies based on your organization's requirements.

#### Tag Naming Convention

OpenMetadata uses a clear and consistent tag naming convention when syncing to Ranger. Tags are formatted as:

```
classification.tag
```

**Example:**
- A tag named `Sensitive` under the `PII` classification in OpenMetadata
- Will be synced to Ranger as: `PII.Sensitive`

This naming convention ensures clarity and prevents naming conflicts in Ranger.

{% image
src="/images/v1.12/connectors/ranger/tag-naming-example.png"
alt="Tag Naming Convention Example"
caption="Example showing PII.Sensitive tag in OpenMetadata and Ranger"
/%}

#### Complete Workflow Example

1. **In OpenMetadata**: You apply the tag `PII.Sensitive` to a column `customer_email` in table `users`
2. **Reverse Metadata Sync**: OpenMetadata creates a mapping in Ranger linking the resource `database.schema.users.customer_email` to tag `PII.Sensitive`
3. **In Apache Ranger**: You create a policy that applies masking to all resources tagged with `PII.Sensitive`
4. **Result**: The policy automatically applies to `customer_email` and any other resources tagged as `PII.Sensitive`

## Metadata Ingestion

{% partial 
  file="/v1.12/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "Apache Ranger", 
    selectServicePath: "/images/v1.12/connectors/ranger/select-service.png",
    addNewServicePath: "/images/v1.12/connectors/ranger/add-new-service.png",
    serviceConnectionPath: "/images/v1.12/connectors/ranger/service-connection.png",
} 
/%}
## Troubleshooting

### Connection Issues
- Verify that the Apache Ranger Admin service is running and accessible
- Check network connectivity between OpenMetadata and Apache Ranger
- Ensure the provided credentials have the necessary write permissions for tags and policies

### Authentication Issues
- Verify username and password for basic authentication
- Ensure the user account is active and has proper permissions in Apache Ranger

### Reverse Metadata Issues
- Verify that the service name in Apache Ranger matches exactly with the service name in OpenMetadata
- Check if the user has write permissions for tag and policy management in Ranger
- Ensure that the source service (Trino, etc.) is properly configured in OpenMetadata before setting up reverse metadata

### API Access Issues
- Verify that the user has write access to Apache Ranger APIs for tags and policies
- Check if the Apache Ranger API endpoints are enabled and accessible
- Ensure proper permissions are granted for policy and tag management operations
