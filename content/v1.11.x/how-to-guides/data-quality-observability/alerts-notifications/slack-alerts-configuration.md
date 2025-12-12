---
title: Slack Alerts Configuration | OpenMetadata
description: Configure Slack as an alert destination in OpenMetadata.
slug: /how-to-guides/data-quality-observability/alerts-notifications/slack-alerts-configuration
---

## Slack Alerts Configuration

OpenMetadata integrates with Slack using **Incoming Webhooks** to deliver alert messages directly to your Slack channels. This allows you to receive real-time notifications without leaving Slack.

### Setting Up a Slack Webhook

Follow these steps to create an Incoming Webhook in your Slack workspace:

#### Step 1: Access Slack API Applications

1. Go to [Slack API Applications](https://api.slack.com/apps)
2. Sign in with your Slack workspace credentials
3. Click **Create New App** or **Create an App**

#### Step 2: Create a New App

1. Select **From scratch**
2. Enter an **App Name** (e.g., "OpenMetadata Alerts")
3. Select your **Slack Workspace**
4. Click **Create App**

#### Step 3: Enable and Configure Incoming Webhooks

1. In the left sidebar, navigate to **Incoming Webhooks**
2. Toggle **Activate Incoming Webhooks** to **On**
3. Click **Add New Webhook to Workspace**
4. Select the **Slack channel** where you want alerts to be posted
5. Click **Allow** to authorize the app

#### Step 4: Copy Your Webhook URL

1. You'll now see your new webhook listed under **Webhook URLs for Your Workspace**
2. Copy the complete **Webhook URL**
3. Keep this URL safe - you'll need it to configure OpenMetadata

### Configuring Slack Webhooks in OpenMetadata

Once you have your Slack Webhook URL, follow these steps to configure it in OpenMetadata:

#### Step 1: Access Alert Configuration

1. In OpenMetadata, navigate to **Alerts & Notifications** from the main menu
2. Select the type of alert you want to configure:
   - [**Data Observability Alerts**](/how-to-guides/data-quality-observability/alerts-notifications/data-observability-alerts) (for data quality and pipeline monitoring)
   - [**System & Governance Notifications**](/how-to-guides/data-quality-observability/alerts-notifications/system-governance-notifications) (for metadata and governance events)

#### Step 2: Add Slack as a Destination

1. Click **Add Destination**
2. Select **Slack** from the available destination options
3. Paste your Slack Webhook URL into the **Slack Webhook URL** field
4. Optionally, enter a **Display Name** for this Slack destination (e.g., "Data Quality Alerts")

#### Step 3: Test the Connection

1. Click **Test Connection** to verify the webhook is working
2. A test message will be sent to your Slack channel
3. If successful, you'll see a confirmation message

#### Step 4: Save and Enable

1. Click **Save** to store the configuration
2. The Slack destination is now ready to receive alerts

### Best Practices

- **Dedicated Channels**: Create separate Slack channels for different types of alerts (e.g., #data-quality-alerts, #pipeline-failures)
- **Channel Permissions**: Ensure the Slack channel is accessible to all team members who need to receive alerts
- **Multiple Webhooks**: You can configure multiple Slack webhooks to send different alert types to different channels
- **Monitoring**: Regularly monitor your Slack channels to ensure alerts are being delivered

### Reference

For more information about Slack Incoming Webhooks, visit the [Slack API Documentation](https://api.slack.com/messaging/webhooks)