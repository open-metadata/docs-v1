---
title: Governance Workflows - Check Condition
description: Configure conditional checks on assets to branch governance workflows based on true or false outcomes.
slug: /how-to-guides/data-governance/workflows/elements/nodes/check-condition
collate: true
---

# Governance Workflows - Check Condition

This node evaluates conditions on data assets.

Examples:

- Is a description provided?
- Are owners assigned?
- Is Collate the owner of this asset?
- Is the asset Tier 1?

You can define multiple conditions.

{% image src="/images/v1.12/how-to-guides/governance/check1.png" alt="Check Condition Node" /%}

{% image src="/images/v1.12/how-to-guides/governance/check2.png" alt="Check Condition Node" /%}

Each Check Condition node has two output branches:

- **TRUE** – When all conditions are satisfied.
- **FALSE** – When any condition fails.
    
    Both branches must be connected for a complete workflow path.

{% image src="/images/v1.12/how-to-guides/governance/check3.png" alt="Check Condition Node" /%}
