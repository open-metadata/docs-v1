---
title: How Column-Level Lineage Works
slug: /how-to-guides/openmetadata/data-lineage/column
---

# How Column-Level Lineage Works

OpenMetadata supports rich column-level lineage for understanding the relationship between tables and to perform impact analysis. Users can manually edit both the table and column level lineage to capture any information that is not automatically surfaced.

{% image
src="/images/v1.1/how-to-guides/lineage/lineage1.png"
alt="Column-Level Data Lineage in OpenMetadata"
caption="Column-Level Data Lineage in OpenMetadata"
/%}

{% note noteType="Tip" %} **Quick Tip:** Drilldown to view all the available columns for a table when viewing column-level lineage. {% /note %}

You can generate the column-level lineage automatically by running the **Lineage Ingestion**.

{% image
src="/images/v1.1/how-to-guides/lineage/ingestion.png"
alt="Lineage Ingestion"
caption="Lineage Ingestion"
/%}

## Manually Edit Column Level Lineage

OpenMetadata supports manual editing of both table and column level lineage. You can edit the lineage for the individual columns by clicking on the edit option on the top right. User the anchor points on either side of the columns to create links and trace individual columns through their lineage. You can also add new tables that have columns you want to trace. Connect the relevant columns to the current lineage.

{% image
src="/images/v1.1/how-to-guides/lineage/column1.png"
alt="Manually Edit Column Level Lineage"
caption="Manually Edit Column Level Lineage"
/%}

Watch the video on editing column-level lineage.
{%  youtube videoId="HTkbTvi2H9c" start="0:00" end="00:51" /%}

{%inlineCallout
  color="violet-70"
  bold="Manual Lineage"
  icon="MdArrowForward"
  href="/how-to-guides/openmetadata/data-lineage/manual"%}
  Edit the table and column level lineage manually.
{%/inlineCallout%}