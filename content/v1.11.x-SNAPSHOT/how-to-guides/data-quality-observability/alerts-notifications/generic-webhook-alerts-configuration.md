---
title: Generic Webhook Alert Configuration | OpenMetadata
description: Configure generic webhooks as an alert destination in OpenMetadata.
slug: /how-to-guides/data-quality-observability/alerts-notifications/generic-webhook-alerts-configuration
---

## Generic Webhook Alerts Configuration

The **Generic Webhook** destination provides maximum flexibility for integrating OpenMetadata alerts with virtually any external system. It allows you to send alert notifications to custom applications, automation platforms, and internal services that can receive HTTP POST requests.

### Use Cases

Generic webhooks are ideal for:
- **Custom Applications**: Internal tools and applications that need to receive alerts
- **Automation Platforms**: Services like Zapier, Make (formerly Integromat), and IFTTT
- **Monitoring Systems**: Integration with existing monitoring infrastructure
- **Internal Services**: Microservices, APIs, and serverless functions
- **Workflow Automation**: Triggering automated workflows and processes

### Preparing Your Webhook Endpoint

Before configuring the webhook in OpenMetadata, you need a webhook endpoint URL from your external system. This could be:
- An automation platform like Zapier or Make
- A custom application or API endpoint
- An internal service that accepts HTTP POST requests
- A serverless function (AWS Lambda, Google Cloud Functions, etc.)

Your endpoint must:
- Accept HTTP POST requests
- Be accessible from your OpenMetadata instance

### Configuring Generic Webhooks in OpenMetadata

Once you have your webhook endpoint URL, follow these steps to configure it in OpenMetadata:

#### Step 1: Access Alert Configuration

1. In OpenMetadata, navigate to **Alerts & Notifications** from the main menu
2. Select the type of alert you want to configure:
   - [**Data Observability Alerts**](/how-to-guides/data-quality-observability/alerts-notifications/data-observability-alerts) (for data quality and pipeline monitoring)
   - [**System & Governance Notifications**](/how-to-guides/data-quality-observability/alerts-notifications/system-governance-notifications) (for metadata and governance events)

#### Step 2: Add Generic Webhook as a Destination

1. Click **Add Destination**
2. Select **Generic Webhook** from the available destination options
3. Paste your **Endpoint URL** into the **Endpoint URL** field (must start with `https://`)

#### Step 3: Test the Connection

1. Click **Test Connection** to verify the webhook is working
2. A test payload will be sent to your endpoint
3. If successful, you'll see a confirmation message
4. Check your external system to verify the test message was received

#### Step 4: Save and Enable

1. Click **Save** to store the configuration
2. The webhook destination is now ready to receive alerts

### Best Practices

- **Use HTTPS**: Always use HTTPS endpoints for security
- **Error Handling**: Ensure your endpoint handles errors gracefully and logs failures
- **Response Time**: Keep endpoint response times under 30 seconds
- **Multiple Webhooks**: You can configure multiple webhook endpoints for different alert types
- **Testing**: Always test your webhook connection before enabling in production
- **Validation**: Validate incoming data in your endpoint before processing