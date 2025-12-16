---
title: Governance Workflows - Tag Approval Workflow
description: Example workflow that routes tag changes through reviewer approvals before applying updates.
slug: /how-to-guides/data-governance/workflows/examples/tag-approval-workflow
collate: true
---

# Tag Approval Workflow

## Overview
The **Tag Approval Workflow** ensures that new or modified tags meet required metadata standards before they are approved for use in the data catalog. This workflow validates essential tag information, routes qualifying tags for human approval, and updates their status accordingly.  
By enforcing validation and approval steps, the workflow maintains high-quality, well-governed tagging across the organization.

## How the Workflow Works

1. **Initial Tag Validation**  
   When a tag enters the workflow, it is first checked for required metadata fields:
    - A valid **Display Name**
    - Assigned **Reviewers**

2. **Metadata Validation Outcome**
    - If **both requirements are met**, the workflow continues.
    - If **either requirement is missing**, the workflow stops and the tag status is set to **Rejected**.

3. **Status Update: IN REVIEW**  
   For tags that pass the initial validation, the workflow automatically updates the tag’s status to **IN REVIEW**.

4. **User Approval Step**  
   A designated reviewer receives an approval request to evaluate and approve or reject the tag.

5. **Approval Decision Handling**
    - If the reviewer **approves** the tag, the workflow updates the tag’s status to **Approved**.
    - If the reviewer **rejects** the tag, the workflow updates the tag’s status to **Rejected**.

6. **Workflow Completion**  
   The workflow ends after the final approval or rejection status has been assigned.

## Workflow Diagram

Below is the visual representation of the Tag Approval Workflow:

{% image src="/images/v1.10/how-to-guides/governance/TagApprovalWorkflow.gif" alt="Tag Approval Workflow" /%}

{% image src="/images/v1.10/how-to-guides/governance/TagApprovalWorkflow.png" alt="Tag Approval Workflow" /%}

## Key Features

- **Automated metadata checks** for essential tag fields
- **Automatic workflow-driven status updates** (IN REVIEW → Approved/Rejected)
- **Human-in-the-loop approval** step
- **Quality assurance for new and updated tags**
- **Consistent governance enforcement** across tagging activities

## Example Outcomes

| Condition                               | Resulting Status |
|-----------------------------------------|------------------|
| Missing Display Name                    | **Rejected**     |
| No reviewers assigned                   | **Rejected**     |
| Requirements met, reviewer approves tag | **Approved**     |
| Requirements met, reviewer rejects tag  | **Rejected**     |

## Why This Workflow Matters

- Ensures **tag consistency and accuracy** across the catalog
- Prevents low-quality or incomplete tags from entering production
- Provides **clear approval tracking** for data stewards
- Maintains **taxonomy and governance standards**
- Reduces manual oversight through automation

## Summary
The **Tag Approval Workflow** provides an automated and controlled process for validating and approving tags in the data catalog. By enforcing metadata completeness, routing tags for approval, and automatically updating their statuses, the workflow improves tagging quality, enhances governance, and ensures consistency across the organization's metadata ecosystem.