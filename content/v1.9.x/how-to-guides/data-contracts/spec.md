---
title: Creating Data Contracts | OpenMetadata Data Contracts Guide
description: Create open-source data contracts directly in the OpenMetadata UI
slug: /how-to-guides/data-contracts/spec
---

# Introduction

Data contracts formalize an agreement between data producers and consumers about what to expect from a data asset’s data. They capture the structure, semantics, quality, and SLAs of data in a machine-readable way, similar to an API contract but for data. In essence, a Data Contract is enforceable in the data ecosystem to bring standardization, control, and reliability.

OpenMetadata, as a metadata management platform, integrates this concept by introducing a Data Contract entity defined via JSON Schema. This allows OpenMetadata admins and [data product](https://docs.open-metadata.org/latest/how-to-guides/data-governance/domains-&-data-products#data-products) owners to attach a contract to tables in OpenMetadata, codifying expectations in a structured format. The contract can then be enforced or validated using OpenMetadata’s existing metadata and data quality frameworks. The goal is to have contextually rich, high-quality, well-governed data that is trustworthy. Data contracts achieve this by making data expectations explicit and automating their enforcement.

# Data Contract Entity Schema Design

The JSON Schema definition for Data Contract entities in OpenMetadata defines the contract’s structure and allowed fields. The contract covers four main categories of expectations:

1. [Schema](#schema)
2. [Semantics](#semantics)
3. [Security](#security)
4. [Business Assertions (data quality)](#quality)
5. [SLA](#sla)
6. [Terms of Use](#terms-of-use)
7. [Status](#status)

We also include an SLA section for service-level agreements and an Ownership field for accountability. Each Data Contract is designed to represent one single data asset (dataset, topic, model, etc.) in a well-structured, templated format. Data contracts are currently available for Table asset types.

The JSON Schema for the Data Contract entity can be found [here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/data/dataContract.json)

# Data Contract Sections
## Schema

This is where the expected structural schema of the data asset is defined. It includes a list of fields (for a table, these are columns) each with name and data type. This captures the contractual schema that producers and consumers agreed on, which usually is a subset of the available fields on an asset. 

## Semantics 

Business meaning and documentation requirements are defined in a contract's Semantics section. For example, one can enforce that a data asset must have a description, owner or domain.

These rules complement the formal tests in the quality section, acting as documentation of business expectations. This section ensures the contract isn’t just about technical schema, but also carries business context.

## Security

Data security and access expectations are defined in this section. This can reference an  access policy ID or name that should govern this data, or a required classification label. 

In practice, this means the contract might require the data asset to be tagged as `PII` or `Confidential` if appropriate, and that only certain roles can access it (through an associated policy).

## Quality (Assertions)

Data quality tests and assertions required by the contract are here. 

Built on top of the native Data Quality features in OpenMetadata, this section allows defining specific tests that must pass for the data to be considered compliant with the contract. Tests can be at the column level (e.g., a column must be non-null) or table level (e.g., row count must be above a threshold), and can be managed from the Data Contract UI itself.

## SLA

Service-Level Agreements related to the data’s timeliness and lifecycle are captured in this section.
This includes:
Refresh Frequency: how often the data is expected to be updated or refreshed (e.g., daily, weekly,...).
Max Latency: the maximum allowed delay between data generation and when it’s available to consumers (e.g., data may be up to 4 hours old at most, or one day for typical daily batch ETLs).
Availability Time: the time by which daily or periodic data should be available (e.g., “09:00 UTC” daily data drop).
Retention: how long the data is kept accessible (if applicable).

Including them in the contract means producers commit to certain delivery timelines, and consumers know what availability to expect.

## Terms of Use

This section captures the allowed and disallowed uses of the data asset, as well as any compliance or regulatory requirements. This can include:
- Allowed Uses: Describes what the data can be used for (e.g., internal analytics, reporting).
- Disallowed Uses: Specifies prohibited uses (e.g., no sharing with third parties, or no training AI models).
- Compliance Requirements: Any legal or regulatory obligations (e.g., GDPR, HIPAA).

## Status

A status field indicates whether the contract is active, draft, or currently violated. For instance, when first created, a contract is in `DRAFT` when it is not yet enforced or not fully implemented by the data producer. Once a data contract is published, it becomes `ACTIVE`. If a violation occurs (e.g., a test fails or schema deviates), the contract's status is `VIOLATED`.

Data Contracts have approval workflows when changes are made, similar to Glossaries. This ensures that any modifications to the contract (like adding new quality tests or changing schema expectations) go through a review and approval process.

# Applying Contracts to Tables

Below is an example of a data contract for a warehouse.sales.orders table.

## Data Contract YAML Example

This is an example YAML of a Data Contract applied to a table in OpenMetadata. Note that while OpenMetadata brings full UI support for creating and managing Data Contracts, you can still use the API to manage them programmatically.

```
name: Customers DC
status: Active
entity:
  id: 8beb4301-8302-4791-9944-2897e7614a1a
  type: table
  href: https://example.com/v1/tables/8beb4301-8302-4791-9944-2897e7614a1a
schema:
  - name: customer_id
    dataType: INT
    dataLength: 1
    dataTypeDisplay: integer
    description: New ID from Collate UI
    fullyQualifiedName: red.dev.dbt_jaffle.customers.customer_id
    tags: []
    constraint: 'NULL'
    children: []
  - name: first_name
    dataType: VARCHAR
    dataLength: 20
    dataTypeDisplay: character varying(20)
    fullyQualifiedName: red.dev.dbt_jaffle.customers.first_name
    tags:
      - tagFQN: General.Person
        name: Person
        description: >-
          A full person name, which can include first names, middle names or
          initials, and last names.
        source: Classification
        labelType: Generated
        state: Suggested
      - tagFQN: PII.Sensitive
        name: Sensitive
        description: >-
          PII which if lost, compromised, or disclosed without authorization,
          could result in substantial harm, embarrassment, inconvenience, or
          unfairness to an individual.
        source: Classification
        labelType: Generated
        state: Suggested
    constraint: 'NULL'
    children: []
semantics:
  - name: Owners is set
    description: Ownership is mandatory
    rule: >-
      {"and":[{"some":[{"var":"owners"},{"!=":[{"var":"fullyQualifiedName"},null]}]}]}
qualityExpectations:
  - id: 1efbda53-063d-4611-8f69-402f4490a503
    type: testCase
    name: customer rows
  - id: 707a43f9-d1d1-4fb8-96da-7bb428429f87
    type: testCase
    name: relationships_orders_customer_id__customer_id__ref_customers_
    description: ''
owners: []
reviewers: []
```

{%inlineCallout
  color="violet-70"
  bold="Creating Data Contracts"
  icon="MdArrowForward"
  href="/how-to-guides/data-contracts/create"%}
  Create Data Contracts in the OpenMetadata UI.
{%/inlineCallout%}
