---
title: Governance Workflows - Column Completeness Workflow
description: Example workflow that evaluates column description coverage and applies certifications based on completeness.
slug: /how-to-guides/data-governance/workflows/examples/column-completeness-workflow
collate: true
---

# Column Completeness Workflow

A workflow used to evaluate and certify tables based on column description completeness.

{% image src="/images/v1.11/how-to-guides/governance/ccw1.webp" alt="Column Completeness Workflow" /%}

{% image src="/images/v1.11/how-to-guides/governance/ccw2.webp" alt="Column Completeness Workflow" /%}

Tables in Question:

Categories → All Columns have description - 100% → Result: Gold Certification.

Comments → No columns have description - 0% → Result: Brass Certification.

PostTags → 1/2 Column has Description - 50% → Result: Bronze Certification.

Users → 3/4 columns have description - 75% → Result: Silver Certification.

## Before Workflow Execution

{% image src="/images/v1.11/how-to-guides/governance/ccw3.webp" alt="Column Completeness Workflow" /%}

{% image src="/images/v1.11/how-to-guides/governance/ccw4.webp" alt="Column Completeness Workflow" /%}

{% image src="/images/v1.11/how-to-guides/governance/ccw5.webp" alt="Column Completeness Workflow" /%}


## After Workflow Execution

{% image src="/images/v1.11/how-to-guides/governance/ccw6.webp" alt="Column Completeness Workflow" /%}

{% image src="/images/v1.11/how-to-guides/governance/ccw7.webp" alt="Column Completeness Workflow" /%}

{% image src="/images/v1.11/how-to-guides/governance/ccw8.webp" alt="Column Completeness Workflow" /%}

{% image src="/images/v1.11/how-to-guides/governance/ccw9.webp" alt="Column Completeness Workflow" /%}
