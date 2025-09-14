---
title: Search Configuration Settings for Relevance, Ranking, and Field Boosting
description: Detailed guide on customizing search relevance and behavior across a platform, including global rules, term boosting, field weighting, and asset-specific configurations.
slug: /how-to-guides/admin-guide/search-configuration-settings
---

# Search Configuration Settings

The **Search Configuration** section in OpenMetadata allows administrators to fine-tune the relevance and behavior of search results across the platform. You can define these settings at two levels:

- **Global Search Level**
- **Data Asset Type Level** (e.g., Containers, Dashboards, APIs)

## 1. Global Search Configuration

These settings impact **all searches across data assets**. Use this to apply platform-wide rules for performance, security, and scoring.

### 🔗 Access Path:
`Settings → Preferences → Search`

### Configurable Options:

| Setting                           | Description                                                                 |
|-----------------------------------|-----------------------------------------------------------------------------|
| Enable Roles & Policies in Search | Toggle to include role-based access policies in search filtering.          |
| Max Aggregate Size                | Maximum size of aggregated search results (default: `10000`).              |
| Max Result Hits                   | Maximum number of search hits returned in a single query (default: `10000`). |
| Max Analyzed Offset               | Controls how much of a field’s content is analyzed (default: `1000`).      |

### Term Boost (Global)

Define boost values to give priority to specific field terms in the search scoring mechanism. For example, Tier levels:

| Field        | Boost |
|--------------|-------|
| Tier.Tier1   | 50    |
| Tier.Tier2   | 30    |
| Tier.Tier3   | 10    |

- **Use Case:** Prioritize Tier 1 assets over lower-tiered ones in search results.

{% image
src="/images/v1.9/how-to-guides/admin-guide/global.png"
alt="Global Search Configuration"
caption="Global Search Configuration"
/%}

## 2. Data Asset Level Search Configuration

Search ranking can be further refined per **data asset type**, such as Containers, Dashboards, or APIs. These allow **domain-specific control** over what fields or values influence the ranking of search results.

### Matching Fields

Defines which fields contribute to determining relevance in search.

| Property       | Description                                      |
|----------------|--------------------------------------------------|
| Field          | The metadata field (e.g., `name.keyword`)        |
| Match Type     | Determines type of match (e.g., `Exact Match`)   |
| Weight         | Numeric value defining the field’s importance    |
| Highlight Fields | Toggle to highlight this field in search preview |

**Example:**  
`name.keyword` set as **Exact Match** with **weight 20**

{% image
src="/images/v1.9/how-to-guides/admin-guide/data-asset-level-search.png"
alt="Data Asset Level Search Configuration"
caption="Data Asset Level Search Configuration"
/%}


### Term Boost

Boosts specific field values to rank some records higher.

| Field              | Boost         |
|--------------------|---------------|
| dbtTags.model_tag_one | (Custom value) |



### Field Value Boost

Boost based on **numerical or date-based field values**, using conditions and modifiers.

**Configuration Fields:**

- **Field**: Choose the field to evaluate  
- **Impact**: Boosting factor  
- **Modifier**: *(none, log, sqrt, etc.)*  
- **Missing Value**: Default value if field is absent  
- **Range Conditions**: Define value-based thresholds (`>`, `<`, `>=`, `<=`)

**Example:**  
Boost items where a field (e.g., `views`) is greater than a defined threshold.


### Restore Defaults

Each configuration section provides a **Restore Defaults** button to revert to system defaults.

{% image
src="/images/v1.9/how-to-guides/admin-guide/restore-defaults.png"
alt="Restore Defaults"
caption="Restore Defaults"
/%}

## Best Practices

- Use **Term Boosting** to elevate priority metadata like `Tier` or `Tags`.
- Apply **Field Value Boosting** for popularity metrics (e.g., `views`, `usage`).
- Avoid **excessive boosting** — keep scoring balanced.
- Use **Match Types** wisely to prevent unintended exclusions (e.g., `Exact Match` vs `Partial`).
