---
title: Explore the Lineage View | Official Documentation
description: Explore lineage diagrams interactively to understand how data flows between sources, transformations, and dashboards.
slug: /how-to-guides/data-lineage/explore
---

# Explore the Lineage View

OpenMetadata UI displays end-to-end lineage traceability for the table and column levels. OpenMetadata supports lineage for Database, Dashboard, and Pipelines. Just search for an data asset and expand the graph to unfold lineage. It’ll display the upstreams and downstreams edges for each node. The lineage details specify the SQL query, pipeline information, and column lineage.

In the lineage view, in the example below, the table on the left is the parent or **Source** node. The table on the right is the **Target** node. You can also identify the target node by looking at the arrow attached to it. The arrow connecting the data assets or tables is the **Edge**. Clicking on an edge connecting a source and a destination will display all the edge information: the Source, Target, Description, and SQL Query. It displays the SQL query used to generate the view (The table is of the Type View). The SQL query provides information on how the target table was generated from the source table.

{% image
src="/images/v1.9/how-to-guides/lineage/edge.png"
alt="Edge Information: Source and Target"
caption="Edge Information: Source and Target"
/%}

{% note noteType="Tip" %} **Tip:** Metadata ingestion also brings in the View Lineage, if the database has views (Data assets of the Type View). {% /note %}

You can set up the **Lineage Config** to display the required number of Upstream and Downstream Nodes, as well as the Nodes per layer. You can set up to **3** Upstream and Downstream Nodes.
{% image
src="/images/v1.9/how-to-guides/lineage/nodes.png"
alt="Lineage Config"
caption="Lineage Config"
/%}

You can click on the data assets to view the data asset details. 
- Users can view the Source, Name of the Data Asset, Description, Owner (Team/User details), Tier, and Usage information for the data asset. 
- Based on the **type of data asset** (Table, Topic, Dashboard, Pipeline, ML Model, Container), the quick preview provides additional information. For example, for `tables`, the type of table, the number of queries, and columns are displayed. 
- The **data quality and profiler metrics** displays the details on the Tests Passed, Aborted, and Failed. 
- Users can view all the **tags** associated with the data asset.
- The **Schema** provides the details on the column names, type of column, and column description.

{% image
src="/images/v1.9/how-to-guides/lineage/lineage2.png"
alt="Quick Glance at the Data Asset from Lineage View"
caption="Quick Glance at the Data Asset from Lineage View"
/%}

Clicking on the tables will display the list of columns and column-level lineage.
{% image
src="/images/v1.9/how-to-guides/lineage/lineage1.png"
alt="Column-Level Data Lineage in OpenMetadata"
caption="Column-Level Data Lineage in OpenMetadata"
/%}

In case of **Pipelines**, we first have the lineage ingested from the databases. Further, when setting up the pipeline ingestion, we specify the database service name. That way we display the lineage of the database tables connected via pipelines. If a lineage is created through a pipeline, the same is displayed in the Edge information.

{% image
src="/images/v1.9/how-to-guides/lineage/pipeline.png"
alt="Database and Pipeline Lineage"
caption="Database and Pipeline Lineage"
/%} 

Similarly for a **Dashboard**, we first have the lineage ingested from the databases. Further, when setting up the dashboard ingestion, the data models and charts are ingested. That way we display the lineage of the database tables connected using the dashboard data models.

## Lineage Layers

Lineage view supports multiple exploration layers that provide deeper insights into the structure, flow, and quality of data across your ecosystem. These layers help users visualize lineage not just at the dataset level, but also across services, domains, and business-critical data products.

### Column Layer

The **Column layer** enables detailed exploration of column-level lineage, allowing users to trace the flow and transformation of specific fields (e.g., customer_id, first_name) across tables and pipelines. This granularity helps in understanding data dependencies at the attribute level.

{% image
src="/images/v1.9/how-to-guides/lineage/column-layer.png"
alt="Column Layer in Lineage"
caption="Column Layer in Lineage"
/%}

### Observability Layer

The **Observability layer** integrates data quality insights directly into lineage by displaying test outcomes such as passes, failures, and pending checks. This helps users identify potential issues and assess the trustworthiness of data as it moves through the pipeline.

{% image
src="/images/v1.9/how-to-guides/lineage/observability-layer.png"
alt="Observability Layer in Lineage"
caption="Observability Layer in Lineage"
/%} 

### Service Layer

The **Service layer** visualizes how data flows across different platforms and services like Hive, Redshift, Power BI, and Tableau. It connects ingestion, transformation, and consumption points, offering a system-level view of the end-to-end data journey.

{% image
src="/images/v1.9/how-to-guides/lineage/service-layer.png"
alt="Service Layer in Lineage"
caption="Service Layer in Lineage"
/%} 

### Domain Layer

The **Domain layer** organizes datasets and assets into business-relevant categories such as “Ecommerce” or “Customer Data.” This classification provides contextual clarity and supports governance by aligning technical assets with business functions.

{% image
src="/images/v1.9/how-to-guides/lineage/domain-layer.png"
alt="Domain Layer in Lineage"
caption="Domain Layer in Lineage"
/%} 

### Data Product Layer

The **Data Product layer** highlights curated outputs like *Customer Registry* or *Superstore*, representing the final, value-delivering datasets within a domain. It enables teams to track the lineage of trusted, consumption-ready data products across the organization.

{% image
src="/images/v1.9/how-to-guides/lineage/data-product-layer.png"
alt="Data Product Layer in Lineage"
caption="Data Product Layer in Lineage"
/%} 

{%inlineCallout
  color="violet-70"
  bold="How Column-Level Lineage Works"
  icon="MdArrowForward"
  href="/how-to-guides/data-lineage/column"%}
  Explore and edit the rich column-level lineage.
{%/inlineCallout%}