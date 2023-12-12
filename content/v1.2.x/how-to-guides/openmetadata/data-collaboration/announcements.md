---
title: Overview of Announcements
slug: /how-to-guides/openmetadata/data-collaboration/announcements
---

# Overview of Announcements

It is a huge challenge to inform the data team about upcoming changes to data. In most organizations, data changes are announced in advance over email or Slack; and sometimes, this information is noticed pretty late, leaving very little time to prepare for the changes.

In OpenMetadata, **announcements** can be set up to inform the entire team about the upcoming changes to a data asset. With the Announcements feature, you can now inform your entire team of all the upcoming events and changes, such as **deprecation, deletion, or schema changes**. These announcements can be scheduled with a start date and an end date. All the users following your data are not only notified in Activity Feeds but a banner is also shown on the data asset details page.

{% note %}
**Tip:** Ideally, it’s best to schedule the announcements well in advance before modifying or deleting a data asset, so you can ensure that the entire team has a reasonable amount of time to plan accordingly.
{% /note %}

{% image
src="/images/v1.1/how-to-guides/user-guide-for-data-stewards/announce1.png"
alt="Banner on Data Assets Page"
caption="Banner on Data Assets Page"
/%}

{% note noteType="Warning" %} 
**Pro Tip:** Ensure that all **backward incompatible changes** are announced to the team well in advance. For example, when deleting a column from a table.
{% /note noteType="Warning" %}
{% /note %}

Clicking on the announcement will display further details.

{% image
src="/images/v1.1/how-to-guides/user-guide-for-data-stewards/announce2.png"
alt="Details of the Announcement"
caption="Details of the Announcement"
/%}

{% image
src="/images/v1.1/how-to-guides/user-guide-for-data-stewards/announce3.png"
alt="Details of an Announcement"
caption="Details of an Announcement"
/%}

Details of an announcement are as follows:
- **Creator:** Get to know who added the announcement.
- **Data Asset:** Know the data asset type (Table, Pipeline) as well as name of the data asset it pertains to.
- **Scheduled Date:** A date range can be added during which the announcement will be displayed in OpenMetadata. This consists of a start and end date.

These announcements are also displayed on the top right of the landing page.

{% image
src="/images/v1.1/how-to-guides/user-guide-for-data-stewards/announce4.png"
alt="Announcement Display (Top Right)"
caption="Landing Page Announcement Display (Top Right)"
/%}

{% note %}
**Advanced Tip:** Users can set up Alerts to be sent from OpenMetadata via Email,  Chat, Slack, MS Teams, and Webhooks. If alerts have been set up for Activity Feeds, then the concerned data owners and followers will be notified via email, Slack, etc.
{% /note %}