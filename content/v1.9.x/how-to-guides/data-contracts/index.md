---
title: Data Contracts | OpenMetadata Data Contracts
description: Step-by-step guidance for data contracts using OpenMetadata. Learn key actions, features, and best practices.
slug: /how-to-guides/data-contracts
---

# Overview of Data Contracts

OpenMetadata is a centralized, active metadata repository where all your data resides. In any organization, it is important to get the consumers utilizing data assets aligned with asset producers. As data platform adoption increases in an organization, a data mesh architecture with OpenMetadata Data Contracts can produce automated schema, semantic, and data quality validations that enforce data quality and SLAs across departments and domains. 

Contracts in OpenMetadata are now available for tables. With OpenMetadata Data Contracts, you can set the expected schema structure of an asset, define its semantics (like ensuring that a table has a description field or an [owner assigned](https://docs.open-metadata.org/latest/how-to-guides/guide-for-data-users/data-ownership)), assign data quality tests, and track a data contract's execution history over time.

Watch the video to learn more about OpenMetadata Data Contracts.

{% youtube videoId="9CAy_kNvenA" start="0:00" end="4:24" width="800px" height="450px" /%}

Watch a demo of Data Contracts from our [OpenMetadata Community Meetup](https://www.meetup.com/openmetadata-meetup-group/)

{% youtube videoId="sz2XUEQHp08" start="0:00" end="29:10" width="800px" height="450px" /%}

{%inlineCalloutContainer%}
 {%inlineCallout
  color="violet-70"
  bold="OpenMetadata Data Contract Specification"
  icon="puzzle"
  href="/how-to-guides/data-contracts/spec"%}
  Overview of JSON Schema for DataContract entity
 {%/inlineCallout%}
 {%inlineCallout
  color="violet-70"
  bold="Creating a Data Contract"
  icon="MdConnectWithoutContact"
  href="/how-to-guides/data-contracts/create"%}
  Create data contracts directly from the OpenMetadata UI!
 {%/inlineCallout%}
{%/inlineCalloutContainer%}
