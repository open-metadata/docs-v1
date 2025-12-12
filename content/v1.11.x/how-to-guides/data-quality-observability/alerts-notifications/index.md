---
title: Alerts & Notifications | OpenMetadata Guide
description: Configure alerts and notifications for data observability and system governance events across your data catalog.
slug: /how-to-guides/data-quality-observability/alerts-notifications
---

# Alerts & Notifications

OpenMetadata has been providing observability alerts right from the start to notify users of important data lifecycle events: schema modifications, ownership shifts, and tagging updates. Users can define fine-grained alerts and notifications.

Starting from the 1.3 release, Data Observability alerts have been completely revamped, simplifying the process of monitoring data. Users can quickly create alerts for:
- **Changes in the Metadata:** such as schema changes,
- **Data Quality Failures:** to filter by Test Suite,
- **Pipeline Status Failures:** when ingesting runs from your ETL systems, and
- **Ingestion Pipeline Monitoring:** for OpenMetadata’s ingestion workflows

Depending on your use cases, notifications can be sent to owners, admins, teams, or users, providing a more personalized and informed experience. Teams can configure their dedicated Slack, MS Teams, or Google Chat channels to receive notifications related to their data assets, streamlining communication and collaboration. With the alerts and notifications in OpenMetadata, users can send Announcements over email, Slack, or Teams. Alerts are sent to a user when they are mentioned in a task or an activity feed.

{% youtube videoId="0QlFSIovjOQ" start="0:00" end="2:09" width="800px" height="450px" /%}

## Observability Alerts & Notifications

OpenMetadata provides a unified **Event Subscription** framework that allows you to configure alerts for two main purposes:

1.  **Data Observability:** Monitoring the health of data systems (e.g., Data Quality failures, Schema Drift, Pipeline failures).
2.  **System & Governance Notifications:** Monitoring metadata changes and collaboration events (e.g., new Glossary terms, Tag updates, Ownership changes).

While these alerts serve different use cases and are accessed from different menus within the platform, the configuration process follows a similar workflow.

### Required Permissions

{%inlineCalloutContainer%}
{%inlineCallout
icon="MdGppGood"
bold="Required Permissions"
href="/how-to-guides/admin-guide/roles-policies"%}
Setting up alerts and notifications requires **Create** permission on the entity `EventSubscription`.
{%/inlineCallout%}
{%/inlineCalloutContainer%}

### Configuration Workflow

Select your use case below to see the specific configuration steps:

{%tilesContainer%}
{%tile
title="Data Observability Alerts"
description="Monitor the health of your data systems with alerts for pipeline failures, data quality issues, and schema changes"
icon="quality"
link="/how-to-guides/data-quality-observability/alerts-notifications/data-observability-alerts"
/%}

{%tile
title="System & Governance Notifications"
description="Stay informed about metadata changes, governance events, and collaboration activities across your data catalog"
icon="governance"
link="/how-to-guides/data-quality-observability/alerts-notifications/system-governance-notifications"
/%}
{%/tilesContainer%}

### Additional Details for the Configuration of External Destinations

OpenMetadata supports multiple external destinations for delivering alerts outside the platform. Each destination type requires a specific setup process.

{%tilesContainer%}
{%tile
title="Email"
description="Send alerts directly to recipient email addresses using your OpenMetadata server's email configuration"
icon="MdMail"
link="/how-to-guides/data-quality-observability/alerts-notifications/email-alerts-configuration"
/%}

{%tile
title="Slack"
description="Deliver alerts to Slack channels using Incoming Webhooks"
icon="MdChat"
link="/how-to-guides/data-quality-observability/alerts-notifications/slack-alerts-configuration"
/%}

{%tile
title="Microsoft Teams"
description="Post alerts to Teams channels using Workflow Webhooks with Adaptive Cards"
icon="MdChat"
link="/how-to-guides/data-quality-observability/alerts-notifications/microsoft-teams-alerts-configuration"
/%}

{%tile
title="Google Chat"
description="Send alerts to Google Chat Spaces using Webhooks"
icon="MdChat"
link="/how-to-guides/data-quality-observability/alerts-notifications/google-chat-alerts-configuration"
/%}

{%tile
title="Generic Webhook"
description="Integrate with custom applications using generic webhooks"
icon="MdApi"
link="/how-to-guides/data-quality-observability/alerts-notifications/generic-webhook-alerts-configuration"
/%}
{%/tilesContainer%}