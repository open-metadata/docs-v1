---
title: Governance Workflows - Periodic Batch Entity Trigger
description: Set up periodic triggers to execute workflows in batches, ideal for regular governance tasks like validations and syncs.
slug: /how-to-guides/data-governance/workflows/elements/triggers/periodic-batch-entity-trigger
collate: true
---

# Periodic Batch Trigger

This trigger runs workflows **on demand** or **on a schedule** (not event-driven).

- **Data Asset** – Select the relevant data assets.
- **Data Asset Filter** – Define filters to specify which entities the workflow should act on.
- **Schedule Type** – Choose between *On Demand* or *Scheduled*.

**Schedule** – Define the schedule for the trigger (e.g., daily, weekly).
  {% image src="/images/v1.10/how-to-guides/governance/dashboard-schedule.png" alt="dashboard-certification-trigger" /%}
**On-demand** via the user interface
{% image src="/images/v1.10/how-to-guides/governance/workflows-table-certification1.png" alt="dashboard-certification-trigger" /%}
- **Batch Size** – Set how many entities to process per iteration (depends on your data size).

**Final Periodic Batch Trigger Configuration**
{% image src="/images/v1.10/how-to-guides/governance/workflows-periodic-batch-entity-trigger.png" alt="periodic-batch-entity-trigger" /%}
