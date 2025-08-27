---
title: Creating Data Contracts | OpenMetadata Data Contracts Guide
description: Create open-source data contracts directly in the OpenMetadata UI
slug: /how-to-guides/data-contracts/spec
---

# Introduction

Data contracts formalize an agreement between data producers and consumers about what to expect from a data asset’s data. They capture the structure, semantics, quality, and SLAs of data in a machine-readable way, similar to an API contract but for data. In essence, a DataContract is enforceable in the data ecosystem to bring standardization, control, and reliability.

OpenMetadata, as a metadata platform, integrates this concept by introducing a DataContract entity defined via JSON Schema. This allows OpenMetadata admins and [data product](https://docs.open-metadata.org/latest/how-to-guides/data-governance/domains-&-data-products#data-products) owners to attach a contract to tables in OpenMetadata, codifying expectations in a structured format. The contract can then be enforced or validated using OpenMetadata’s existing metadata and data quality frameworks. The goal is to have contextually rich, high-quality, well-governed data that is trustworthy. Data contracts achieve this by making data expectations explicit and automating their enforcement.

# DataContract Entity Schema Design

The JSON Schema definition for DataContract entities in OpenMetadata defines the contract’s structure and allowed fields. The contract covers four main categories of expectations:

1. [Schema](#schema)
2. [Semantics](#semantics)
3. [Security](#security)
4. [Business Assertions (data quality)](#quality)

We also include an SLA section for service-level agreements and an Ownership field for accountability. Each DataContract is designed to represent one single data asset (dataset, topic, model, etc.) in a well-structured, templated format. Data contracts are currently available for Table asset types.

The JSON Schema for the DataContract entity can be found [here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/data/dataContract.json)

# Data Contract Sections
## Schema <a name="schema"></a>

This is where the expected structural schema of the data asset is defined. It includes a list of fields (for a table, these are columns) each with name and data type. This captures the contractual schema that producers and consumers agreed on. You can also specify if fields are allowed to be null and provide each field’s description and any integrity constraints (like unique, foreign key reference, etc.). A boolean strict indicates if the schema is exact – e.g., if `strict=true`, no additional columns beyond those listed can appear without violating the contract (useful for enforcing strict schema evolution control). If `strict=false`, the contract defines a minimum expected schema (new columns could be added as long as they don’t break existing fields).

## Semantics <a name="semantics"></a>

Business meaning and documentation requirements are defined in a contract's Semantics section. For example, one can enforce that a data asset must have an description (`entityDescriptionRequired=true`) and optionally that every column/field has a description (`columnDescriptionRequired`). Required tags or glossary terms that must be associated with a particular asset can also be defined and enforced here (ensuring proper classification and taxonomy linkage. Additionally, `customIntegrityRules` allow business users to specify any high-level rules about the data (e.g. “Account status must be one of ACTIVE/INACTIVE” or “All records should have a corresponding entry in master table”). These rules complement the formal tests in the quality section, acting as documentation of business expectations (they could later be mapped to actual test cases or checks). This section ensures the contract isn’t just about technical schema, but also carries business context.

## Security <a name="security"></a>

Data security and access expectations are defined in this section. This can reference an `accessPolicy` (for example, the name/ID of a [policy](https://docs.open-metadata.org/latest/how-to-guides/admin-guide/roles-policies/authorization#building-blocks-of-authorization-policies) in OpenMetadata’s Access Control that should apply to this dataset) or a required `dataClassification` label. In practice, this means the contract might require the data asset to be tagged as `PII` or `Confidential` if appropriate, and that only certain roles can access it (through an associated policy). While enforcement of security in OpenMetadata is typically done via [role-based policies](https://docs.open-metadata.org/latest/how-to-guides/admin-guide/roles-policies/authorization), including it in the contract ensures producers/owners declare the intended security level as part of the contract.

## Quality (Assertions) <a name="quality"></a>

Data quality tests and assertions required by the contract are here. This can be represented in two ways (which are not mutually exclusive):
1. A list of explicit tests referencing OpenMetadata’s [Test Case](https://docs.open-metadata.org/latest/how-to-guides/data-quality-observability/quality/test) entities. Each TestCase in OpenMetadata corresponds to a specific data quality check (for example, a “non-null constraint on column X” or “freshness under 24h” test). By linking to TestCase or TestDefinition entries, the contract directly ties into OpenMetadata’s testing framework. (For instance, if a Great Expectations suite or a custom SQL check exists for this dataset, it can be referenced here.)
2. A list of high-level expectations described in natural language or simple expressions. These are akin to “business assertions”. For example, “No more than 5% of records can be incomplete” or “Column X should be unique”. Each expectation has a name and an expression/description. These may correspond to one or multiple TestCases; they serve as a human-readable summary of the quality guarantees. In essence, the quality section enumerates all the data quality conditions that the data must meet to satisfy the contract.

## SLA

Service-Level Agreements related to the data’s timeliness and lifecycle are captured in this section.
This includes:
`refreshFrequency`: how often the data is expected to be updated or refreshed (e.g., {"interval": 1, "unit": "day"} for daily updates).
`maxLatency`: the maximum allowed delay between data generation and when it’s available to consumers (e.g., {"value": 4, "unit": "hour"} meaning data may be up to 4 hours old at most).
`availabilityTime`: the time by which daily or periodic data should be available (e.g., “09:00 UTC” daily data drop).
`retention`: how long the data is kept accessible (if applicable).

Including them in the contract means producers commit to certain delivery timelines, and consumers know what availability to expect. In OpenMetadata, these can be linked to freshness tests or used for monitoring (for example, a [Table Data to Be Fresh test](https://docs.open-metadata.org/latest/how-to-guides/data-quality-observability/quality/tests-ui#table-data-to-be-fresh-collate) can ensure the `refreshFrequency` is respected).

## Status

A status field indicates whether the contract is active, draft, or currently violated. For instance, when first created, a contract is in `DRAFT` when it is not yet enforced or not fully implemented by the data producer. Once a data contract is published, it becomes `ACTIVE`. If a violation occurs (e.g., a test fails or schema deviates), the contract's status is `VIOLATED`.

# Applying Contracts to Tables

Below is an example of a data contract for a warehouse.sales.orders table.

## Data Contract for Table warehouse.sales.orders

This data contract defines the schema and quality expectations for a database table warehouse.sales.orders (e.g., an orders table in the sales schema of a warehouse). We enable incident management globally (`incidentManagement: true`) to ensure any critical data quality failures raise an incident in [OpenMetadata’s Incident Manager](https://docs.open-metadata.org/latest/how-to-guides/data-quality-observability/incident-manager). All quality checks use OpenMetadata’s native engine (specified for clarity via `engine: OpenMetadata`), and critical expectations have `raiseIncident: true` so that their violations will trigger incidents. Less critical checks can be set with `raiseIncident: false` to avoid incident noise.

```
name: warehouse.sales.orders
type: table
description: >
  Data contract for the orders table, defining expected schema and data quality constraints.
owner: Analytics Team
incidentManagement: true  # Enable auto-logging of violations as incidents
schema:
  columns:
    - name: order_id
      type: INTEGER
      description: Primary key for orders
      nullable: false
      unique: true
    - name: order_timestamp
      type: TIMESTAMP
      description: UTC timestamp when the order was placed
      nullable: false
    - name: order_total
      type: DECIMAL(10,2)
      description: Total amount of the order in USD
      nullable: false
    - name: customer_id
      type: INTEGER
      description: Reference to the customer placing the order
      nullable: false
    - name: customer_email
      type: STRING
      description: Email address of the customer (may be null if not provided)
      nullable: true
quality:
  expectations:
    - name: NonNull_OrderID
      description: "Order ID must never be null."
      field: order_id
      condition: "IS NOT NULL"        # order_id should be present in every record
      engine: OpenMetadata           # using OpenMetadata's DQ engine
      raiseIncident: true            # critical - trigger incident if violated
    - name: Valid_OrderTotal
      description: "Order total should be non-negative."
      field: order_total
      condition: ">= 0"              # order_total must be 0 or greater
      engine: OpenMetadata
      raiseIncident: true            # critical check
    - name: RowCount_Minimum
      description: "At least 5000 orders are expected in the table."
      condition: "row_count >= 5000" # table-level check on minimum row count
      engine: OpenMetadata
      raiseIncident: true            # raise incident if row count drops below threshold
    - name: Optional_CustomerEmail
      description: "Customer email, if present, should not be null."
      field: customer_email
      condition: "IS NOT NULL IF PRESENT"  # if email field exists, it should have a value
      engine: OpenMetadata
      raiseIncident: false           # not critical (no incident for missing emails)
```

{%inlineCallout
  color="violet-70"
  bold="Creating Data Contracts"
  icon="MdArrowForward"
  href="/how-to-guides/data-contracts/create"%}
  Create Data Contracts in the OpenMetadata UI.
{%/inlineCallout%}
