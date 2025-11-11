---
title: Creating Custom Workflows | Collate Documentation
description: Learn how to create, configure, and manage custom workflows with nodes like triggers, conditions, actions, and approvals to automate data governance.
slug: /how-to-guides/data-governance/custom-workflows
collate: true
---

# Custom Workflows

## Creating a New Workflow

### **Step 1**: Navigate to Workflow Creation

Go to **Govern → Workflows → New Workflow**.

{% image
src="/images/v1.10/how-to-guides/governance/customw1.png"
alt="Workflow Creation"
caption="Workflow Creation"
/%}

### Step 2: Configure Basic Details

In the next screen, provide:

- **Name** – This will serve as the unique identifier for your workflow in OpenMetadata tables. *(No spaces allowed.)*
- **Description** – A short summary describing the purpose of the workflow.

{% image
src="/images/v1.10/how-to-guides/governance/customw2.png"
alt="Configure Basic Details"
caption="Configure Basic Details"
/%}

## Available Nodes

{% image
src="/images/v1.10/how-to-guides/governance/customw3.png"
alt="Available Nodes"
caption="Available Nodes"
/%}

### **1. Start Node (Trigger Configuration)**

The **Start Node** is mandatory and acts as the entry point for your workflow. It defines how and when the workflow will be triggered.

{% image
src="/images/v1.10/how-to-guides/governance/customw4.png"
alt="Trigger Configuration"
caption="Trigger Configuration"
/%}

**Drag and Drop the Start Node.** 

There are two types of triggers:

### **Event-Based Trigger**

This trigger starts the workflow based on specific entity operations such as **Create**, **Update**, or **Patch**.

- **Data Asset** – Choose one or multiple data assets to monitor.
- **Event Type** – Specify which operations will trigger the workflow.
- **Exclude Fields** – Define fields that should not trigger the workflow (e.g., selecting “Reviewers” prevents triggers when only the reviewers field changes).
- **Filter Criteria** – Add conditions to exclude entities that match specific filters from triggering the workflow.

{% image
src="/images/v1.10/how-to-guides/governance/customw5.png"
alt="Event-Based Trigger"
caption="Event-Based Trigger"
/%}

1. **Periodic Batch Trigger**

This trigger runs workflows **on demand** or **on a schedule** (not event-driven).

- **Data Asset** – Select the relevant data assets.
- **Data Asset Filter** – Define filters to specify which entities the workflow should act on.
- **Schedule Type** – Choose between *On Demand* or *Scheduled*.
- **Batch Size** – Set how many entities to process per iteration (depends on your data size).

{% image
src="/images/v1.10/how-to-guides/governance/customw6.png"
alt="Periodic Batch Trigger"
caption="Periodic Batch Trigger"
/%}

## Other Workflow Nodes:

### **2. Check Condition Node**

This node evaluates conditions on data assets.

Examples:

- Is a description provided?
- Are owners assigned?
- Is Collate the owner of this asset?
- Is the asset Tier 1?

You can define multiple conditions.

{% image
src="/images/v1.10/how-to-guides/governance/customw7.png"
alt="Define Conditions"
caption="Define Conditions"
/%}

{% image
src="/images/v1.10/how-to-guides/governance/customw8.png"
alt="Check Condition Node"
caption="Check Condition Node"
/%}

Each Check Condition node has two output branches:

- **TRUE** – When all conditions are satisfied.
- **FALSE** – When any condition fails.
    
    Both branches must be connected for a complete workflow path.
    
{% image
src="/images/v1.10/how-to-guides/governance/customw9.png"
alt="Connection Condition"
caption="Connection Condition"
/%}

### **3. Set Action Node**

Use this node to update or assign values to entity fields.

Supported fields include:

- Display Name
- Description
- Tags
- Tier
- Status
- Certification
- Glossary Terms

{% image
src="/images/v1.10/how-to-guides/governance/customw10.png"
alt="Set Action"
caption="Set Action"
/%}

{% image
src="/images/v1.10/how-to-guides/governance/customw11.png"
alt="Set Action"
caption="Set Action"
/%}

{% image
src="/images/v1.10/how-to-guides/governance/customw12.png"
alt="Set Action"
caption="Set Action"
/%}

### **4. User Approval Task**

This node assigns an approval task to designated users (reviewers).

Users can either **Approve** or **Reject** the task.

- The node has two output branches: **TRUE** (Approved) and **FALSE** (Rejected).
- Tasks are automatically sent to the corresponding reviewers of the asset.
- Configure **Approval Threshold** and **Rejection Threshold** to define how many approvals or rejections are needed to finalize the outcome.

{% image
src="/images/v1.10/how-to-guides/governance/customw13.png"
alt="User Approval Task"
caption="User Approval Task"
/%}

### **5. Data Completeness Task**

This node verifies data completeness across asset fields.

Example:

- Check whether all columns in a table include descriptions.
- Based on the percentage of completeness, assign bands and apply certifications accordingly.

{% image
src="/images/v1.10/how-to-guides/governance/customw14.png"
alt="Data Completeness Task"
caption="Data Completeness Task"
/%}

## Example Workflows

1. **Tag Approval Workflow**

A workflow designed to manage and approve tag changes to assets.

{% image
src="/images/v1.10/how-to-guides/governance/customw15.png"
alt="Tag Approval Workflow"
caption="Tag Approval Workflow"
/%}

### **2. Data Completeness Workflow**

A workflow used to evaluate and certify data assets based on field completeness.

{% image
src="/images/v1.10/how-to-guides/governance/customw16.png"
alt="Data Completeness Workflow"
caption="Data Completeness Workflow"
/%}

### Running a Periodic Batch Workflow

To execute an on-demand workflow, click **Run Now**
This immediately triggers the workflow based on its configuration.

{% image
src="/images/v1.10/how-to-guides/governance/customw17.png"
alt="Running a Periodic Batch Workflow"
caption="Running a Periodic Batch Workflow"
/%}
