---
title: OpenMetadata MCP Tools Reference
slug: /how-to-guides/mcp/reference
---

# {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} MCP Tools Reference

## Overview

This document provides detailed examples and usage patterns for all available {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} MCP tools. Each tool includes sample requests, responses, and common use cases.

## Available Tools

### 1. search_metadata

**Description**: Find data assets and business terms in your {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} catalog.

**Use Cases**:
- Discover tables containing specific data
- Find dashboards related to business areas
- Search for glossary terms
- Locate pipelines by name or description

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Keywords to search for |
| `entity_type` | string | No | Filter by entity type (table, topic, dashboard, etc.) |
| `limit` | integer | No | Max results to return (default: 10) |
| `fields` | string | No | Comma-separated additional fields to include |

#### Entity Types
- **Service Entities**: databaseService, messagingService, apiService, dashboardService, pipelineService, storageService, mlmodelService, metadataService, searchService
- **Data Asset Entities**: apiCollection, apiEndpoint, table, storedProcedure, database, databaseSchema, dashboard, dashboardDataModel, pipeline, chart, topic, searchIndex, mlmodel, container
- **User Entities**: user, team
- **Domain Entities**: domain, dataProduct
- **Governance Entities**: metric, glossary, glossaryTerm

#### Examples

**Basic Search**:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "search_metadata",
    "arguments": {
      "query": "sales"
    }
  }
}
```

**Search for Specific Entity Type**:
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "search_metadata",
    "arguments": {
      "query": "customer",
      "entity_type": "table",
      "limit": 15
    }
  }
}
```

**Search with Additional Fields**:
```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "search_metadata",
    "arguments": {
      "query": "order",
      "entity_type": "table",
      "fields": "columns,queries,upstreamLineage",
      "limit": 5
    }
  }
}
```

**Sample Response**:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Found 5 results matching 'sales':\n\n**Tables:**\n1. **sales_transactions** (mysql_prod.ecommerce.public.sales_transactions)\n   - Description: Daily sales transaction records\n   - Service: mysql_prod (MySQL)\n   - Owners: sales-team, john.doe@company.com\n   - Tags: PII, Financial\n   - [View in OpenMetadata](https://your-om.com/table/mysql_prod.ecommerce.public.sales_transactions)\n\n2. **sales_reports** (postgresql_analytics.reporting.main.sales_reports)\n   - Description: Aggregated sales reporting data\n   - Service: postgresql_analytics (PostgreSQL)\n   - Owners: analytics-team\n   - [View in OpenMetadata](https://your-om.com/table/postgresql_analytics.reporting.main.sales_reports)\n\n**Dashboards:**\n3. **Sales Performance Dashboard** (looker_prod.sales.sales_performance)\n   - Description: Real-time sales KPI dashboard\n   - Service: looker_prod (Looker)\n   - Charts: 8 charts\n   - [View in OpenMetadata](https://your-om.com/dashboard/looker_prod.sales.sales_performance)"
      }
    ]
  }
}
```

---

### 2. get_entity_details

**Description**: Retrieve detailed information about a specific entity using its fully qualified name.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `entity_type` | string | Yes | Type of entity (table, topic, dashboard, etc.) |
| `fqn` | string | Yes | Fully qualified name of the entity |

#### Examples

**Get Table Details**:
```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "tools/call",
  "params": {
    "name": "get_entity_details",
    "arguments": {
      "entity_type": "table",
      "fqn": "mysql_prod.ecommerce.public.customer_orders"
    }
  }
}
```

**Get Dashboard Details**:
```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "tools/call",
  "params": {
    "name": "get_entity_details",
    "arguments": {
      "entity_type": "dashboard",
      "fqn": "superset_prod.sales.quarterly_revenue"
    }
  }
}
```

**Sample Response**:
```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "## Table: customer_orders\n\n**Fully Qualified Name**: mysql_prod.ecommerce.public.customer_orders\n\n**Basic Information**:\n- **Service**: mysql_prod (MySQL)\n- **Database**: ecommerce\n- **Schema**: public\n- **Type**: Regular Table\n- **Description**: Stores all customer order transactions with order details, timestamps, and status information\n\n**Ownership & Governance**:\n- **Owners**: ecommerce-team, sarah.johnson@company.com\n- **Tags**: PII, Financial, Customer-Data\n- **Tier**: Tier1\n\n**Schema** (5 columns):\n1. **order_id** (BIGINT) - Primary key, unique order identifier\n2. **customer_id** (BIGINT) - Foreign key to customer table\n3. **order_date** (TIMESTAMP) - When the order was placed\n4. **total_amount** (DECIMAL) - Total order value\n5. **status** (VARCHAR) - Order status (pending, completed, cancelled)\n\n**Usage Statistics**:\n- **Row Count**: ~2.5M rows\n- **Size**: 450 MB\n- **Last Updated**: 2024-01-15 09:30:00\n\n[View in OpenMetadata](https://your-om.com/table/mysql_prod.ecommerce.public.customer_orders)"
      }
    ]
  }
}
```

---

### 3. create_glossary

**Description**: Create a new glossary to organize business terms and definitions.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Name of the glossary |
| `description` | string | Yes | Description of the glossary |
| `owners` | array | No | List of owners (users or teams) |
| `reviewers` | array | No | List of reviewers (users or teams) |
| `mutuallyExclusive` | boolean | Yes | Whether terms are mutually exclusive |

#### Examples

**Create Business Glossary**:
```json
{
  "jsonrpc": "2.0",
  "id": 6,
  "method": "tools/call",
  "params": {
    "name": "create_glossary",
    "arguments": {
      "name": "Marketing Terms",
      "description": "Collection of marketing-related terms and definitions used across campaigns, analytics, and reporting",
      "owners": ["marketing-team", "alice.smith@company.com"],
      "reviewers": ["data-governance-team"],
      "mutuallyExclusive": false
    }
  }
}
```

**Create Technical Glossary**:
```json
{
  "jsonrpc": "2.0",
  "id": 7,
  "method": "tools/call",
  "params": {
    "name": "create_glossary",
    "arguments": {
      "name": "Data Quality Metrics",
      "description": "Standardized definitions for data quality measurements and KPIs",
      "owners": ["data-quality-team"],
      "mutuallyExclusive": true
    }
  }
}
```

**Sample Response**:
```json
{
  "jsonrpc": "2.0",
  "id": 6,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "✅ Successfully created glossary: **Marketing Terms**\n\n**Details**:\n- **Name**: Marketing Terms\n- **Description**: Collection of marketing-related terms and definitions used across campaigns, analytics, and reporting\n- **Owners**: marketing-team, alice.smith@company.com\n- **Reviewers**: data-governance-team\n- **Mutually Exclusive**: No\n- **Status**: Active\n\n**Next Steps**:\n- You can now add glossary terms to this glossary\n- Consider creating hierarchical terms for better organization\n- Set up approval workflows if needed\n\n[View Glossary in OpenMetadata](https://your-om.com/glossary/marketing-terms)"
      }
    ]
  }
}
```

---

### 4. create_glossary_term

**Description**: Create a new term within an existing glossary, with support for hierarchical relationships.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `glossary` | string | Yes | FQN of the parent glossary |
| `name` | string | Yes | Name of the term |
| `description` | string | Yes | Definition of the term |
| `parentTerm` | string | No | FQN of parent term for hierarchy |
| `owners` | array | No | List of owners (users or teams) |

#### Examples

**Create Root Level Term**:
```json
{
  "jsonrpc": "2.0",
  "id": 8,
  "method": "tools/call",
  "params": {
    "name": "create_glossary_term",
    "arguments": {
      "glossary": "marketing-terms",
      "name": "Customer Acquisition Cost",
      "description": "The total cost of acquiring a new customer, including marketing and sales expenses divided by the number of customers acquired in a specific period",
      "owners": ["marketing-team", "finance-team"]
    }
  }
}
```

**Create Child Term**:
```json
{
  "jsonrpc": "2.0",
  "id": 9,
  "method": "tools/call",
  "params": {
    "name": "create_glossary_term",
    "arguments": {
      "glossary": "marketing-terms",
      "parentTerm": "marketing-terms.customer-acquisition-cost",
      "name": "Organic CAC",
      "description": "Customer acquisition cost specifically for customers acquired through organic channels (SEO, word of mouth, etc.) without paid advertising",
      "owners": ["marketing-team"]
    }
  }
}
```

**Sample Response**:
```json
{
  "jsonrpc": "2.0",
  "id": 8,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "✅ Successfully created glossary term: **Customer Acquisition Cost**\n\n**Details**:\n- **Glossary**: Marketing Terms\n- **Full Path**: marketing-terms.customer-acquisition-cost\n- **Definition**: The total cost of acquiring a new customer, including marketing and sales expenses divided by the number of customers acquired in a specific period\n- **Owners**: marketing-team, finance-team\n- **Status**: Draft\n\n**Suggestions**:\n- Consider adding related terms like 'Customer Lifetime Value' and 'Return on Ad Spend'\n- You might want to create child terms for different acquisition channels\n- Add synonyms if this term is known by other names in your organization\n\n[View Term in OpenMetadata](https://your-om.com/glossary/marketing-terms/customer-acquisition-cost)"
      }
    ]
  }
}
```

---

### 5. get_entity_lineage

**Description**: Retrieve upstream and downstream lineage information for any entity to understand data dependencies and impact analysis.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `entity_type` | string | Yes | Type of entity |
| `fqn` | string | Yes | Fully qualified name of the entity |
| `upstream_depth` | integer | Yes | Depth for upstream entities (default: 5) |
| `downstream_depth` | integer | Yes | Depth for ...
