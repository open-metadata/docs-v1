---
title: Governance Workflows - Event Based Entity Trigger
description: Trigger workflows using real-time entity changes to automate tasks like alerts, tagging, or governance updates upon system events.
slug: /how-to-guides/data-governance/workflows/elements/triggers/event-based-entity-trigger
collate: true
---

# Event Based Trigger

This trigger starts the workflow based on specific entity operations such as **Create**, **Update**, or **Patch**.

- **Data Asset** – Choose one or multiple data assets to monitor.
- **Event Type** – Specify which operations will trigger the workflow.
- **Exclude Fields** – Define fields that should not trigger the workflow (e.g., selecting “Reviewers” prevents triggers when only the reviewers field changes).
- **Filter Criteria** – Add conditions to exclude entities that match specific filters from triggering the workflow.

{% image src="/images/v1.11/how-to-guides/governance/workflows-event-based-entity-trigger.png" alt="event-based-entity-trigger-example" /%}
