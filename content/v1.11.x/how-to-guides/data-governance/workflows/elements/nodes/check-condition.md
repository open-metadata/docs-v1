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
{% image src="/images/v1.10/how-to-guides/governance/CheckConditionDescription.png" alt="Check Condition Node" /%}
- Are owners assigned?
{% image src="/images/v1.10/how-to-guides/governance/CheckConditionOwners.png" alt="Check Condition Node" /%}
- Is Aaron Johnson the owner of this asset?
{% image src="/images/v1.10/how-to-guides/governance/CheckOwnerAaronJohnson.png" alt="Check Condition Node" /%}
- Is the asset Tier 1?
{% image src="/images/v1.10/how-to-guides/governance/CheckConditionTier1.png" alt="Check Condition Node" /%}

You can define multiple conditions.

{% image src="/images/v1.10/how-to-guides/governance/check1.png" alt="Check Condition Node" /%}

{% image src="/images/v1.10/how-to-guides/governance/check2.png" alt="Check Condition Node" /%}

Each Check Condition node has two output branches:

- **TRUE** – When the condition is satisfied.
- **FALSE** – When the condition fails.
    
    Both branches must be connected for a complete workflow path.

{% image src="/images/v1.10/how-to-guides/governance/check3.png" alt="Check Condition Node" /%}
