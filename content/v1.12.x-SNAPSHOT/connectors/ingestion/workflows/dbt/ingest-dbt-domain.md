---
title: Ingest Domain from dbt | OpenMetadata Domain Assignment Guide
description: Ingest dbt domain metadata to assign tables to organizational domains for better data governance and discoverability.
slug: /connectors/ingestion/workflows/dbt/ingest-dbt-domain
---

# Ingest Domain from dbt

Ingest the table-level domain from `manifest.json` file to assign tables to organizational domains in OpenMetadata.

A Domain is a bounded context that is aligned with a Business Unit or a function within an organization. Using domains helps organize data assets and improves discoverability.

## Requirements

{% note %}

For dbt Domain, the Domain must already exist in OpenMetadata before ingestion. If the specified domain is not found, a warning will be logged and ingestion will continue without assigning the domain.

{% /note %}

## Steps for ingesting dbt Domain

### 1. Create or Select a Domain in OpenMetadata

Before ingesting domains from dbt, you need to create the domain in OpenMetadata or use an existing one.

For details on creating domains, refer to the [OpenMetadata Domains documentation](/how-to-guides/data-governance/domains-&-data-products/domains).

OpenMetadata supports three domain types:
- **Source-aligned**: Domains closer to online services and transactional databases
- **Aggregate**: Domains that collect and curate data from multiple source-aligned domains
- **Consumer-aligned**: User-facing domains designed for business users

### 2. Add Table-Level Domain information in schema.yml file

To assign a domain to a table in your dbt model, add the domain name under `model->name->meta->openmetadata->domain` in your `schema.yml` file.

For more details on dbt meta field follow the link [here](https://docs.getdbt.com/reference/resource-configs/meta).

```yml
models:
  - name: customers
    meta:
      openmetadata:
        domain: "Sales"
    description: This table has basic information about a customer, as well as some derived facts based on a customer's orders

    columns:
      - name: customer_id
        description: This is a unique identifier for a customer
        tests:
          - unique
          - not_null
```

After adding the domain information to your `schema.yml` file, run your dbt workflow. The generated `manifest.json` file will then reflect the domain assignment. You'll find it under `node_name->config->meta->openmetadata->domain`.

```json
"model.jaffle_shop.customers": {
  "raw_sql": "sample_raw_sql",
  "compiled": true,
  "resource_type": "model",
  "depends_on": {},
  "database": "dev",
  "schema": "dbt_jaffle",
  "config": {
    "enabled": true,
    "alias": null,
    "meta": {
      "openmetadata": {
        "domain": "Sales"
      }
    }
  }
}
```

### 3. Viewing the Domain on tables

Table level Domain ingested from dbt can be viewed on the table details page in OpenMetadata. The domain will appear in the table header section.


## Validation and Error Handling

| Scenario | Behavior |
|----------|----------|
| Domain not found in OpenMetadata | Warning logged, ingestion continues without assigning domain |
| Empty domain value | Domain assignment skipped |
| Invalid domain name format | Warning logged, domain assignment skipped |
