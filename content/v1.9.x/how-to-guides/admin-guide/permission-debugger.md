---
title: Permission Debugger | Analyze and Troubleshoot User Access
description: Use the Permission Debugger to simulate permission checks, verify policies, and troubleshoot user access issues across roles, teams, and resources.
slug: /how-to-guides/admin-guide/permission-debugger
---

# Permission Debugger

The **Permission Debugger** allows administrators to analyze and debug user permissions across roles, teams, and policies. This feature is critical for troubleshooting access issues, verifying policy behavior, and ensuring users have the correct level of access.

## How It Works

The Permission Debugger simulates permission checks for a given user on a selected resource and operation. It provides detailed insight into:

- Which policies and rules were evaluated
- The final allow/deny decision
- Matching rule count
- Evaluation time


## How to Use the Permission Debugger

### 1. Select a User

First navigate to settings > Access Control > Permission Debugger
Use the input field to search for and select the user whose permissions you want to inspect.

{% image
src="/images/v1.9/how-to-guides/admin-guide/permission-debugger/permission1.png"
alt="Select a User in Permission Debugger"
caption="Create Observability Alerts"
/%}

### 2. Define the Permission Check

- **Resource**: Select a resource type.
  - Options include: `user`, `team`, `table`, `database`, `glossary`, `tag`, `glossaryTerm`, `searchIndex`, `mlModel`, `container`, `topic`, `pipeline`, `dashboard`, `databaseSchema`

- **Operation**: Choose the operation to check against the selected resource.
  - Examples: `ViewAll`, `EditAll`, `Deploy`, `Trigger`, `Kill`, `GenerateToken`, etc.

- **Resource FQN or ID (Optional)**: Provide a Fully Qualified Name (FQN) or unique ID of a specific resource if you want to debug at the resource instance level.

{% image
src="/images/v1.9/how-to-guides/admin-guide/permission-debugger/permission2.png"
alt="Define the Permission Check"
caption="Define the Permission Check"
/%}

### 3. **Evaluate** Permission

Click the **Evaluate** button to perform the permission check.

{% image
src="/images/v1.9/how-to-guides/admin-guide/permission-debugger/permission3.png"
alt="Evaluate Permission"
caption="Evaluate Permission"
/%}

## Example 1: DENIED (EditAll on Table)

{% image
src="/images/v1.9/how-to-guides/admin-guide/permission-debugger/permission4.png"
alt="Permission Debugger Example: DENIED"
caption="Permission Debugger Example: DENIED"
/%}

**User**: `prajwal.pp44`  
**Resource**: `table`  
**Operation**: `EditAll`  
**Resource FQN**: `sample_data.ecommerce_db.shopify.dim_address_clean`

**Result**:

> **Decision: DENIED**  
> User `prajwal.pp44` is **Denied** to perform `EditAll` on  
> `table (sample_data.ecommerce_db.shopify.dim_address_clean)`

**Evaluation Summary**:

| Metric               | Value     |
|----------------------|-----------|
| Policies Evaluated   | 2         |
| Rules Evaluated      | 1048      |
| Matching Rules       | 0         |
| Allow Rules          | 0         |
| Deny Rules           | 0         |
| Time                 | 354ms     |

## Example 2: ALLOWED (ViewAll on Table)

{% image
src="/images/v1.9/how-to-guides/admin-guide/permission-debugger/permission5.png"
alt="Permission Debugger Example: ALLOWED"
caption="Permission Debugger Example: ALLOWED"
/%}

This example demonstrates a **successful permission evaluation** for a user attempting to view a specific table resource using the `ViewAll` operation.

### 📄 Scenario

- **User**: `prajwal.pp44`
- **Resource**: `table`
- **Operation**: `ViewAll`
- **Resource FQN**: `sample_data.ecommerce_db.shopify.dim_address_clean`

### 🔍 Evaluation Result

> **Decision: ALLOWED**  
> User `prajwal.pp44` is **Allowed** to perform `ViewAll` on  
> `table (sample_data.ecommerce_db.shopify.dim_address_clean)`

### 📊 Evaluation Summary

| Detail                 | Value                                                       |
|------------------------|-------------------------------------------------------------|
| **Policies Evaluated** | 2                                                           |
| **Rules Evaluated**    | 1048                                                        |
| **Matching Rules**     | 1046                                                        |
| **Allow Rules**        | 0                                                           |
| **Deny Rules**         | 0                                                           |
| **Evaluation Time**    | 363ms                                                       |

## Use Cases

- Debug permission issues for a specific user.
- Validate that newly created policies are functioning as expected.
- Understand why a user has or doesn't have access to specific resources.
