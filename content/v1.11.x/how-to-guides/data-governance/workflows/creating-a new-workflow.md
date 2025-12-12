---
title: Governance Workflows - Creating a New Workflow
description: Create a new governance workflow by setting basic details and running event-based or batch executions.
slug: /how-to-guides/data-governance/workflows/creating-a-new-workflow
collate: true
---

# Governance Workflows - Creating a New Workflow

## Step 1: Navigate to Workflow Creation

Go to **Govern → Workflows → New Workflow**.

{% image src="/images/v1.10/how-to-guides/governance/new1.png" alt="Workflow Creation" /%}

## Step 2: Configure Basic Details

In the next screen, provide:

- **Name** – This will serve as the unique identifier for your workflow in OpenMetadata tables. *(No spaces allowed.)*
- **Description** – A short summary describing the purpose of the workflow.

{% image src="/images/v1.10/how-to-guides/governance/new2.png" alt="Configuration" /%}

Start combining multiple Nodes and create a workflow.

### **Running a Periodic Batch Workflow**

To execute an on-demand workflow, click **Run Now** This immediately triggers the workflow based on its configuration.

{% image src="/images/v1.10/how-to-guides/governance/new3.png" alt="Running a Periodic Batch Workflow" /%}

## Best Practices

1. **Use the Right Type of Trigger**
    - **Event-Based Entity Triggers** are ideal when specific fields must be automatically updated in response to a change.
        
        *Example:* When any attribute of a Glossary Term is modified, its status should automatically update to **IN REVIEW**.
        
    - **Periodic Batch Triggers** are best suited for bulk updates across many entities, especially for classification or enrichment workflows.
        
        *Example:* Tables or Dashboards can be classified as Tier 1, Tier 2, or Tier 3 based on the completeness of their column descriptions.
        
2. **Use a Single Event-Based Workflow per Data Asset**
    - Configure only one event-based entity workflow for each data asset.
        
        Having multiple workflows attempting to update the same field (such as the status of a Glossary Term) can result in unpredictable behavior, as one workflow’s changes may override another’s.
        
3. **Optimize Batch Size for Periodic Workflows**
    - Tune the batch size based on the number of data assets to ensure optimal performance.
    - Avoid running periodic workflows across all entities without filtering. Instead, apply an inclusion filter to limit the result set and prevent performance degradation.
4. **Use User Approval Tasks Only in Event-Based Workflows**
    - User Approval Tasks should be used exclusively in event-driven workflows.
        
        Using them in periodic workflows would generate multiple approval tasks simultaneously, overloading system resources.
        
    - If an approval step is needed in a periodic batch workflow, ensure the workflow scope is limited to a small, controlled set of entities.

## Limitations

1. **User Approval Tasks Are Limited to Assets with Reviewer Support**
    - User Approval Tasks can only be used for data assets that support assigning reviewers.
        
        Reviewer support for additional asset types will be introduced in future releases.
        
2. **Fallback Behavior for Entities Without Reviewers**
    - For entities that do not have any reviewers configured, User Approval Tasks automatically follow the **TRUE** path as a graceful fallback.
        
        *Example:* A Metric without a reviewer will automatically pass the approval step.
