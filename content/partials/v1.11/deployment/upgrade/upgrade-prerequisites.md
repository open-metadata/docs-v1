# Prerequisites

Every time that you plan on upgrading OpenMetadata to a newer version, make sure to go over all these steps:

## Backup your Metadata

Before upgrading your OpenMetadata version we strongly recommend backing up the metadata.

The source of truth is stored in the underlying database (MySQL and Postgres supported). During each version upgrade there
is a database migration process that needs to run. It will directly attack your database and update the shape of the
data to the newest OpenMetadata release.

It is important that we backup the data because if we face any unexpected issues during the upgrade process, 
you will be able to get back to the previous version without any loss.

{% note %}

You can learn more about how the migration process works [here](/deployment/upgrade/how-does-it-work).

**During the upgrade, please note that the backup is only for safety and should not be used to restore data to a higher version**.

{% /note %}

Since version 1.4.0, **OpenMetadata encourages using the builtin-tools for creating logical backups of the metadata**:

- [mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) for MySQL
- [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html) for Postgres

For PROD deployment we recommend users to rely on cloud services for their databases, be it [AWS RDS](https://docs.aws.amazon.com/rds/),
[Azure SQL](https://azure.microsoft.com/en-in/products/azure-sql/database) or [GCP Cloud SQL](https://cloud.google.com/sql/).

If you're a user of these services, you can leverage their backup capabilities directly:
- [Creating a DB snapshot in AWS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CreateSnapshot.html)
- [Backup and restore in Azure MySQL](https://learn.microsoft.com/en-us/azure/mysql/single-server/concepts-backup)
- [About GCP Cloud SQL backup](https://cloud.google.com/sql/docs/mysql/backup-recovery/backups)

You can refer to the following guide to get more details about the backup and restore:

{% inlineCalloutContainer %}
  {% inlineCallout
    color="violet-70"
    icon="luggage"
    bold="Backup Metadata"
    href="/deployment/backup-restore-metadata" %}
      Learn how to back up MySQL or Postgres data.
  {% /inlineCallout %}
{% /inlineCalloutContainer %}

## Understanding the Running State in OpenMetadata

In OpenMetadata, the **"Running"** state indicates that the OpenMetadata server has received a response from Airflow confirming that a workflow is in progress. However, if Airflow unexpectedly stops or crashes before it can send a failure status update through the **Failure Callback**, OpenMetadata remains unaware of the workflow’s actual state. As a result, the workflow may appear to be stuck in **"Running"** even though it is no longer executing.  

This situation can also occur during an OpenMetadata upgrade. If an ingestion pipeline was running at the time of the upgrade and the process caused Airflow to shut down, OpenMetadata would not receive any further updates from Airflow. Consequently, the pipeline status remains **"Running"** indefinitely.

{% image
  src="/images/v1.11/deployment/upgrade/running-state-in-openmetadata.png"
  alt="Running State in OpenMetadata"
  caption="Running State in OpenMetadata" /%}

### Expected Steps to Resolve
To resolve this issue:  
- Ensure that Airflow is restarted properly after an unexpected shutdown.  
- Manually update the pipeline status if necessary.  
- Check Airflow logs to verify if the DAG execution was interrupted.

### Update `sort_buffer_size` (MySQL) or `work_mem` (Postgres)

Before running the migrations, it is important to update these parameters to ensure there are no runtime errors.
A safe value would be setting them to 20MB.

**If using MySQL**

You can update it via SQL (note that it will reset after the server restarts):

```sql
SET GLOBAL sort_buffer_size = 20971520
```

To make the configuration persistent, you'd need to navigate to your MySQL Server install directory and update the
`my.ini` or `my.cnf` [files](https://dev.mysql.com/doc/refman/8.0/en/option-files.html) with `sort_buffer_size = 20971520`.

If using RDS, you will need to update your instance's [Parameter Group](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html)
to include the above change.

**If using Postgres**

You can update it via SQL (not that it will reset after the server restarts):

```sql
SET work_mem = '20MB';
```

To make the configuration persistent, you'll need to update the `postgresql.conf` [file](https://www.postgresql.org/docs/9.3/config-setting.html)
with `work_mem = 20MB`.

If using RDS, you will need to update your instance's [Parameter Group](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html)
to include the above change.

Note that this value would depend on the size of your `query_entity` table. If you still see `Out of Sort Memory Error`s
during the migration after bumping this value, you can increase them further.

After the migration is finished, you can revert this changes.

## Breaking Changes

- Ingestion Framework: All workflows have integrated the `workflow.print_status()` inside the `workflow.execute()` call. This change was needed to better handle logger lifecycles. If you’re using the Ingestion Framework directly to manage workflows via the usual process:

```
workflow_config = yaml.safe_load(CONFIG)
workflow = MetadataWorkflow.create(workflow_config)
workflow.execute()
workflow.raise_from_status()
workflow.print_status()  # Not necessary anymore
workflow.stop()
```

You can now remove the `print_status()` call. Note that the only side effect would be temporarily getting duplicated summary logs.

- Changed field from **status** to **entityStatus** for **glossaryTerm** and **dataContract**, as we introduce it for different data assets.
- For Data Contracts, the value also changed from **Active** to **Approved**.

### MySQL Configuration Required for Airflow 3.x Migration

If you are using MySQL as your Airflow metadata database and upgrading to Airflow 3.x (the new default in OpenMetadata 1.11), you must configure MySQL to allow temporary stored function creation during the migration process.

#### Root Cause

During the Airflow 3.x database migration on MySQL, Airflow needs to create a temporary stored function (`uuid_generate_v7`) to backfill UUIDs for the `task_instance` table. When MySQL runs with binary logging enabled (which is the default in most production setups), it blocks function creation unless `log_bin_trust_function_creators` is enabled or the user has SUPER privileges. Without this configuration, the migration fails with an error like:

```
FUNCTION airflow_db.uuid_generate_v7 does not exist
```

This is a known limitation when running Airflow 3.x migrations on MySQL with binary logging enabled. PostgreSQL users are not affected by this issue.

For more details, see the Apache Airflow issues:
- [https://github.com/apache/airflow/issues/49611](https://github.com/apache/airflow/issues/49611)
- [https://github.com/apache/airflow/issues/54554](https://github.com/apache/airflow/issues/54554)

#### Resolution

**Step 1: Enable MySQL Configuration**

First, enable `log_bin_trust_function_creators` in your MySQL instance to allow Airflow to create the necessary stored function:

For Docker deployments, add this to your `docker-compose.yml` file under the MySQL service:

```yaml
services:
  mysql:
    command: "--log-bin-trust-function-creators=1"
```

For standalone MySQL instances, execute this query as a user with sufficient privileges:

```sql
SET GLOBAL log_bin_trust_function_creators = 1;
```

**Step 2: Clean Airflow Database**

After enabling the MySQL configuration, choose one of the following options based on your situation:

**Option 1: Clean Airflow Metadata (Recommended for Fresh Start)**

If you want to avoid conflicting migration changes and start with a clean Airflow metadata database, you can truncate the `task_instance` table. This approach removes all task execution history but preserves your DAGs and connections.

{% note noteType="Warning" %}
This will delete all historical task execution data. Only use this if you're okay with losing task run history.
{% /note %}

```sql
-- Clean task_instance table to avoid migration conflicts
USE airflow_db;

-- Truncate task_instance table
TRUNCATE TABLE task_instance;

-- Verify the table is empty
SELECT COUNT(*) FROM task_instance;
```

Execute this script:

```bash
# Run the cleanup script on your MySQL container
docker exec -i openmetadata_mysql mysql -u USERNAME -pPASSWORD -e "USE airflow_db; TRUNCATE TABLE task_instance; SELECT COUNT(*) as remaining_rows FROM task_instance;"

# Restart the ingestion container to apply migrations
docker restart openmetadata_ingestion
```

**Option 2: Fix Stuck Migrations (If Migration Already Failed)**

If your migration is already stuck midway (the `task_instance` table was partially modified), you need to reset the migration state before restarting. Save the following SQL script as `fix_airflow_migration.sql`:

```sql
-- Fix Airflow 3.x migration issue
-- This script fixes the partial migration of task_instance table

USE airflow_db;

-- Check if the migration was partially applied
-- If 'id' column exists but isn't properly configured, we need to fix it

-- First, check the current state
SHOW COLUMNS FROM task_instance LIKE 'id';

-- Drop the problematic column if it exists
SET @exist := (SELECT COUNT(*) FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = 'airflow_db'
    AND TABLE_NAME = 'task_instance'
    AND COLUMN_NAME = 'id');

SET @sqlstmt := IF(@exist > 0,
    'ALTER TABLE task_instance DROP COLUMN id',
    'SELECT ''Column does not exist'' AS status');

PREPARE stmt FROM @sqlstmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Reset the alembic version to before this migration
-- The migration that's failing is: d59cbbef95eb (Add UUID primary key to task_instance)
-- We need to set it back to the previous version: 05234396c6fc
UPDATE alembic_version SET version_num = '05234396c6fc' WHERE version_num = 'd59cbbef95eb';

-- Verify the changes
SELECT * FROM alembic_version;
SHOW COLUMNS FROM task_instance LIKE 'id';
```

Then execute the script and restart the container:

```bash
# Run the fix script on your MySQL container
docker exec -i openmetadata_mysql mysql -u USERNAME -pPASSWORD < fix_airflow_migration.sql

# Restart the ingestion container
docker restart openmetadata_ingestion
```

{% note noteType="Warning" %}
Replace `USERNAME` and `PASSWORD` with your actual MySQL credentials, and ensure the database name matches your configuration (default is `airflow_db`).
{% /note %}
