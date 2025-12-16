---
title: Governance Workflows - User Approval Task
description: Route approval tasks to reviewers with thresholds for approvals and rejections to continue governance workflows.
slug: /how-to-guides/data-governance/workflows/elements/nodes/user-approval-task
collate: true
---

# Governance Workflows - User Approval Task

This node assigns an approval task to designated users (reviewers).

Users can either **Approve** or **Reject** the task.

- The node has two output branches: **TRUE** (Approved) and **FALSE** (Rejected).
- Tasks are automatically sent to the corresponding reviewers of the asset.
- Configure **Approval Threshold** and **Rejection Threshold** to define how many approvals or rejections are needed to finalize the outcome.

{% image src="/images/v1.10/how-to-guides/governance/workflows-create-user-task.png" alt="User Approval Task" /%}
