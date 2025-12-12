---
title: Salesforce Connector | OpenMetadata CRM Integration Guide
description: Connect Salesforce to OpenMetadata with our comprehensive database connector guide. Setup instructions, configuration tips, and metadata extraction made easy.
slug: /connectors/database/salesforce
---

{% connectorDetailsHeader
name="Salesforce"
stage="PROD"
platform="OpenMetadata"
availableFeatures=["Metadata"]
unavailableFeatures=["Query Usage", "Data Profiler", "Data Quality", "dbt", "Lineage", "Column-level Lineage", "Stored Procedures", "Owners", "Tags", "Sample Data", "Auto-Classification"]
/ %}


In this section, we provide guides and references to use the Salesforce connector.

Configure and schedule Salesforce metadata and profiler workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)
- [Enable Security](#securing-salesforce-connection-with-ssl-in-openmetadata)
- [Troubleshooting](/connectors/database/salesforce/troubleshooting)

{% partial file="/v1.12/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/database/salesforce/yaml"} /%}

## Requirements

These are the permissions you will require to fetch the metadata from Salesforce.

- **API Access**: You must have the API Enabled permission in your Salesforce organization.
- **Object Permissions**: You must have read access to the Salesforce objects that you want to ingest.

## Metadata Ingestion

{% partial 
  file="/v1.12/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "Salesforce", 
    selectServicePath: "/images/v1.12/connectors/salesforce/select-service.png",
    addNewServicePath: "/images/v1.12/connectors/salesforce/add-new-service.png",
    serviceConnectionPath: "/images/v1.12/connectors/salesforce/service-connection.png",
} 
/%}

{% stepsContainer %}
{% extraContent parentTagName="stepsContainer" %}

#### Connection Details

{% collateContent %}

{% note %} 

When using a **Hybrid Ingestion Runner**, any sensitive credential fields—such as passwords, API keys, or private keys—must reference secrets using the following format:

```
password: secret:/my/database/password
```

This applies **only to fields marked as secrets** in the connection form (these typically mask input and show a visibility toggle icon).

For a complete guide on managing secrets in hybrid setups, see the [Hybrid Ingestion Runner Secret Management Guide](https://docs.getcollate.io/getting-started/day-1/hybrid-saas/hybrid-ingestion-runner#3.-manage-secrets-securely).

{% /note %}

{% /collateContent %}

- **Username**: Username to connect to the Salesforce. This user should have the access as defined in requirements.
- **Password**: Password to connect to Salesforce.
- **Consumer Key**: Salesforce Consumer Key for OAuth 2.0 authentication. This is obtained from your Salesforce Connected App configuration.
- **Consumer Secret**: Salesforce Consumer Secret for OAuth 2.0 authentication. This is obtained from your Salesforce Connected App configuration.
- **Security Token**: Salesforce Security Token is required to access the metadata through APIs. You can checkout [this doc](https://help.salesforce.com/s/articleView?id=sf.user_security_token.htm&type=5) on how to get the security token.
- **Organization ID**: Salesforce Organization ID is the unique identifier for your Salesforce identity. You can check out [this doc](https://help.salesforce.com/s/articleView?id=000385215&type=1) on how to get the your Salesforce Organization ID.
  {% note %}
  **Note**: You need to provide `15` digit organization id in this section. for e.g. `00DIB000004nDEq`, which you can find by following the steps mentioned in above doc (`Salesforce dashboard->Setup->Company Profile->Company Information->Salesforce.com Organization Id`).
  {% /note %}
  {% note %}
  **Note**: If you want to access salesforce metadata without token(only by using organization id), you will need to setup your ip in trusted ip ranges. You can go (`Salesforce dashboard->Setup->Security->Network Access->Trusted IP Ranges`) to configure this. You can check [here](https://help.salesforce.com/s/articleView?id=sf.security_networkaccess.htm&type=5) to configure your ip in trusted ip ranges.
  {% /note %}
- **Salesforce Object Name**: Specify the Salesforce Object Name in case you want to ingest a specific object.  If left blank, we will ingest all the Objects.
- **Salesforce API Version**: Follow the steps mentioned [here](https://help.salesforce.com/s/articleView?id=000386929&type=1) to get the API version. Enter the numerical value in the field, For example `42.0`.
- **Salesforce Domain**: Specify the Salesforce domain (subdomain only) to use for authentication. This field accepts only the domain prefix, not the full URL.

  **Common values:**
  - `login` (default) - For production instances (resolves to `https://login.salesforce.com`)
  - `test` - For sandbox instances (resolves to `https://test.salesforce.com`)
  
  **For Salesforce My Domain:**
  Enter your full custom domain prefix, including all subdomain components (such as `.my`, `.sandbox.my`, etc.), but without `.salesforce.com`.
  
  **Examples:**
  - If your My Domain URL is `https://mycompany.my.salesforce.com`, enter: `mycompany.my`
  - If your sandbox My Domain URL is `https://mycompany--uat.sandbox.my.salesforce.com`, enter: `mycompany--uat.sandbox.my`
  - If your URL is `https://example-dot-com--uat.sandbox.my.salesforce.com`, enter: `example-dot-com--uat.sandbox.my`
  
  {% note %}
  **Important:** Do NOT enter the full URL or include `.salesforce.com`. Only enter the subdomain prefix as shown in the examples above.
  {% /note %}

**SSL Configuration**

In order to integrate SSL in the Metadata Ingestion Config, the user will have to add the SSL config under sslConfig which is placed in the source.

{% partial file="/v1.12/connectors/database/advanced-configuration.md" /%}

{% /extraContent %}

{% partial file="/v1.12/connectors/test-connection.md" /%}

{% partial file="/v1.12/connectors/database/configure-ingestion.md" /%}

{% partial file="/v1.12/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}

## Securing Salesforce Connection with SSL in OpenMetadata

To establish secure connections between OpenMetadata and Salesforce, navigate to the `Advanced Config` section. Here, you can provide the CA certificate used for SSL validation by specifying the `caCertificate`.  Alternatively, if both client and server require mutual authentication, you'll need to use all three parameters: `ssl_key`, `ssl_cert`, and `ssl_ca`. In this case, `ssl_cert` is used for the client’s SSL certificate, `ssl_key` for the private key associated with the SSL certificate, and `ssl_ca` for the CA certificate to validate the server’s certificate.

{% image
  src="/images/v1.12/connectors/ssl_connection.png"
  alt="SSL Configuration"
  height="450px"
  caption="SSL Configuration" /%}

{% partial file="/v1.12/connectors/troubleshooting.md" /%}

{% partial file="/v1.12/connectors/database/related.md" /%}
