---
title: System & Governance Notifications | OpenMetadata
description: Configure notifications for metadata changes, governance events, and collaboration activities.
slug: /how-to-guides/data-quality-observability/alerts-notifications/system-governance-notifications
---

# System & Governance Notifications

Stay informed about metadata changes, governance events, and collaboration activities across your data catalog.

{% stepsContainer %}

{% step srNumber=1 %}
{% stepDescription title="Open the Notifications Page" %}

Navigate to **Settings > Notifications > System**.

{% /stepDescription %}

{% stepVisualInfo %}
{% /stepVisualInfo %}
{% /step %}

{% step srNumber=2 %}
{% stepDescription title="Create a new Alert" %}

Click the **Add Notification** button.

{% /stepDescription %}

{% stepVisualInfo %}
{% image
src="/images/v1.12/how-to-guides/data-quality-observability/observability/alerts/system-notifications-add-alert.webp"
alt="Add Notification Button"
caption="Add Notification Button"
/%}
{% /stepVisualInfo %}
{% /step %}

{% step srNumber=3 %}
{% stepDescription title="Name the Alert and Add Context" %}
Provide a unique, descriptive **Name** for your alert. You can also add an optional **Description** to provide further context and clarity regarding the alert's intent.
{% /stepDescription %}

{% stepVisualInfo %}
{% image
src="/images/v1.12/how-to-guides/data-quality-observability/observability/alerts/system-notifications-alert-name-description.webp"
alt="Input fields for Alert Name and Description"
caption="Define the Alert Name and Optional Description"
/%}
{% /stepVisualInfo %}
{% /step %}

{% step srNumber=4 %}
{% stepDescription title="Select the Metadata Entity to Monitor" %}
Choose the specific entity type whose changes you want to track. These sources include data assets (like **Table** or **Pipeline**) as well as governance and platform entities (like **Glossary**, **Tag**, **User**, or **Announcement**).
Any relevant change to the selected entity will generate an event for this notification.
{% /stepDescription %}

{% stepVisualInfo %}
{% image
src="/images/v1.12/how-to-guides/data-quality-observability/observability/alerts/system-notifications-source.webp"
alt="Select the Source Resource for System Notifications"
caption="Select the Source Resource"
/%}
{% /stepVisualInfo %}
{% /step %}

{% step srNumber=5 %}
{% stepDescription title="Configure Filters (Optional)" %}

{% note noteType="Warning" %}
If you do not set any filter, the alert will apply to **all** events over the selected source entity type.
{% /note %}

Filters allow refining the scope of the alert to focus only on relevant changes. The available filter criteria depend on the source entity selected. Events can be narrowed down basing on a variety of criteria, including:

* **Owner:** Filter events based on the designated owner of the asset.
* **Entity FQN:** Filter by the Fully Qualified Name of the entity.
* **Event Type:** Filter by the specific action that occurred (e.g., Created, Updated, Deleted).
* **Updater Name:** Filter based on the user or service that executed the change.
* **Domain:** Filter events based on the Data Domain the entity belongs to.
* **Filter By Updater Is Bot:** Filter to include or exclude changes made by automated ingestion or system processes.

Use the **Include** toggle to define the logic for the filter condition:
* **Include (Toggle ON):** If the event meets the filter condition, the alert is **sent**.
* **Exclude (Toggle OFF):** If the event meets the filter condition, the alert is **silenced** (not sent).

You can add multiple filters to a single alert subscription.

{% /stepDescription %}

{% stepVisualInfo %}
{% image
src="/images/v1.12/how-to-guides/data-quality-observability/observability/alerts/system-notifications-filter-0.webp"
alt="Define Filters"
caption="Define Filters"
/%}
{% image
src="/images/v1.12/how-to-guides/data-quality-observability/observability/alerts/system-notifications-filter-1.webp"
alt="Define Filters"
caption="Define Filters"
/%}
{% /stepVisualInfo %}
{% /step %}

{% step srNumber=6 %}
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
src="/images/v1.12/how-to-guides/admin-guide/internal.webp"
alt="Internal Destinations"
caption="Internal Destinations"
/%}

{% image
src="/images/v1.12/how-to-guides/admin-guide/external.webp"
alt="External Destinations"
caption="External Destinations"
/%}
{% /stepVisualInfo %}
{% /step %}

{% /stepsContainer %}