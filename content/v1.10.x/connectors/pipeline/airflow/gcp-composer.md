---
title: Extract Metadata from GCP Composer 
slug: /connectors/pipeline/airflow/gcp-composer
---

# Extract Metadata from GCP Composer 

## Requirements

This approach has been last tested against:
- Composer version 2.15.2
- Airflow version 2.10.5

There are 2 main approaches we can follow here to extract metadata from GCS. Both of them involve creating a DAG
directly in your Composer instance, but the requirements and the steps to follow are going to be slightly different.

Feel free to choose whatever approach adapts best to your current architecture and constraints.

## Using the Python Operator

The most comfortable way to extract metadata out of GCP Composer  is by directly creating a DAG in there
that will handle the connection to the metadata database automatically and push the contents
to your OpenMetadata server.

The drawback here? You need to install `openmetadata-ingestion` directly on the host. This might have some
incompatibilities with your current Python environment and/or the internal (and changing) Composer requirements.
In any case, once the requirements are there, preparing the DAG is super straight-forward.

### Install the Requirements

In your environment you will need to install the following packages:

- `openmetadata-ingestion==x.y.z`, (e.g., `openmetadata-ingestion==1.10.4`).
- `sqlalchemy==1.4.54`: This is needed to align OpenMetadata version with the Composer internal requirements.

**Note:** Make sure to use the `openmetadata-ingestion` version that matches the server version
you currently have!

### Prepare the DAG!

Note that this DAG is a usual connector DAG, just using the Airflow service with the `Backend` connection.

As an example of a DAG pushing data to OpenMetadata under Google SSO, we could have:

```python
"""
This DAG can be used directly in your Airflow instance after installing
the `openmetadata-ingestion` package. Its purpose
is to connect to the underlying database, retrieve the information
and push it to OpenMetadata.
"""
from datetime import timedelta

import yaml
from airflow import DAG

try:
    from airflow.operators.python import PythonOperator
except ModuleNotFoundError:
    from airflow.operators.python_operator import PythonOperator

from airflow.utils.dates import days_ago

from metadata.workflow.metadata import MetadataWorkflow

 

default_args = {
    "owner": "user_name",
    "email": ["username@org.com"],
    "email_on_failure": False,
    "retries": 3,
    "retry_delay": timedelta(minutes=5),
    "execution_timeout": timedelta(minutes=60),
}

config = """
source:
  type: airflow
  serviceName: airflow_gcp_composer
  serviceConnection:
    config:
      type: Airflow
      hostPort: http://localhost:8080
      numberOfStatus: 10
      connection:
        type: Backend
  sourceConfig:
    config:
      type: PipelineMetadata
sink:
  type: metadata-rest
  config: {}
workflowConfig:
  loggerLevel: INFO
  openMetadataServerConfig:
    hostPort: https://sandbox.getcollate.io/api
    authProvider: google
    securityConfig:
      secretKey: /home/airflow/gcp/data/gcp_creds_beta.json
"""


def metadata_ingestion_workflow():
    workflow_config = yaml.safe_load(config)
    workflow = MetadataWorkflow.create(workflow_config)
    workflow.execute()
    workflow.raise_from_status()
    workflow.print_status()
    workflow.stop()


with DAG(
    "airflow_metadata_extraction",
    default_args=default_args,
    description="An example DAG which pushes Airflow data to OM",
    start_date=days_ago(1),
    is_paused_upon_creation=True,
    schedule_interval="*/5 * * * *",
    catchup=False,
) as dag:
    ingest_task = PythonOperator(
        task_id="ingest_using_recipe",
        python_callable=metadata_ingestion_workflow,
    )
```

## Using the Kubernetes Pod Operator

In this second approach we won't need to install absolutely anything to the GCP Composer  environment. Instead,
we will rely on the `KubernetesPodOperator` to use the underlying k8s cluster of Composer.

Then, the code won't directly run using the hosts' environment, but rather inside a container that we created
with only the `openmetadata-ingestion` package.

### Requirements

#### 1. Get Database Credentials

You need to obtain the connection details for the underlying Composer's database. You can follow the official GCS
[docs](https://cloud.google.com/composer/docs/composer-2/access-airflow-database) for manual steps.

**Alternative Automated Approach:**

Create and run a DAG in your Composer environment to automatically extract the database credentials:

```python
import logging
from datetime import timedelta
from urllib.parse import urlparse
import base64

from airflow import DAG

try:
    from airflow.operators.python import PythonOperator
except ModuleNotFoundError:
    from airflow.operators.python_operator import PythonOperator

from airflow.utils.dates import days_ago
from airflow.configuration import conf

default_args = {
    "owner": "your_name",
    "email": ["your_email@example.com"],
    "email_on_failure": False,
    "retries": 0,
    "retry_delay": timedelta(minutes=5),
    "execution_timeout": timedelta(minutes=60),
}

def get_database_config():
    logging.info("=" * 80)
    logging.info("DATABASE CONNECTION DETAILS")
    logging.info("=" * 80)

    sqlalchemy_conn = conf.get("core", "sql_alchemy_conn", fallback=None)

    if sqlalchemy_conn:
        logging.info(f"\nFull Connection String:\n{sqlalchemy_conn}\n")

        try:
            parsed = urlparse(sqlalchemy_conn)

            logging.info("Parsed Connection Details:")
            logging.info(f"  Database Type: {parsed.scheme}")
            logging.info(f"  Username: {parsed.username}")

            if parsed.password:
                pwd_encoded = base64.b64encode(parsed.password.encode()).decode()
                logging.info(f"  Password (base64 encoded): {pwd_encoded}")
            else:
                logging.info("  Password: None")

            logging.info(f"  Host: {parsed.hostname}")
            logging.info(f"  Port: {parsed.port}")
            logging.info(f"  Database Name: {parsed.path.lstrip('/')}")

            if parsed.query:
                logging.info(f"  Query Parameters: {parsed.query}")

        except Exception as e:
            logging.error(f"Error parsing connection string: {e}")
    else:
        logging.warning("No SQL Alchemy connection string found")

    logging.info("=" * 80)

with DAG(
    "get_airflow_database_config",
    default_args=default_args,
    description="Extract Airflow database configuration",
    start_date=days_ago(1),
    is_paused_upon_creation=True,
    schedule_interval="@once",
    catchup=False,
) as dag:
    extract_config = PythonOperator(
        task_id="extract_db_config",
        python_callable=get_database_config,
    )
```

Upload this DAG to your Composer environment and run it. The logs will show the parsed connection details.

**Note:** The password is displayed using encoding methods (base64) to bypass Airflow's automatic password masking in logs. You can decode this password using a Base64 decoder.

Example output format:
```
Database Type: postgresql+psycopg2
Username: root
Password (base64 encoded): base64_encoded_password
Host: airflow-sqlproxy-service.composer-system.svc.cluster.local
Port: 3306
Database Name: composer-2-15-2-airflow-2-10-5-d07e4986
```

#### 2. Get Composer Namespace

You need to identify your Composer environment's Kubernetes namespace. The namespace is typically the same as the **Database Name** from Step 1.

**Alternative:** You can also find it via GCP Cloud Shell:

```bash
# Set your variables
COMPOSER_ENV_NAME="your-composer-env-name"
REGION="your-region"
PROJECT_ID="your-project-id"

# Get your Composer environment's GKE cluster details
CLUSTER_FULL_PATH=$(gcloud composer environments describe $COMPOSER_ENV_NAME \
  --location $REGION \
  --format="get(config.gkeCluster)")

# Extract cluster name and zone from the full path
# Full path format: projects/{project}/zones/{zone}/clusters/{cluster}
ZONE=$(echo $CLUSTER_FULL_PATH | cut -d'/' -f4)
CLUSTER_NAME=$(echo $CLUSTER_FULL_PATH | cut -d'/' -f6)

echo "Cluster Name: $CLUSTER_NAME"
echo "Zone: $ZONE"

# Connect to the cluster
gcloud container clusters get-credentials $CLUSTER_NAME \
  --zone $ZONE \
  --project $PROJECT_ID

# List namespaces to find the Composer namespace (usually starts with composer-)
kubectl get namespaces | grep composer
```

The namespace typically follows the pattern: `composer-X-X-X-airflow-X-X-X-XXXXXXXX`

Example: `composer-2-15-2-airflow-2-10-5-d07e4986`

#### 3. Setup Kubernetes RBAC Permissions

The KubernetesPodOperator requires specific permissions to create and manage pods. Run these commands in GCP Cloud Shell:

```bash
# Set your Composer namespace (same as Database Name from Step 1)
NAMESPACE="<your-composer-namespace>"  # e.g., composer-2-15-2-airflow-2-10-5-d07e4986

# Create a role with pod and events permissions
kubectl create role pod-manager \
  --verb=get,list,watch,create,delete,patch,update \
  --resource=pods,pods/log,pods/status,events \
  -n $NAMESPACE

# Bind the role to the default service account
kubectl create rolebinding default-pod-manager \
  --role=pod-manager \
  --serviceaccount=$NAMESPACE:default \
  -n $NAMESPACE
```

**Note:** This step is required because the Kubernetes service account needs explicit permissions to manage pods within the namespace.

#### 4. Configure Airflow Connection

As GCP Composer uses Postgres for the backend database, use the values from Step 1 to configure the Airflow connection:

```yaml
connection:
  type: Postgres
  username: <username_from_step_1>          # e.g., root
  authType:
    password: <password_from_step_1>        # Actual password from decoded output
  hostPort: <host_and_port_from_step_1>    # e.g., airflow-sqlproxy-service.composer-system.svc.cluster.local:3306
  database: <database_name_from_step_1>    # e.g., composer-2-15-2-airflow-2-10-5-d07e4986
```

For more information on how to shape the YAML describing the Airflow metadata extraction, you can refer
[here](https://docs.getcollate.io/connectors/pipeline/airflow/yaml#1.-define-the-yaml-config#1-define-the-yaml-config).


### Prepare the DAG!

Replace the placeholder values below with your actual configuration from the previous steps:

```python
from datetime import datetime

from airflow import models
from airflow.providers.cncf.kubernetes.operators.pod import KubernetesPodOperator
from kubernetes.client import models as k8s_models


config = """
source:
  type: airflow
  serviceName: airflow_gcp_composer_k8s_op
  serviceConnection:
    config:
      type: Airflow
      hostPort: http://localhost:8080
      numberOfStatus: 10
      connection:
        type: Postgres
        username: <username_from_step_1>
        authType:
          password: <password_from_step_1>
        hostPort: <host_and_port_from_step_1>
        database: <database_name_from_step_1>
  sourceConfig:
    config:
      type: PipelineMetadata
sink:
  type: metadata-rest
  config: {}
workflowConfig:
  openMetadataServerConfig:
    hostPort: <your_openmetadata_server_url>
    enableVersionValidation: false
    authProvider: openmetadata
    securityConfig:
      jwtToken: <your_jwt_token>
"""


with models.DAG(
    "ingestion-k8s-operator",
    schedule_interval="@once",
    start_date=datetime(2021, 1, 1),
    catchup=False,
    tags=["OpenMetadata"],
) as dag:
    KubernetesPodOperator(
        task_id="ingest",
        name="ingest",
        cmds=["python", "main.py"],
        image="openmetadata/ingestion-base:<version>",  # Match your OpenMetadata server version
        namespace="<namespace_from_step_2>",            # Same as database name
        container_resources=k8s_models.V1ResourceRequirements(
            requests={"memory": "256Mi", "cpu": "100m"},
            limits={"memory": "512Mi", "cpu": "250m"},
        ),
        env_vars={"config": config, "pipelineType": "metadata"},
        dag=dag,
    )
```

**Note:** If you encounter an `ImportError` for `KubernetesPodOperator`, you may need to install the Kubernetes provider package in your Composer environment:
```bash
apache-airflow-providers-cncf-kubernetes
```

### Important Configuration Notes

#### 1. Task Configuration
- **task_id** and **name**: Can be customized to your preference
- **cmds**: Must be `["python", "main.py"]` - do not change this
- **env_vars**: Must contain `{"config": config, "pipelineType": "metadata"}` - the script relies on these exact keys

#### 2. Image Version
The image version **must match your OpenMetadata server version**. For example:
- OpenMetadata Server 1.10.4 → use `openmetadata/ingestion-base:1.10.4`
- OpenMetadata Server 1.9.x → use `openmetadata/ingestion-base:1.9.x`

#### 3. Resource Requirements
GKE Autopilot (used by Composer 2.x) requires resource specifications:
```python
container_resources=k8s_models.V1ResourceRequirements(
    requests={"memory": "256Mi", "cpu": "100m"},
    limits={"memory": "512Mi", "cpu": "250m"},
)
```

You may need to adjust these based on your ingestion workload size.

### Additional Resources

You can find more information about the `KubernetesPodOperator` and how to tune its configurations
[here](https://cloud.google.com/composer/docs/how-to/using/using-kubernetes-pod-operator).

For RBAC troubleshooting, refer to the [Kubernetes RBAC documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).

# OpenMetadata Server Config

The easiest approach here is to generate a bot with a **JWT** token directly from the OpenMetadata UI. You can then use
the following workflow config:

```yaml
workflowConfig:
  openMetadataServerConfig:
    hostPort: http://localhost:8585/api
    authProvider: openmetadata
    securityConfig:
       jwtToken: <JWT>
```
