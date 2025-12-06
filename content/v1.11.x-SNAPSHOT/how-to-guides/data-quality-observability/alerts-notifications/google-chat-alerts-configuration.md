---
title: Google Chat Alerts Configuration | OpenMetadata
description: Configure Google Chat as an alert destination in OpenMetadata.
slug: /how-to-guides/data-quality-observability/alerts-notifications/google-chat-alerts-configuration
---

## Google Chat Alerts Configuration

OpenMetadata integrates with Google Chat using **Webhooks** to deliver alert messages directly to your Google Chat Spaces. This allows you to receive real-time notifications within your Google Chat workspace.

### Setting Up a Google Chat Webhook

Follow these steps to create a Webhook in your Google Chat Space:

#### Step 1: Access Google Chat

1. Open [Google Chat](https://chat.google.com)
2. Sign in with your Google account
3. Navigate to the **Space** where you want to receive alerts (or create a new Space)

#### Step 2: Create a New Webhook

1. Click on the **Space name** at the top of the chat window
2. From the dropdown menu, select **Space Settings**
3. Click **Apps & Integrations**  in the left menu.
3. Click **Add Webhooks**

#### Step 3: Configure the Webhook

1. Enter a **Name** for the webhook (e.g., "OpenMetadata Alerts")
2. Select the **Avatar** or icon for the webhook (optional)
3. Click **Create**

#### Step 4: Copy Your Webhook URL

1. You'll see your new webhook listed with a **Webhook URL**
2. Copy the complete **Webhook URL** (it looks like `https://chat.googleapis.com/v1/spaces/XXXXXXXXXXXXXXX/messages?key=...&token=...`)
3. Keep this URL safe - you'll need it to configure OpenMetadata

### Configuring Google Chat Webhooks in OpenMetadata

Once you have your Google Chat Webhook URL, follow these steps to configure it in OpenMetadata:

#### Step 1: Access Alert Configuration

1. In OpenMetadata, navigate to **Alerts & Notifications** from the main menu
2. Select the type of alert you want to configure:
   - [**Data Observability Alerts**](/how-to-guides/data-quality-observability/alerts-notifications/data-observability-alerts) (for data quality and pipeline monitoring)
   - [**System & Governance Notifications**](/how-to-guides/data-quality-observability/alerts-notifications/system-governance-notifications) (for metadata and governance events)

#### Step 2: Add Google Chat as a Destination

1. Click **Add Destination**
2. Select **Google Chat** from the available destination options
3. Paste your Google Chat Webhook URL into the **Google Chat Webhook URL** field

#### Step 3: Test the Connection

1. Click **Test Connection** to verify the webhook is working
2. A test message will be sent to your Google Chat Space
3. If successful, you'll see a confirmation message and the test message in your Space

#### Step 4: Save and Enable

1. Click **Save** to store the Alert configuration
2. The Google Chat destination is now ready to receive alerts

### Best Practices

- **Dedicated Spaces**: Create separate Google Chat Spaces for different types of alerts (e.g., "Data Quality Alerts", "Pipeline Failures", "Governance Events")
- **Space Members**: Ensure all relevant team members are added to the Google Chat Space
- **Multiple Webhooks**: You can configure multiple Google Chat webhooks to send different alert types to different Spaces
- **Notifications**: Enable notifications for the Space so team members don't miss important alerts
- **Monitoring**: Regularly review alerts in your Google Chat Space to ensure they're being delivered

### Reference

For more information about Google Chat Webhooks, visit the [Google Chat Webhooks Documentation](https://developers.google.com/workspace/chat/quickstart/webhooks)