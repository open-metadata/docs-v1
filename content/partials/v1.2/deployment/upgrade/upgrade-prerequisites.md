# Prerequisites

Everytime that you plan on upgrading OpenMetadata to a newer version, make sure to go over all these steps:

### Backup your Metadata

Before upgrading your OpenMetadata version we strongly recommend backing up the metadata.

The source of truth is stored in the underlying database (MySQL and Postgres supported). During each version upgrade there
is a database migration process that needs to run. It will directly attack your database and update the shape of the
data to the newest OpenMetadata release.

It is important that we backup the data because if we face any unexpected issues during the upgrade process, 
you will be able to get back to the previous version without any loss.

{% note %}

You can learn more about how the migration process works [here](/deployment/upgrade/how-does-it-work).

{% /note %}

- To run the backup and restore commands, please make sure that you are always in the latest `openmetadata-ingestion` version to have all the improvements shipped in the CLI.
- Also, make sure you have connectivity between your database (MySQL / PostgreSQL) and the host machine where you will be running the below commands.

**1. Create a Virtual Environment and Install the Backup CLI**

```python
python -m venv venv
source venv/bin/activate
pip install openmetadata-ingestion~=1.2.0
```

Validate the installed metadata version with `python -m metadata --version`

**2. Run the Backup**

If using MySQL:

```bash
python -m metadata backup -u openmetadata_user -p openmetadata_password -H mysql -d openmetadata_db --port 3306
```

If using Postgres:

```bash
python -m metadata backup -u openmetadata_user -p openmetadata_password -H postgresql -d openmetadata_db --port 5432 -s public
```

**3. Store the backup file somewhere safe**

The above command will generate a backup file with extension as `.sql`. You can copy the name from the backup command output.

Make sure to store it somewhere safe in case you need to restore the data later.

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

# Deprecation Notice

- OpenMetadata only supports Python version 3.8 to 3.10. We will add support for 3.11 in the release 1.3.
- OpenMetadata version 0.13.x is deprecated.

# Breaking Changes

### Version Upgrades

- The OpenMetadata Server is now based on **JDK 17**
- OpenMetadata now supports **Elasticsearch** up to version **8.10.2** and **Opensearch** up to version **2.7**

There is no direct migration to bump the indexes to the new supported versions. You might see errors like:

```
java.lang.IllegalStateException: cannot upgrade a node from version [7.16.3] directly to version [8.5.1]
ERROR: Elasticsearch did not exit normally - check the logs at /usr/share/elasticsearch/logs/elasticsearch.log
ERROR: Elasticsearch exited unexpectedly
```

In order to move forward, **you must remove the volumes or delete the indexes** directly from your search instances. Note that
OpenMetadata stores everything in the database, so indexes can be recreated from the UI. We will
show you how in the [Post-Upgrade Steps](/deployment/upgrade#reindex).

### Helm Chart Values

- Added a new key `openmetadata.config.database.dbParams` to pass extra database parameters as string format, e.g., `useSSL=true&serverTimezone=UTC`.
- Removed the entry for `openmetadata.config.database.dbUseSSL`. You should use `openmetadata.config.database.dbParams` instead.
- Updated the ElasticSearch Helm Chart Dependencies to version 8.5.1

### Query Entity

The Query Entity now has the `service` property, linking the Query to the Database Service that it belongs to. Note
that `service` is a required property both for the Query Entity and the Create Query Entity.

During the migrations, we pick up the service from the tables from `queryUsedIn`. If this information is not available,
then there is no way to link a query to a service and the query will be removed.

### Service Connection Changes

- Domo Database, Dashboard and Pipeline renamed the `sandboxDomain` in favor of `instanceDomain`.
- The `DatabaseMetadata` configuration renamed `viewParsingTimeoutLimit` to `queryParsingTimeoutLimit`.
- The `DatabaseMetadata` configuration removed the `markAllDeletedTables` option. For simplicity, we'll only
  mark as deleted the tables coming from the filtered ingestion results.

### Ingestion Framework Changes

We have reorganized the structure of the `Workflow` classes, which requires updated imports:

- **Metadata Workflow**
  - From: `from metadata.ingestion.api.workflow import Workflow`
  - To: `from metadata.workflow.metadata import MetadataWorkflow`

- **Lineage Workflow**
  - From: `from metadata.ingestion.api.workflow import Workflow`
  - To: `from metadata.workflow.metadata import MetadataWorkflow` (same as metadata)

- **Usage Workflow**
  - From: `from metadata.ingestion.api.workflow import Workflow`
  - To: `from metadata.workflow.usage import UsageWorkflow`

- **Profiler Workflow**
  - From: `from metadata.profiler.api.workflow import ProfilerWorkflow`
  - To: `from metadata.workflow.profiler import ProfilerWorkflow`

- **Data Quality Workflow**
  - From: `from metadata.data_quality.api.workflow import TestSuiteWorkflow`
  - To: `from metadata.workflow.data_quality import TestSuiteWorkflow`

- **Data Insights Workflow**
  - From: `from metadata.data_insight.api.workflow import DataInsightWorkflow`
  - To: `from metadata.workflow.data_insight import DataInsightWorkflow`

- **Elasticsearch Reindex Workflow**
  - From: `from metadata.ingestion.api.workflow import Workflow`
  - To: `from metadata.workflow.metadata import MetadataWorkflow` (same as metadata)

The `Workflow` class that you import can then be called as follows:

```python
from metadata.workflow.workflow_output_handler import print_status

workflow = workflow_class.create(workflow_config)
workflow.execute()
workflow.raise_from_status()
print_status(workflow)  # This method has been updated. Before it was `workflow.print_status()`
workflow.stop()
```

If you try to run your workflows externally and start noticing `ImportError`s, you will need to review the points above.

### Metadata CLI Changes

In 1.1.7 and below you could run the Usage Workflow as `metadata ingest -c <path to yaml>`. Now, the Usage Workflow
has its own command `metadata usage -c <path to yaml>`.

### Other Changes

- Pipeline Status are now timestamps in milliseconds.
