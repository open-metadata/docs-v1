---
title: Creating Data Contracts | OpenMetadata Data Contracts Guide
description: Create open-source data contracts directly in the OpenMetadata UI
slug: /how-to-guides/data-contracts/create
---

Data contracts are currently available for tables ingested into OpenMetadata. The following guide shows how a data contract was created for a snowflake.DEMO_STAGE.JAFFLE_SHOP.CUSTOMERS table.

To create a Data Contract for a Table in OpenMetadata:
- Go to the Table's page, select **Contract**, then **+ Add Contract**

{% image
src="/images/v1.9/how-to-guides/contracts/create1.png"
alt="Adding a Data Contract to an OpenMetadata Table"
caption="Adding a Data Contract to an OpenMetadata Table"
/%}

- In *Contract Details*, be sure to give your new data contract a name. Optionally, you can assign Owners and provide a description of your data contract. Then select **Schema**.

{% image
src="/images/v1.9/how-to-guides/contracts/create2.png"
alt="Adding Contract Details"
caption="Adding a Contract Details to an OpenMetadata Data Contract"
/%}

- Select the columns of your table that you would like to add to your new data contract, or select all columns by checking the box at the top right. Then select **Semantics**

{% image
src="/images/v1.9/how-to-guides/contracts/create3.png"
alt="Selecting a schema for an OpenMetadata Data Contract"
caption="Selecting a schema for an OpenMetadata Data Contract"
/%}

- Add the business rules you would like to enforce in *Semantics*. For OpenMetadata Tables, rules can be created for:
  - Service
  - Owners
  - Display Name
  - Name 
  - Description
  - Tags
  - Domain
  - Data Product
  - Tier

{% image
src="/images/v1.9/how-to-guides/contracts/create4.png"
alt="Adding rules to an OpenMetadata Data Contract"
caption="Adding rules to an OpenMetadata Data Contract"
/%}

- Once a rule is created, you can **+ Add New Rule** to create more, or select **Quality**

{% image
src="/images/v1.9/how-to-guides/contracts/create5.png"
alt="Adding more rules to an OpenMetadata Data Contract"
caption="Adding more rules to an OpenMetadata Data Contract"
/%}

- Select **+ Add Test** to add a [Data Quality Test](https://docs.open-metadata.org/latest/how-to-guides/data-quality-observability/quality/test) or tests to your new contract, then select **Save**

{% image
src="/images/v1.9/how-to-guides/contracts/create6.png"
alt="Adding data quality tests to an OpenMetadata Data Contract"
caption="Adding data quality tests to an OpenMetadata Data Contract"
/%}

- Once your new data contract has been created successfully, you can run it by selecting **> Run now**

{% image
src="/images/v1.9/how-to-guides/contracts/create7.png"
alt="Running an OpenMetadata Data Contract"
caption="Running an OpenMetadata Data Contract"
/%}
