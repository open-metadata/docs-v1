---
title: Snowflake Troubleshooting Guide | OpenMetadata Support
description: Fix Snowflake connector issues fast with OpenMetadata'stroubleshooting guide. Get solutions for common problems, error codes, and connection failures.
slug: /connectors/database/snowflake/troubleshooting
---

{% partial file="/v1.12/connectors/troubleshooting.md" /%}

## Snowflake User Access Disabled

If you encounter the following error when attempting to connect to a Snowflake database:

```yaml

(snowflake.connector.errors.DatabaseError) 250001 (08001): None: Failed to connect to DB: <your-account>.snowflakecomputing.com:443. User access disabled. Contact your local system administrator.

```

This indicates that the Snowflake user account used for the connection has been **disabled**.


### Resolution

1. **Log in to Snowflake** using an account with administrative privileges.
2. Run the following SQL command to re-enable the user:

   ```sql
   ALTER USER <username> SET DISABLED = FALSE;
    ```

## Connection Timeout During Test Connection or Ingestion

If Snowflake is accessible from your ingestion environment but you still encounter connection timeout errors like the following:

```
WARNING {snowflake.connector.vendored.urllib3.connectionpool:connectionpool:868} - Retrying (Retry(total=0, connect=None, read=None, redirect=None, status=None)) after connection broken by 'ReadTimeoutError("HTTPSConnectionPool(host='xxxxx.snowflakecomputing.com', port=443): Read timed out. (read timeout=60)")': /queries/xxxx-xxxx-xxxx-xxxx-xxxx/result?request_guid=xxxx-xxxx-xxxx-xxxx-xxxx
```

This is most likely due to the size of the Snowflake warehouse being too small to handle the metadata extraction queries within the timeout period.

### Resolution

We recommend using at least a **Medium (M)** sized Snowflake warehouse for OpenMetadata ingestion. Smaller warehouse sizes may not have enough compute resources to execute metadata queries before the connection times out.

To resize your warehouse, run the following SQL command:

```sql
ALTER WAREHOUSE <warehouse_name> SET WAREHOUSE_SIZE = 'MEDIUM';
```

Alternatively, you can resize the warehouse through the Snowflake UI by navigating to **Admin > Warehouses** and modifying the warehouse size.
