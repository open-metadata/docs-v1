---
title: Data Observability Alerts | OpenMetadata
description: Configure alerts for data quality failures, schema changes, and pipeline issues.
slug: /how-to-guides/data-quality-observability/alerts-notifications/data-observability-alerts
---

# Data Observability Alerts

Monitor the health of your data systems by setting up alerts for pipeline failures, data quality issues, and schema changes.

{% stepsContainer %}

{% step srNumber=1 %}
{% stepDescription title="Open the Alerts Page" %}

Navigate to the lateral menu **Observability > Alerts**.

{% /stepDescription %}

{% stepVisualInfo %}
{% ossContent %}
{% image
src="/images/v1.11/how-to-guides/data-quality-observability/observability/alerts/data-observability-navigate-om.webp"
alt="Navigate to Observability Alerts"
caption="Navigate to Observability Alerts"
/%}
{% /ossContent %}
{% collateContent %}
{% image
src="/images/v1.11/how-to-guides/data-quality-observability/observability/alerts/data-observability-navigate-collate.webp"
alt="Navigate to Observability Alerts"
caption="Navigate to Observability Alerts"
/%}
{% /collateContent %}
{% /stepVisualInfo %}
{% /step %}

{% step srNumber=2 %}
{% stepDescription title="Create a new Alert" %}
Click the **Add Alert** button.
{% /stepDescription %}

{% stepVisualInfo %}
{% image
src="/images/v1.11/how-to-guides/data-quality-observability/observability/alerts/data-observability-add-alert.webp"
alt="Add Alert Button"
caption="Add Alert Button"
/%}
{% /stepVisualInfo %}
{% /step %}

{% step srNumber=3 %}
{% stepDescription title="Name the Alert and Add Context" %}
Provide a unique, descriptive **Name** for your alert. You can also add an optional **Description** to provide further context and clarity regarding the alert's intent.
{% /stepDescription %}

{% stepVisualInfo %}
{% image
src="/images/v1.11/how-to-guides/data-quality-observability/observability/alerts/data-observability-alert-name-description.webp"
alt="Input fields for Alert Name and Description"
caption="Define the Alert Name and Optional Description"
/%}
{% /stepVisualInfo %}
{% /step %}


{% step srNumber=4 %}
{% stepDescription title="Select a Source" %}

Choose the operational entity you want to monitor:

* **Container** - Monitors schema changes for the container asset
{% collateContent %}* **Ingestion Pipeline** - Monitors status changes to your Collate ingestion pipelines{% /collateContent %}
* **Pipeline** - Monitors updates to pipeline assets that you have ingested
* **Table** - Monitors schema changes and table metrics changes
* **Test Case** - Triggers an alert for the specific test case selected
* **Test Suite** - Triggers an alert for any test case event linked to the test suite. This is a great way to group alerts and reduce notification fatigue
* **Topic** - Monitors schema changes for the topic asset
{% /stepDescription %}

{% stepVisualInfo %}
{% ossContent %}
{% image
src="/images/v1.11/how-to-guides/data-quality-observability/observability/alerts/data-observability-source-om.webp"
alt="Select the Source Resource for Data Observability"
caption="Select the Source Resource"
/%}
{% /ossContent %}
{% collateContent %}
{% image
src="/images/v1.11/how-to-guides/data-quality-observability/observability/alerts/data-observability-source-collate.webp"
alt="Select the Source Resource for Data Observability"
caption="Select the Source Resource"
/%}
{% /collateContent %}
{% /stepVisualInfo %}
{% /step %}

{% step srNumber=5 %}
{% stepDescription title="Configure Filters (Optional)" %}

Filters allow you to refine the scope of the alert to focus only on relevant changes, significantly improving the signal-to-noise ratio. You can narrow down events based on a variety of criteria, including:

* **Entity Specific Name:** Filter by the defined specific name of the entity.
* **Owner Name:** Filter events based on the designated owner of the asset.
* **Domain:** Filter events based on the Data Domain the entity belongs to.
* **Filter By Updater Is Bot:** Filter to include or exclude changes made by automated ingestion or system processes.

Use the **Include** toggle to define the logic for the filter condition:
* **Include (Toggle ON):** If the event meets the filter condition, the alert is **sent**.
* **Exclude (Toggle OFF):** If the event meets the filter condition, the alert is **silenced** (not sent).

{% note noteType="Warning" %}
If you do not set any filter, the alert will apply to **all** relevant events over the selected source entity type, which may lead to excessive notifications.
{% /note %}
{% /stepDescription %}

{% stepVisualInfo %}
{% image
src="/images/v1.11/how-to-guides/data-quality-observability/observability/alerts/data-observability-filter-overview.webp"
alt="Define Filters"
caption="Define Filters"
/%}
{% image
src="/images/v1.11/how-to-guides/data-quality-observability/observability/alerts/data-observability-filter-options.webp"
alt="Filter Options"
caption="Filtering options for TestSuite source Entity."
/%}
{% /stepVisualInfo %}
{% /step %}

{% step srNumber=6 %}
{% stepDescription title="Select Trigger Conditions (Optional)" %}

Define the specific conditions that will trigger the alert:

* **Schema Changes** - Alert on added, deleted, or updated columns
* **Test Case Status** - Trigger when tests are `Failed`, `Aborted`, or `Queued`
* **Pipeline Status** - Alert when pipeline execution is `Failed` or `Pending`
* **Metric Updates** - Notify when table metrics are updated

{% note noteType="Tip" %}
You can select multiple trigger conditions to create comprehensive monitoring coverage.
{% /note %}

{% /stepDescription %}

{% stepVisualInfo %}
{% image
src="/images/v1.11/how-to-guides/admin-guide/trigger.webp"
alt="Select Trigger Conditions"
caption="Select Trigger Conditions"
/%}
{% /stepVisualInfo %}
{% /step %}

{% step srNumber=7 %}
{% stepDescription title="Select Destinations" %}

Choose where to send your alerts. OpenMetadata supports both internal and external channels.

**Internal Destinations:**
* **Admins** - Notify all platform administrators
* **Followers** - Notify users following the asset
* **Owners** - Alert the asset owners
* **Teams or Specific Users** - Target specific teams or individuals

**External Destinations:**
* **Email**
* **Chat**: Slack, MS Teams, Google Chat
* **Automation**: Generic Webhooks

{% /stepDescription %}

{% stepVisualInfo %}
{% image
src="/images/v1.11/how-to-guides/admin-guide/internal.webp"
alt="Internal Destinations"
caption="Internal Destinations"
/%}

{% image
src="/images/v1.11/how-to-guides/admin-guide/external.webp"
alt="External Destinations"
caption="External Destinations"
/%}
{% /stepVisualInfo %}
{% /step %}

{% /stepsContainer %}