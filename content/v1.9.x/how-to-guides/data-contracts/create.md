---
title: Creating Data Contracts | OpenMetadata Data Contracts Guide
description: Follow this guide to create data contracts. Define schema, add business rules, and run quality tests to ensure consistent, reliable table data.
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

- In *Contract Details*, be sure to give your new data contract a name. Optionally, you can assign Owners and provide a description of your data contract. Then select **Terms of Service**.

{% image
src="/images/v1.9/how-to-guides/contracts/create2.png"
alt="Adding Contract Details"
caption="Adding a Contract Details to an OpenMetadata Data Contract"
/%}

- In **Terms of Service**, you can click on **+ New Node** to add individual terms such as acceptable usage guidelines, data handling policies, or legal terms that consumers must acknowledge.

{% image
src="/images/v1.9/how-to-guides/contracts/createservice.png"
alt="Adding Terms of Service"
caption="Adding Terms of Service to Data Contract"
/%}

- Select the columns of your table that you would like to add to your new data contract, or select all columns by checking the box at the top right. Then select **Security**

{% image
src="/images/v1.9/how-to-guides/contracts/create3.png"
alt="Selecting a schema for Data Contract"
caption="Selecting a schema for Data Contract"
/%}

- The **Security** tab allows you to configure access policies and data classification. First, enter a classification label such as PII or Confidential. Then, define the consumers of this data using the policies section. You can set up identities, access conditions, and apply row-level filters by specifying column names and their corresponding values.

{% image
src="/images/v1.9/how-to-guides/contracts/createsec.png"
alt="Configuring Security Policies"
caption="Configuring Security Policies"
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
alt="Adding rules to Data Contract"
caption="Adding rules to Data Contract"
/%}

- Once a rule is created, you can **+ Add New Rule** to create more, or select **Quality**

{% image
src="/images/v1.9/how-to-guides/contracts/create5.png"
alt="Adding more rules to Data Contract"
caption="Adding more rules to Data Contract"
/%}

- Select **+ Add Test** to add a [Data Quality Test](https://docs.open-metadata.org/latest/how-to-guides/data-quality-observability/quality/test) or tests to your new contract, then select **SLA**

{% image
src="/images/v1.9/how-to-guides/contracts/create6.png"
alt="Adding data quality tests"
caption="Adding data quality tests"
/%}

- In **SLA**, define expectations around service level agreements. Specify how frequently the data is expected to refresh using the refresh frequency interval and unit fields. Define the maximum acceptable latency between data generation and availability using the max latency field. Specify when the data should be available with availability time and timezone inputs. You can also configure the retention period and specify which column in the dataset indicates the last refresh timestamp. Then click **save**

{% image
src="/images/v1.9/how-to-guides/contracts/createsla.png"
alt="Defining SLA"
caption="Defining SLA"
/%}

- Once your new data contract has been created successfully, you can run it by selecting **> Run now**

{% image
src="/images/v1.9/how-to-guides/contracts/create7.png"
alt="Running an OpenMetadata Data Contract"
caption="Running an OpenMetadata Data Contract"
/%}
