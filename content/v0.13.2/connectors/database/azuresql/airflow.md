---
title: Run AzureSQL Connector using Airflow SDK
slug: /connectors/database/azuresql/airflow
---

# Run AzureSQL using the Airflow SDK

{% multiTablesWrapper %}

| Feature            | Status                       |
| :----------------- | :--------------------------- |
| Metadata           | {% icon iconName="check" /%} |
| Query Usage        | {% icon iconName="cross" /%} |
| Data Profiler      | {% icon iconName="check" /%} |
| Data Quality       | {% icon iconName="check" /%} |
| Lineage            | Partially via Views          |
| DBT                | {% icon iconName="check" /%} |
| Supported Versions | --                           |

| Feature      | Status                       |
| :----------- | :--------------------------- |
| Lineage      | Partially via Views          |
| Table-level  | {% icon iconName="check" /%} |
| Column-level | {% icon iconName="check" /%} |

{% /multiTablesWrapper %}

In this section, we provide guides and references to use the Athena connector.

Configure and schedule Athena metadata and profiler workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)
- [Data Profiler](#data-profiler)
- [dbt Integration](#dbt-integration)

## Requirements

{%inlineCallout icon="description" bold="OpenMetadata 0.12 or later" href="/deployment"%}
To deploy OpenMetadata, check the Deployment guides.
{%/inlineCallout%}

To run the Ingestion via the UI you'll need to use the OpenMetadata Ingestion Container, which comes shipped with
custom Airflow plugins to handle the workflow deployment.

### Python Requirements

To run the AzureSQL ingestion, you will need to install:

```bash
pip3 install "openmetadata-ingestion[azuresql]"
```

## Metadata Ingestion

All connectors are defined as JSON Schemas.
[Here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/services/connections/database/azureSQLConnection.json)
you can find the structure to create a connection to AzureSQL.

In order to create and run a Metadata Ingestion workflow, we will follow
the steps to create a YAML configuration able to connect to the source,
process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following
[JSON Schema](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/workflow.json)

### 1. Define the YAML Config

This is a sample config for AzureSQL:

#### Source Configuration - Service Connection

{% codePreview %}

{% codeInfoContainer %}

{% codeInfo srNumber=1 %}
**username**: Specify the User to connect to AzureSQL. It should have enough privileges to read all the metadata.
{% /codeInfo %}

{% codeInfo srNumber=2 %}
**password**: Password to connect to AzureSQL.
{% /codeInfo %}

{% codeInfo srNumber=3 %}
**hostPort**: Enter the fully qualified hostname and port number for your AzureSQL deployment in the Host and Port field.
{% /codeInfo %}


{% codeInfo srNumber=4 %}
**database**: The database of the data source is an optional parameter, if you would like to restrict the metadata reading to a single database. If left blank, OpenMetadata ingestion attempts to scan all the databases.
{% /codeInfo %}


{% codeInfo srNumber=5 %}
**driver**: SQLAlchemy driver for AzureSQL. `ODBC Driver 18 for SQL Server` by default.
{% /codeInfo %}


{% codeInfo srNumber=8 %}
#### Source Configuration - Source Config

The `sourceConfig` is defined [here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/databaseServiceMetadataPipeline.json):

- `markDeletedTables`: To flag tables as soft-deleted if they are not present anymore in the source system.
- `includeTables`: true or false, to ingest table data. Default is true.
- `includeViews`: true or false, to ingest views definitions.
- `databaseFilterPattern`, `schemaFilterPattern`, `tableFilternPattern`: Note that the they support regex as include or exclude. E.g.,
{% /codeInfo %}


{% codeInfo srNumber=9 %}
#### Sink Configuration

To send the metadata to OpenMetadata, it needs to be specified as `type: metadata-rest`.
{% /codeInfo %}


{% codeInfo srNumber=10 %}

#### Workflow Configuration

The main property here is the `openMetadataServerConfig`, where you can define the host and security provider of your OpenMetadata installation.

For a simple, local installation using our docker containers, this looks like:
{% /codeInfo %}

#### Advanced Configuration

{% codeInfo srNumber=6 %}
**Connection Options (Optional)**: Enter the details for any additional connection options that can be sent to Athena during the connection. These details must be added as Key-Value pairs.
{% /codeInfo %}

{% codeInfo srNumber=7 %}
**Connection Arguments (Optional)**: Enter the details for any additional connection arguments such as security or protocol configs that can be sent to Athena during the connection. These details must be added as Key-Value pairs.
- In case you are using Single-Sign-On (SSO) for authentication, add the `authenticator` details in the Connection Arguments as a Key-Value pair as follows: `"authenticator" : "sso_login_url"`
- In case you authenticate with SSO using an external browser popup, then add the `authenticator` details in the Connection Arguments as a Key-Value pair as follows: `"authenticator" : "externalbrowser"`
{% /codeInfo %}

{% /codeInfoContainer %}

{% codeBlock fileName="azuresql.yaml" %}

```yaml
source:
  type: azuresql
  serviceName: local_azuresql
  serviceConnection:
    config:
      type: AzureSQL
```

```yaml {% srNumber=1 %}
      username: username
```
```yaml {% srNumber=2 %}
      password: password
```
```yaml {% srNumber=3 %}
      hostPort: hostPort
```
```yaml {% srNumber=4 %}
      database: database_name
```
```yaml {% srNumber=5 %}
     # driver: ODBC Driver 18 for SQL Server (default)
```
```yaml {% srNumber=6 %}
      # connectionOptions:
        # key: Value
```
```yaml {% srNumber=7 %}
      # connectionArguments:
        # authenticator: externalbrowser
```

```yaml {% srNumber=8 %}
      sourceConfig:
        config:
          type: DatabaseMetadata
          markDeletedTables: true
          includeTables: true
          includeViews: true
          # includeTags: true
          # databaseFilterPattern:
          #   includes:
          #     - database1
          #     - database2
          #   excludes:
          #     - database3
          #     - database4
          # schemaFilterPattern:
          #   includes:
          #     - schema1
          #     - schema2
          #   excludes:
          #     - schema3
          #     - schema4
          # tableFilterPattern:
          #   includes:
          #     - users
          #     - type_test
          #   excludes:
          #     - table3
          #     - table4
```

```yaml {% srNumber=9 %}
sink:
  type: metadata-rest
  config: {}
```
```yaml {% srNumber=10 %}
workflowConfig:
  openMetadataServerConfig:
    hostPort: "http://localhost:8585/api"
    authProvider: openmetadata
    securityConfig:
      jwtToken: "{bot_jwt_token}"
```

{% /codeBlock %}

{% /codePreview %}


### Workflow Configs for Security Provider

We support different security providers. You can find their definitions [here](https://github.com/open-metadata/OpenMetadata/tree/main/openmetadata-spec/src/main/resources/json/schema/security/client).

#### Openmetadata JWT Auth

```yaml
workflowConfig:
  openMetadataServerConfig:
    hostPort: "http://localhost:8585/api"
    authProvider: openmetadata
    securityConfig:
      jwtToken: "{bot_jwt_token}"
```
- To enable JWT Tokens, you wll get more details [here](/deployment/security/enable-jwt-tokens).
  
- If any issue regarding JWT Tokens, can checkout this [troubleshoot](/deployment/security/jwt-troubleshooting).

- For other security providers please visit [this](/deployment/security/jwt-troubleshooting).


### 2. Prepare the Ingestion DAG

Create a Python file in your Airflow DAGs directory with the following contents:

{% codePreview %}

{% codeInfoContainer %}

#### Import necessary modules

{% codeInfo srNumber=1 %}

- **yaml**: A Python package that can load YAML files and convert them into Python objects.

- **timedelta**: A class from the `datetime` module used to represent a duration of time.

- **DAG**: A class from the `airflow` module used to define an Airflow DAG.

- **PythonOperator**: A class from the `airflow.operators.python` or `airflow.operators.python_operator` module used to define a task in an Airflow DAG that runs a Python function.

- **days_ago**: A function from the `airflow.utils.dates` module used to calculate a datetime that is a certain number of days ago.

- **Workflow**: A class that represents an OpenMetadata ingestion workflow.

The `try-except` block is used to handle the case where the `PythonOperator` is located in different modules in different versions of Airflow. In older versions of Airflow, the `PythonOperator` is located in the `airflow.operators.python_operator` module, while in newer versions, it is located in the `airflow.operators.python` module.

{% /codeInfo %}

{% codeInfo srNumber=2 %}
Default arguments for all tasks in the Airflow DAG.

- **"owner": "user_name"**: Specifies the owner of the DAG. This is typically the name of the person or team responsible for maintaining the DAG.

- **"email_on_failure": False**: Specifies whether email notifications should be sent in case of a task failure. In this case, email notifications are turned off (`False`).

- **""retries": 3"**: Specifies the number of times a task should be retried in case of failure. If a task fails, it will be retried up to three times before being marked as failed.

- **"retry_delay": timedelta(minutes=5)"**: Specifies the delay between task retries. In this case, the delay is set to 5 minutes.

- **"execution_timeout": timedelta(minutes=60)"**: Specifies the maximum duration of time that a task should run for. If a task exceeds this duration, it will be marked as failed.
{% /codeInfo %}

{% codeInfo srNumber=3 %}
- **config**: Specifies config for the profiler as we prepare above.
{% /codeInfo %}

{% codeInfo srNumber=4 %}
- **metadata_ingestion_workflow()**: This code defines a function `metadata_ingestion_workflow()` that loads a YAML configuration, creates a `Workflow` object, executes the workflow, checks its status, prints the status to the console, and stops the workflow.
{% /codeInfo %}

{% codeInfo srNumber=5 %}
- **DAG**:  The DAG is created using the default arguments defined in the `default_args` dictionary. The DAG is set to start one day ago, is not paused upon creation, runs every 5 minutes using the cron syntax '*/5 * * * *', and does not catch up on any missed runs.

The DAG contains a single task called "ingest_using_recipe", which is created using the `PythonOperator` class. The `metadata_ingestion_workflow` function is set as the callable to be executed when this task is run.
{% /codeInfo %}

Note that from connector to connector, this recipe will always be the same.
By updating the YAML configuration, you will be able to extract metadata from different sources.
{% /codeInfoContainer %}

{% codeBlock fileName="azuresql.py" %}

```python {% srNumber=1 %}
import pathlib
import yaml
from datetime import timedelta
from airflow import DAG

try:
    from airflow.operators.python import PythonOperator
except ModuleNotFoundError:
    from airflow.operators.python_operator import PythonOperator

from metadata.config.common import load_config_file
from metadata.ingestion.api.workflow import Workflow
from airflow.utils.dates import days_ago
```

```python {% srNumber=2 %}
default_args = {
    "owner": "user_name",
    "email": ["username@org.com"],
    "email_on_failure": False,
    "retries": 3,
    "retry_delay": timedelta(minutes=5),
    "execution_timeout": timedelta(minutes=60)
}
```

```python {% srNumber=3 %}
config = """
<your YAML configuration>
"""
```

```python {% srNumber=4 %}
def metadata_ingestion_workflow():
    workflow_config = yaml.safe_load(config)
    workflow = Workflow.create(workflow_config)
    workflow.execute()
    workflow.raise_from_status()
    workflow.print_status()
    workflow.stop()
```

```python {% srNumber=5 %}
with DAG(
    "sample_data",
    default_args=default_args,
    description="An example DAG which runs a OpenMetadata ingestion workflow",
    start_date=days_ago(1),
    is_paused_upon_creation=False,
    schedule_interval='*/5 * * * *',
    catchup=False,
) as dag:
    ingest_task = PythonOperator(
        task_id="ingest_using_recipe",
        python_callable=metadata_ingestion_workflow,
    )
```

{% /codeBlock %}
{% /codePreview %}


## Data Profiler

The Data Profiler workflow will be using the `orm-profiler` processor.
After running a Metadata Ingestion workflow, we can run Data Profiler workflow.
While the `serviceName` will be the same to that was used in Metadata Ingestion, so the ingestion bot can get the `serviceConnection` details from the server.


### 1. Define the YAML Config

This is a sample config for the profiler:
#### Source Configuration - Source Config

{% codePreview %}

{% codeInfoContainer %}

{% codeInfo srNumber=1 %}
**generateSampleData**: Option to turn on/off generating sample data.
{% /codeInfo %}

{% codeInfo srNumber=2 %}
**profileSample**: Percentage of data or no. of rows we want to execute the profiler and tests on.
{% /codeInfo %}

{% codeInfo srNumber=3 %}
**threadCount**: Number of threads to use during metric computations.
{% /codeInfo %}

{% codeInfo srNumber=4 %}
**processPiiSensitive**: Optional configuration to automatically tag columns that might contain sensitive information.
{% /codeInfo %}

{% codeInfo srNumber=5 %}
**confidence**: Set the Confidence value for which you want the column to be marked
{% /codeInfo %}


{% codeInfo srNumber=6 %}
**timeoutSeconds**: Profiler Timeout in Seconds
{% /codeInfo %}

{% codeInfo srNumber=7 %}
**databaseFilterPattern**: Regex to only fetch databases that matches the pattern.
{% /codeInfo %}

{% codeInfo srNumber=8 %}
**schemaFilterPattern**: Regex to only fetch tables or databases that matches the pattern.
{% /codeInfo %}

{% codeInfo srNumber=9 %}
**tableFilterPattern**: Regex to only fetch tables or databases that matches the pattern.
{% /codeInfo %}


{% codeInfo srNumber=10 %}
#### Processor Configuration

Choose the `orm-profiler`. Its config can also be updated to define tests from the YAML itself instead of the UI:

**tableConfig**: `tableConfig` allows you to set up some configuration at the table level.
{% /codeInfo %}


{% codeInfo srNumber=11 %}
#### Sink Configuration

To send the metadata to OpenMetadata, it needs to be specified as `type: metadata-rest`.
{% /codeInfo %}


{% codeInfo srNumber=12 %}

#### Workflow Configuration

The main property here is the `openMetadataServerConfig`, where you can define the host and security provider of your OpenMetadata installation.

For a simple, local installation using our docker containers, this looks like:
{% /codeInfo %}


{% /codeInfoContainer %}

{% codeBlock fileName="azuresql.yaml" %}


```yaml
source:
  type: azuresql
  serviceName: local_azuresql
  sourceConfig:
    config:
      type: Profiler
```

```yaml {% srNumber=1 %}
      generateSampleData: true
```
```yaml {% srNumber=2 %}
      # profileSample: 85
```
```yaml {% srNumber=3 %}
      # threadCount: 5
```
```yaml {% srNumber=4 %}
      processPiiSensitive: false
```
```yaml {% srNumber=5 %}
      # confidence: 80
```
```yaml {% srNumber=6 %}
      # timeoutSeconds: 43200
```
```yaml {% srNumber=7 %}
      # databaseFilterPattern:
      #   includes:
      #     - database1
      #     - database2
      #   excludes:
      #     - database3
      #     - database4
```
```yaml {% srNumber=8 %}
      # schemaFilterPattern:
      #   includes:
      #     - schema1
      #     - schema2
      #   excludes:
      #     - schema3
      #     - schema4
```
```yaml {% srNumber=9 %}
      # tableFilterPattern:
      #   includes:
      #     - table1
      #     - table2
      #   excludes:
      #     - table3
      #     - table4
```
```yaml {% srNumber=10 %}
processor:
  type: orm-profiler
  config: {}  # Remove braces if adding properties
    # tableConfig:
    #   - fullyQualifiedName: <table fqn>
    #     profileSample: <number between 0 and 99> # default 

    #     profileSample: <number between 0 and 99> # default will be 100 if omitted
    #     profileQuery: <query to use for sampling data for the profiler>
    #     columnConfig:
    #       excludeColumns:
    #         - <column name>
    #       includeColumns:
    #         - columnName: <column name>
    #         - metrics:
    #           - MEAN
    #           - MEDIAN
    #           - ...
    #     partitionConfig:
    #       enablePartitioning: <set to true to use partitioning>
    #       partitionColumnName: <partition column name. Must be a timestamp or datetime/date field type>
    #       partitionInterval: <partition interval>
    #       partitionIntervalUnit: <YEAR, MONTH, DAY, HOUR>

```
```yaml {% srNumber=11 %}
sink:
  type: metadata-rest
  config: {}
```
```yaml {% srNumber=12 %}
workflowConfig:
  # loggerLevel: DEBUG  # DEBUG, INFO, WARN or ERROR
  openMetadataServerConfig:
    hostPort: <OpenMetadata host and port>
    authProvider: <OpenMetadata auth provider>
```

{% /codeBlock %}

{% /codePreview %}




### 2. Prepare the Profiler DAG

Here, we follow a similar approach as with the metadata and usage pipelines, although we will use a different Workflow class:




{% codePreview %}

{% codeInfoContainer %}
#### Import necessary modules

{% codeInfo srNumber=1 %}
This code imports the necessary modules and packages to define an Airflow DAG and execute a `ProfilerWorkflow` using the `PythonOperator`.

- **yaml**: A Python package that can load YAML files and convert them into Python objects.

- **timedelta**: A class from the `datetime` module used to represent a duration of time.

- **DAG**: A class from the `airflow` module used to define an Airflow DAG.

- **PythonOperator**: A class from the `airflow.operators.python` or `airflow.operators.python_operator` module used to define a task in an Airflow DAG that runs a Python function.

- **days_ago**: A function from the `airflow.utils.dates` module used to calculate a datetime that is a certain number of days ago.

- **ProfilerWorkflow**: A class from the `metadata.orm_profiler.api.workflow` module that represents an OpenMetadata Profiler workflow.

The `try-except` block is used to handle the case where the `PythonOperator` is located in different modules in different versions of Airflow. In older versions of Airflow, the `PythonOperator` is located in the `airflow.operators.python_operator` module, while in newer versions, it is located in the `airflow.operators.python` module.

{% /codeInfo %}

{% codeInfo srNumber=2 %}
Default arguments for all tasks in the Airflow DAG.

- **"owner": "user_name"**: Specifies the owner of the DAG. This is typically the name of the person or team responsible for maintaining the DAG.

- **"email_on_failure": False**: Specifies whether email notifications should be sent in case of a task failure. In this case, email notifications are turned off (`False`).

- **""retries": 3"**: Specifies the number of times a task should be retried in case of failure. If a task fails, it will be retried up to three times before being marked as failed.

- **"retry_delay": timedelta(seconds=10)"**: Specifies the delay between task retries. In this case, the delay is set to 10 seconds.

- **"execution_timeout": timedelta(minutes=60)"**: Specifies the maximum duration of time that a task should run for. If a task exceeds this duration, it will be marked as failed.

{% /codeInfo %}


{% codeInfo srNumber=3 %}
- **config**: Specifies config for the profiler as we prepare above.
{% /codeInfo %}

{% codeInfo srNumber=4 %}
- **metadata_ingestion_workflow()**: This code defines a function `metadata_ingestion_workflow()` that loads a YAML configuration, creates a `ProfilerWorkflow` object, executes the workflow, checks its status, prints the status to the console, and stops the workflow.
{% /codeInfo %}

{% codeInfo srNumber=5 %}
- **DAG**: Here DAG called `profiler_example` that runs a metadata ingestion workflow using the `PythonOperator`. The DAG has default arguments, a start date of one day ago, and is not paused or set to catch up on missed schedules. The `PythonOperator` calls the `metadata_ingestion_workflow()` function to execute the workflow.
{% /codeInfo %}



{% /codeInfoContainer %}

{% codeBlock fileName="azuresql.py" %}

```python {% srNumber=1 %}
import yaml
from datetime import timedelta

from airflow import DAG

try:
   from airflow.operators.python import PythonOperator
except ModuleNotFoundError:
   from airflow.operators.python_operator import PythonOperator

from airflow.utils.dates import days_ago

from metadata.orm_profiler.api.workflow import ProfilerWorkflow
```

```python {% srNumber=2 %}
default_args = {
   "owner": "user_name",
   "email_on_failure": False,
   "retries": 3,
   "retry_delay": timedelta(seconds=10),
   "execution_timeout": timedelta(minutes=60),
}
```

```python {% srNumber=3 %}
config = """
<your YAML configuration>
"""
```

```python {% srNumber=4 %}
def metadata_ingestion_workflow():
   workflow_config = yaml.safe_load(config)
   workflow = ProfilerWorkflow.create(workflow_config)
   workflow.execute()
   workflow.raise_from_status()
   workflow.print_status()
   workflow.stop()
```

```python {% srNumber=5 %}
with DAG(
   "profiler_example",
   default_args=default_args,
   description="An example DAG which runs a OpenMetadata ingestion workflow",
   start_date=days_ago(1),
   is_paused_upon_creation=False,
   catchup=False,
) as dag:
   ingest_task = PythonOperator(
       task_id="profile_and_test_using_recipe",
       python_callable=metadata_ingestion_workflow,
   )
```

{% /codeBlock %}

{% /codePreview %}


## dbt Integration

{% tilesContainer %}

{% tile
  icon="mediation"
  title="dbt Integration"
  description="Learn more about how to ingest dbt models' definitions and their lineage."
  link="/connectors/ingestion/workflows/dbt" /%}

{% /tilesContainer %}

## Related

{% tilesContainer %}

{% tile
    title="Ingest with the CLI"
    description="Run a one-time ingestion using the metadata CLI"
    link="/connectors/database/azuresql/cli"
  / %}

{% /tilesContainer %}
