---
title: Governance Workflows - Nodes | Official Documentation
description: Add workflow nodes that perform actions like tagging, notifications, or certification to enforce governance logic.
slug: /how-to-guides/data-governance/workflows/elements/nodes
collate: true
---

# Governance Workflows - Nodes

You can find below a list of available Nodes that can be used with the Governance Workflows.

## Available Workflow Nodes

- **[Start Node](#start-node)** → Configure how and when the workflow is triggered
- **[Check Condition](#check-condition)** → Evaluate asset conditions and branch the workflow  
- **[Set Action](#set-action)** → Update asset fields such as tags, tier, status, or certification
- **[User Approval Task](#user-approval-task)** → Send approval tasks to reviewers with thresholds
- **[Data Completeness Task](#data-completeness-task)** → Measure metadata completeness and drive actions

{% image src="/images/v1.10/how-to-guides/governance/node.png" alt="Nodes" /%}

{%inlineCalloutContainer%}
 {%inlineCallout
 color="violet-70"
 bold="Start Node"
 icon="MdMenuBook"
 href="/how-to-guides/data-governance/workflows/elements/nodes/start-node"
 id="start-node"%}
  Configure how and when the workflow is triggered (event-based or scheduled).
 {%/inlineCallout%}
 {%inlineCallout
  color="violet-70"
  bold="Check Condition"
  icon="MdMenuBook"
  href="/how-to-guides/data-governance/workflows/elements/nodes/check-condition"
  id="check-condition"%}
  Evaluate asset conditions and branch the workflow on true/false results.
 {%/inlineCallout%}
 {%inlineCallout
  color="violet-70"
  bold="Set Action"
  icon="MdMenuBook"
  href="/how-to-guides/data-governance/workflows/elements/nodes/set-action"
  id="set-action"%}
  Update asset fields such as tags, tier, status, or certification.
 {%/inlineCallout%}
 {%inlineCallout
  color="violet-70"
  bold="User Approval Task"
  icon="MdMenuBook"
  href="/how-to-guides/data-governance/workflows/elements/nodes/user-approval-task"
  id="user-approval-task"%}
  Send approval tasks to reviewers with approve/reject thresholds.
 {%/inlineCallout%}
 {%inlineCallout
  color="violet-70"
  bold="Data Completeness Task"
  icon="MdMenuBook"
  href="/how-to-guides/data-governance/workflows/elements/nodes/data-completeness-task"
  id="data-completeness-task"%}
  Measure metadata completeness and drive actions based on coverage.
 {%/inlineCallout%}
{%/inlineCalloutContainer%}
