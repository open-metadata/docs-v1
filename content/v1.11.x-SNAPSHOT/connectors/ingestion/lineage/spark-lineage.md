---
title: Spark Lineage Ingestion
slug: /connectors/ingestion/lineage/spark-lineage
---

# Spark Lineage Ingestion

A spark job may involve movement/transfer of data which may result into a data lineage, to capture such lineages you can make use of `OpenMetadata Spark Agent` which you can configure with your spark session and capture these spark lineages into your OpenMetadata instance.

In this guide we will explain how you can make use of the `OpenMetadata Spark Agent` to capture such lineage.

- [System Requirements](#system-requirements)
- [Requirements](#requirements)
- [Configuration Methods](#configuration-methods)
  - [Method 1: Inline SparkSession Configuration](#method-1-inline-sparksession-configuration)
  - [Method 2: Using spark-submit](#method-2-using-spark-submit)
  - [Method 3: Using spark-defaults.conf](#method-3-using-spark-defaultsconf)
  - [Method 4: Using Environment Variables](#method-4-using-environment-variables)
  - [Method 5: Scala Configuration](#method-5-scala-configuration)
- [Configuration Parameters Reference](#configuration-parameters-reference)
- [Additional Examples](#additional-examples)
- [Using Spark Agent with Databricks](#using-spark-agent-with-databricks)
- [Using Spark Agent with Glue](#using-spark-agent-with-glue)
- [Deployment on Different Platforms](#deployment-on-different-platforms)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

## System Requirements

Before setting up Spark lineage ingestion, ensure your environment meets the following requirements:

**Software Requirements:**
- **Spark Version:** 3.1 or higher (3.3+ recommended for best compatibility)
- **Java:** Version 8 or higher
- **Python:** 3.8+ (for PySpark jobs)
- **Scala:** 2.12+ (for Scala Spark jobs)
- **OpenMetadata:** Version 1.0.0 or higher

**Hardware Requirements:**
- **Memory:** 8GB minimum (16GB recommended for production workloads)
- **Storage:** 10GB+ free space for JARs and temporary files
- **Network:** Connectivity between Spark cluster and OpenMetadata server

**Compatibility Matrix:**

| Spark Version | OpenMetadata Agent | Support Status |
|---------------|-------------------|----------------|
| 3.5.x         | Latest            | ✅ Fully Tested |
| 3.4.x         | Latest            | ✅ Fully Tested |
| 3.3.x         | Latest            | ✅ Supported |
| 3.2.x         | Latest            | ✅ Supported |
| 3.1.x         | Latest            | ⚠️ Limited Testing |
| 3.0.x or lower| Latest            | ❌ Not Supported |

## Requirement

To use the `OpenMetadata Spark Agent`, you will have to download the latest jar from [here](https://github.com/open-metadata/openmetadata-spark-agent/releases).

We support spark version 3.1 and above.


## Configuration Methods

OpenMetadata Spark Agent can be configured using multiple approaches depending on your deployment environment and requirements. This section covers all available configuration methods.

### Method 1: Inline SparkSession Configuration

This method is ideal for development, testing, or when you need job-specific configurations. Configure the agent directly in your PySpark code:


{% codePreview %}

{% codeInfoContainer %}

{% codeInfo srNumber=1 %}

Once you have downloaded the jar from [here](https://github.com/open-metadata/openmetadata-spark-agent/releases) in your spark configuration you will have to add the path to your `openmetadata-spark-agent.jar` along with other required jars to run your spark job, in this example it is `mysql-connector-java.jar`

{% /codeInfo %}



{% codeInfo srNumber=2 %}

`openmetadata-spark-agent.jar` comes with a custom spark listener i.e. `io.openlineage.spark.agent.OpenLineageSparkListener` you will need to add this as `extraListeners` spark configuration.

{% /codeInfo %}


{% codeInfo srNumber=3 %}

`spark.openmetadata.transport.hostPort`: Specify the host & port of the instance where your OpenMetadata is hosted.

{% /codeInfo %}

{% codeInfo srNumber=4 %}

`spark.openmetadata.transport.type` is required configuration with value as `openmetadata`.

{% /codeInfo %}


{% codeInfo srNumber=5 %}

`spark.openmetadata.transport.jwtToken`: Specify your OpenMetadata Jwt token here. Checkout [this](/deployment/security/enable-jwt-tokens#generate-token) documentation on how you can generate a jwt token in OpenMetadata.

{% /codeInfo %}


{% codeInfo srNumber=6 %}

`spark.openmetadata.transport.pipelineServiceName`: This spark job will be creating a new pipeline service of type `Spark`, use this configuration to customize the pipeline service name.

Note: If the pipeline service with the specified name already exists then we will be updating/using the same pipeline service.

{% /codeInfo %}

{% codeInfo srNumber=7 %}

`spark.openmetadata.transport.pipelineName`: This spark job will also create a new pipeline within the pipeline service defined above. Use this configuration to customize the name of pipeline.

Note: If the pipeline with the specified name already exists then we will be updating/using the same pipeline.

{% /codeInfo %}


{% codeInfo srNumber=8 %}

`spark.openmetadata.transport.pipelineSourceUrl`: You can use this configuration to provide additional context to your pipeline by specifying a url related to the pipeline.

{% /codeInfo %}

{% codeInfo srNumber=9 %}

`spark.openmetadata.transport.pipelineDescription`: Provide pipeline description using this spark configuration.

{% /codeInfo %}

{% codeInfo srNumber=10 %}

`spark.openmetadata.transport.databaseServiceNames`: Provide the comma separated list of database service names which contains the source tables used in this job. If you do not provide this configuration then we will be searching through all the services available in openmetadata.

{% /codeInfo %}


{% codeInfo srNumber=11 %}

`spark.openmetadata.transport.timeout`: Provide the timeout to communicate with OpenMetadata APIs.

{% /codeInfo %}

{% codeInfo srNumber=12 %}

In this job we are reading data from `employee` table and moving it to another table `employee_new` of within same mysql source.

{% /codeInfo %}

{% /codeInfoContainer %}

{% codeBlock fileName="pyspark.py" %}


```py {% isCodeBlock=true %}
from pyspark.sql import SparkSession

spark = (
    SparkSession.builder.master("local")
    .appName("localTestApp")
```
```py {% srNumber=1 %}
    .config(
        "spark.jars",
        "path/to/openmetadata-spark-agent.jar,path/to/mysql-connector-java-8.0.30.jar",
    )
```
```py {% srNumber=2 %}
    .config(
        "spark.extraListeners",
        "io.openlineage.spark.agent.OpenLineageSparkListener",
    )
```
```py {% srNumber=3 %}
    .config("spark.openmetadata.transport.hostPort", "http://localhost:8585")
```
```py {% srNumber=4 %}
    .config("spark.openmetadata.transport.type", "openmetadata")
```
```py {% srNumber=5 %}
    .config("spark.openmetadata.transport.jwtToken", "<openmetadata-jwt-token>")
```
```py {% srNumber=6 %}
    .config(
        "spark.openmetadata.transport.pipelineServiceName", "my_pipeline_service"
    )
```
```py {% srNumber=7 %}
    .config("spark.openmetadata.transport.pipelineName", "my_pipeline_name")
```
```py {% srNumber=8 %}
    .config(
        "spark.openmetadata.transport.pipelineSourceUrl",
        "http://your.org/path/to/pipeline",
    )
```
```py {% srNumber=9 %}
    .config(
        "spark.openmetadata.transport.pipelineDescription", "My ETL Pipeline"
    )
```
```py {% srNumber=10 %}
    .config(
        "spark.openmetadata.transport.databaseServiceNames",
        "random,local_mysql",
    )
```
```py {% srNumber=11 %}
    .config("spark.openmetadata.transport.timeout", "30")
```
```py {% srNumber=12 %}
    .getOrCreate()
)

# Read table using jdbc()

# Read from MySQL Table
employee_df = (
    spark.read.format("jdbc")
    .option("url", "jdbc:mysql://localhost:3306/openmetadata_db")
    .option("driver", "com.mysql.cj.jdbc.Driver")
    .option("dbtable", "employee")
    .option("user", "openmetadata_user")
    .option("password", "openmetadata_password")
    .load()
)

# Write data to the new employee_new table
(
    employee_df.write.format("jdbc")
    .option("url", "jdbc:mysql://localhost:3306/openmetadata_db")
    .option("driver", "com.mysql.cj.jdbc.Driver")
    .option("dbtable", "employee_new")
    .option("user", "openmetadata_user")
    .option("password", "openmetadata_password")
    .mode("overwrite")
    .save()
)

# Stop the Spark session
spark.stop()
```

{% /codeBlock %}

{% /codePreview %}


Once this pyspark job get finished you will see a new pipeline service with name `my_pipeline_service` generated in your openmetadata instance which would contain a pipeline with name `my_pipeline` as per the above example and you should also see lineage between the table `employee` and `employee_new` via `my_pipeline`.

### Method 2: Using spark-submit

For production deployments or when submitting jobs to a cluster, you can pass configurations via `spark-submit` command-line arguments. This approach is useful for YARN, Kubernetes, or standalone Spark clusters.

```bash
spark-submit \
  --master yarn \
  --deploy-mode cluster \
  --jars /path/to/openmetadata-spark-agent.jar,/path/to/mysql-connector-java-8.0.30.jar \
  --conf "spark.extraListeners=io.openlineage.spark.agent.OpenLineageSparkListener" \
  --conf "spark.openmetadata.transport.type=openmetadata" \
  --conf "spark.openmetadata.transport.hostPort=http://your-openmetadata-server:8585/api" \
  --conf "spark.openmetadata.transport.jwtToken=<your-jwt-token>" \
  --conf "spark.openmetadata.transport.pipelineServiceName=production_spark_service" \
  --conf "spark.openmetadata.transport.pipelineName=etl_pipeline" \
  --conf "spark.openmetadata.transport.timeout=30" \
  your_spark_job.py
```

**Benefits:**
- Centralized configuration management
- No code changes required in Spark jobs
- Easy to override configurations per job
- Works with any Spark deployment mode (client/cluster)

### Method 3: Using spark-defaults.conf

For cluster-wide persistent configuration, add the settings to `spark-defaults.conf` file. This is ideal when all jobs in your cluster should capture lineage.

**Location:** `$SPARK_HOME/conf/spark-defaults.conf`

```properties
# OpenMetadata Spark Agent Configuration
spark.jars                                        /path/to/openmetadata-spark-agent.jar
spark.extraListeners                              io.openlineage.spark.agent.OpenLineageSparkListener
spark.openmetadata.transport.type                 openmetadata
spark.openmetadata.transport.hostPort             http://your-openmetadata-server:8585/api
spark.openmetadata.transport.jwtToken             <your-jwt-token>
spark.openmetadata.transport.pipelineServiceName  default_spark_service
spark.openmetadata.transport.timeout              30
```

**Benefits:**
- Set once, applies to all Spark jobs
- No need to specify configurations in each job
- Simplifies job submission commands
- Ideal for shared Spark clusters

**Note:** Individual jobs can still override these settings using inline configuration or spark-submit arguments.

### Method 4: Using Environment Variables

Environment variables provide a flexible way to manage configurations, especially useful for containerized deployments or CI/CD pipelines.

```bash
# Set environment variables
export SPARK_JARS="/path/to/openmetadata-spark-agent.jar,/path/to/mysql-connector-java-8.0.30.jar"
export OPENMETADATA_HOST="http://your-openmetadata-server:8585/api"
export OPENMETADATA_JWT_TOKEN="<your-jwt-token>"
export PIPELINE_SERVICE_NAME="spark_service"
export PIPELINE_NAME="my_pipeline"

# Submit Spark job
spark-submit \
  --jars $SPARK_JARS \
  --conf "spark.extraListeners=io.openlineage.spark.agent.OpenLineageSparkListener" \
  --conf "spark.openmetadata.transport.type=openmetadata" \
  --conf "spark.openmetadata.transport.hostPort=$OPENMETADATA_HOST" \
  --conf "spark.openmetadata.transport.jwtToken=$OPENMETADATA_JWT_TOKEN" \
  --conf "spark.openmetadata.transport.pipelineServiceName=$PIPELINE_SERVICE_NAME" \
  --conf "spark.openmetadata.transport.pipelineName=$PIPELINE_NAME" \
  your_spark_job.py
```

**Benefits:**
- Sensitive credentials (JWT tokens) kept out of code
- Easy integration with secret management systems
- Environment-specific configurations (dev/staging/prod)
- Works well with Docker and Kubernetes

### Method 5: Scala Configuration

For Scala-based Spark applications, you can configure the agent similarly to PySpark:

```scala
import org.apache.spark.sql.SparkSession

val spark = SparkSession.builder()
  .appName("Scala Lineage Example")
  .master("local[*]")
  .config("spark.jars", "/path/to/openmetadata-spark-agent.jar,/path/to/mysql-connector-java-8.0.30.jar")
  .config("spark.extraListeners", "io.openlineage.spark.agent.OpenLineageSparkListener")
  .config("spark.openmetadata.transport.type", "openmetadata")
  .config("spark.openmetadata.transport.hostPort", "http://localhost:8585/api")
  .config("spark.openmetadata.transport.jwtToken", "<openmetadata-jwt-token>")
  .config("spark.openmetadata.transport.pipelineServiceName", "scala_pipeline_service")
  .config("spark.openmetadata.transport.pipelineName", "scala_pipeline")
  .config("spark.openmetadata.transport.timeout", "30")
  .getOrCreate()

// Read from MySQL
val employeeDF = spark.read
  .format("jdbc")
  .option("url", "jdbc:mysql://localhost:3306/openmetadata_db")
  .option("driver", "com.mysql.cj.jdbc.Driver")
  .option("dbtable", "employee")
  .option("user", "openmetadata_user")
  .option("password", "openmetadata_password")
  .load()

// Write to target table
employeeDF.write
  .format("jdbc")
  .option("url", "jdbc:mysql://localhost:3306/openmetadata_db")
  .option("driver", "com.mysql.cj.jdbc.Driver")
  .option("dbtable", "employee_new")
  .option("user", "openmetadata_user")
  .option("password", "openmetadata_password")
  .mode("overwrite")
  .save()

spark.stop()
```

## Configuration Parameters Reference

Below is a comprehensive reference of all available configuration parameters:

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `spark.extraListeners` | Yes | - | Must be set to `io.openlineage.spark.agent.OpenLineageSparkListener` |
| `spark.openmetadata.transport.type` | Yes | - | Must be set to `openmetadata` |
| `spark.openmetadata.transport.hostPort` | Yes | - | OpenMetadata server URL with `/api` suffix (e.g., `http://localhost:8585/api`) |
| `spark.openmetadata.transport.jwtToken` | Yes | - | JWT token for authentication. [Generate token](/deployment/security/enable-jwt-tokens#generate-token) |
| `spark.openmetadata.transport.pipelineServiceName` | No | `spark_service` | Name of the pipeline service to create/update |
| `spark.openmetadata.transport.pipelineName` | No | Job name | Name of the pipeline to create/update |
| `spark.openmetadata.transport.pipelineDescription` | No | - | Description for the pipeline |
| `spark.openmetadata.transport.pipelineSourceUrl` | No | - | URL linking to pipeline source (e.g., Git repository, Airflow DAG) |
| `spark.openmetadata.transport.databaseServiceNames` | No | All services | Comma-separated list of database services to search for tables |
| `spark.openmetadata.transport.timeout` | No | `30` | Timeout in seconds for OpenMetadata API calls |

**Advanced Parameters** (for debugging and troubleshooting):

| Parameter | Default | Description |
|-----------|---------|-------------|
| `spark.openmetadata.transport.debug` | `false` | Enable debug logging for troubleshooting |
| `spark.openmetadata.transport.includeInputs` | `true` | Include input datasets in lineage |
| `spark.openmetadata.transport.includeOutputs` | `true` | Include output datasets in lineage |

## Additional Examples

### Example 1: PostgreSQL Source and Target

```python
from pyspark.sql import SparkSession

spark = (
    SparkSession.builder
    .appName("PostgreSQL Lineage Example")
    .config("spark.jars", "/path/to/openmetadata-spark-agent.jar,/path/to/postgresql-42.5.0.jar")
    .config("spark.extraListeners", "io.openlineage.spark.agent.OpenLineageSparkListener")
    .config("spark.openmetadata.transport.type", "openmetadata")
    .config("spark.openmetadata.transport.hostPort", "http://localhost:8585/api")
    .config("spark.openmetadata.transport.jwtToken", "<jwt-token>")
    .config("spark.openmetadata.transport.pipelineServiceName", "postgres_pipeline_service")
    .config("spark.openmetadata.transport.pipelineName", "postgres_etl")
    .getOrCreate()
)

# Read from PostgreSQL
source_df = (
    spark.read.format("jdbc")
    .option("url", "jdbc:postgresql://localhost:5432/source_db")
    .option("driver", "org.postgresql.Driver")
    .option("dbtable", "public.customers")
    .option("user", "postgres")
    .option("password", "password")
    .load()
)

# Transform data
transformed_df = source_df.filter("status = 'active'").select("id", "name", "email")

# Write to PostgreSQL target
transformed_df.write.format("jdbc") \
    .option("url", "jdbc:postgresql://localhost:5432/target_db") \
    .option("driver", "org.postgresql.Driver") \
    .option("dbtable", "public.active_customers") \
    .option("user", "postgres") \
    .option("password", "password") \
    .mode("overwrite") \
    .save()

spark.stop()
```

### Example 2: Multi-Source ETL Pipeline

```python
from pyspark.sql import SparkSession

spark = (
    SparkSession.builder
    .appName("Multi-Source ETL")
    .config("spark.jars", "/path/to/openmetadata-spark-agent.jar,/path/to/mysql-connector.jar,/path/to/postgresql.jar")
    .config("spark.extraListeners", "io.openlineage.spark.agent.OpenLineageSparkListener")
    .config("spark.openmetadata.transport.type", "openmetadata")
    .config("spark.openmetadata.transport.hostPort", "http://localhost:8585/api")
    .config("spark.openmetadata.transport.jwtToken", "<jwt-token>")
    .config("spark.openmetadata.transport.pipelineServiceName", "multi_source_service")
    .config("spark.openmetadata.transport.pipelineName", "customer_orders_etl")
    .config("spark.openmetadata.transport.databaseServiceNames", "mysql_service,postgres_service")
    .getOrCreate()
)

# Read customers from MySQL
customers_df = (
    spark.read.format("jdbc")
    .option("url", "jdbc:mysql://localhost:3306/crm_db")
    .option("dbtable", "customers")
    .option("driver", "com.mysql.cj.jdbc.Driver")
    .option("user", "user")
    .option("password", "pass")
    .load()
)

# Read orders from PostgreSQL
orders_df = (
    spark.read.format("jdbc")
    .option("url", "jdbc:postgresql://localhost:5432/orders_db")
    .option("dbtable", "orders")
    .option("driver", "org.postgresql.Driver")
    .option("user", "user")
    .option("password", "pass")
    .load()
)

# Join and aggregate
result_df = customers_df.join(orders_df, "customer_id") \
    .groupBy("customer_id", "customer_name") \
    .agg({"order_amount": "sum"})

# Write to target database
result_df.write.format("jdbc") \
    .option("url", "jdbc:mysql://localhost:3306/analytics_db") \
    .option("dbtable", "customer_revenue") \
    .option("driver", "com.mysql.cj.jdbc.Driver") \
    .option("user", "user") \
    .option("password", "pass") \
    .mode("overwrite") \
    .save()

spark.stop()
```


{% image
  src="/images/v1.11/connectors/spark/spark-pipeline-service.png"
  alt="Spark Pipeline Service"
  caption="Spark Pipeline Service"
 /%}


 {% image
  src="/images/v1.11/connectors/spark/spark-pipeline-details.png"
  alt="Spark Pipeline Details"
  caption="Spark Pipeline Details"
 /%}



 {% image
  src="/images/v1.11/connectors/spark/spark-pipeline-lineage.png"
  alt="Spark Pipeline Lineage"
  caption="Spark Pipeline Lineage"
 /%}

## Using Spark Agent with Databricks

Follow the below steps in order to use OpenMetadata Spark Agent with databricks.

### 1. Upload the jar to compute cluster

To use the `OpenMetadata Spark Agent`, you will have to download the latest jar from [here](https://github.com/open-metadata/openmetadata-spark-agent/releases) and upload it to your databricks compute cluster.

To upload the jar you can visit the compute details page and then go to the libraries tab

{% image
  src="/images/v1.11/connectors/spark/spark-upload-jar.png"
  alt="Spark Upload Jar"
  caption="Spark Upload Jar"
 /%}

Click on the "Install Now" button and choose `dbfs` mode and upload the `OpenMetadata Spark Agent` jar.

{% image
  src="/images/v1.11/connectors/spark/spark-upload-jar-2.png"
  alt="Spark Upload Jar"
  caption="Spark Upload Jar"
 /%}

Once your jar is uploaded copy the path of the jar for the next steps.

{% image
  src="/images/v1.11/connectors/spark/spark-uploaded-jar.png"
  alt="Spark Upload Jar"
  caption="Spark Upload Jar"
 /%}


### 2. Create Initialization Script


Once your jar is uploaded you need to create a initialization script in your workspace.

```
#!/bin/bash

STAGE_DIR_JAR="<path to jar copied from step 1>"

echo "BEGIN: Upload Spark Listener JARs"
cp -f $STAGE_DIR_JAR /mnt/driver-daemon/jars || { echo "Error copying Spark Listener library file"; exit 1;}
echo "END: Upload Spark Listener JARs"

echo "BEGIN: Modify Spark config settings"
cat << 'EOF' > /databricks/driver/conf/openlineage-spark-driver-defaults.conf
[driver] {
  "spark.extraListeners" = "io.openlineage.spark.agent.OpenLineageSparkListener"
}
EOF
echo "END: Modify Spark config settings"
```

Note: The copied path would look like this `dbfs:/FileStore/jars/....` you need to modify it like `/dbfs/FileStore/jars/...` this.

{% image
  src="/images/v1.11/connectors/spark/prepare-script.png"
  alt="Prepare Script"
  caption="Prepare Script"
 /%}



### 3. Configure Initialization Script

Once you have created a initialization script, you will need to attach this script to your compute instance, to do that you can go to advanced config > init scripts and add your script path.

{% image
  src="/images/v1.11/connectors/spark/prepare-script.png"
  alt="Prepare Script"
  caption="Prepare Script"
 /%}


{% image
  src="/images/v1.11/connectors/spark/spark-init-script.png"
  alt="Spark Init Script"
  caption="Spark Init Script"
 /%}


### 4. Configure Spark

After configuring the init script, you will need to update the spark config as well.


{% image
  src="/images/v1.11/connectors/spark/spark-config-set.png"
  alt="Spark Set Config"
  caption="Spark Set Config"
 /%}

these are the possible configurations that you can do, please refer the `Configuration` section above to get the detailed information about the same. 

```
spark.extraListeners io.openlineage.spark.agent.OpenLineageSparkListener
spark.openmetadata.transport.type openmetadata
spark.openmetadata transport.pipelineSourceUrl http://<your-pipeline-host-port> 
spark.openmetadata transport.pipelineDescription "your pipeline description" 
spark.openmetadata.transport.hostPort https://<your-openmetadata-host-port> 
spark openmetadata transport.pipelineServiceName demo_pipeline 
spark.openmetadata transport.pipelineName demo_pipeline 
spark.openmetadata transport.databaseServiceNames db-service-name1,db-service-name2 
spark.openmetadata.transport.jwtToken <your-jwt-token> 
spark.openmetadata.transport.timeout 30
```

After all these steps are completed you can start/restart your compute instance and you are ready to extract the lineage from spark to OpenMetadata.


## Using Spark Agent with Glue

Follow the below steps in order to use OpenMetadata Spark Agent with glue.

### 1. Specify the OpenMetadata Spark Agent JAR URL

1. Upload the OpenMetadata Spark Agent Jar to S3
2. Navigate to the glue job,In the Job details tab, navigate to Advanced properties → Libraries → Dependent Jars path
3. Add the S3 url of OpenMetadata Spark Agent Jar in the Dependent Jars path.

{% image
  src="/images/v1.11/connectors/spark/glue-job-jar.png"
  alt="Glue Job Configure Jar"
  caption="Glue Job Configure Jar"
 /%}


### 2. Add Spark configuration in Job Parameters

In the same Job details tab, add a new property under Job parameters:

1. Add the `--conf` property with following value, make sure to customize this configuration as described in the above documentation.

```
spark.extraListeners=io.openlineage.spark.agent.OpenLineageSparkListener --conf spark.openmetadata.transport.hostPort=https://your-org.host:port  --conf spark.openmetadata.transport.type=openmetadata --conf spark.openmetadata.transport.jwtToken=<jwt-token> --conf spark.openmetadata.transport.pipelineServiceName=glue_spark_pipeline_service --conf spark.openmetadata.transport.pipelineName=glue_pipeline_name --conf spark.openmetadata.transport.timeout=30
```

2. Add the `--user-jars-first` parameter and set its value to `true`

{% image
  src="/images/v1.11/connectors/spark/glue-job-params.png"
  alt="Glue Job Configure Params"
  caption="Glue Job Configure Params"
 /%}

## Deployment on Different Platforms

### YARN Cluster Deployment

When deploying on YARN clusters, use the following approach to ensure the OpenMetadata Spark Agent is available on all executors:

**Method 1: Using spark-submit with YARN**

```bash
spark-submit \
  --master yarn \
  --deploy-mode cluster \
  --jars /path/to/openmetadata-spark-agent.jar \
  --files /path/to/mysql-connector-java-8.0.30.jar \
  --conf "spark.extraListeners=io.openlineage.spark.agent.OpenLineageSparkListener" \
  --conf "spark.openmetadata.transport.type=openmetadata" \
  --conf "spark.openmetadata.transport.hostPort=http://openmetadata:8585/api" \
  --conf "spark.openmetadata.transport.jwtToken=<jwt-token>" \
  --conf "spark.openmetadata.transport.pipelineServiceName=yarn_pipeline_service" \
  --conf "spark.yarn.dist.jars=/path/to/openmetadata-spark-agent.jar" \
  your_spark_job.py
```

**Method 2: YARN Client Mode**

```bash
spark-submit \
  --master yarn \
  --deploy-mode client \
  --jars /path/to/openmetadata-spark-agent.jar \
  --conf "spark.extraListeners=io.openlineage.spark.agent.OpenLineageSparkListener" \
  --conf "spark.openmetadata.transport.hostPort=http://openmetadata:8585/api" \
  --conf "spark.openmetadata.transport.jwtToken=<jwt-token>" \
  your_spark_job.py
```

**Important YARN Considerations:**
- Ensure the JAR is accessible from all YARN nodes
- Use HDFS to store JARs for better distribution: `hdfs://namenode:8020/user/spark/jars/openmetadata-spark-agent.jar`
- Configure proper resource allocation for the lineage agent overhead

### Kubernetes Deployment

For Kubernetes-based Spark deployments, you can use ConfigMaps and volume mounts:

**Step 1: Create ConfigMap for Spark Configuration**

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: spark-openmetadata-config
  namespace: spark
data:
  spark-defaults.conf: |
    spark.extraListeners io.openlineage.spark.agent.OpenLineageSparkListener
    spark.openmetadata.transport.type openmetadata
    spark.openmetadata.transport.hostPort http://openmetadata.default.svc.cluster.local:8585/api
    spark.openmetadata.transport.pipelineServiceName k8s_spark_service
    spark.openmetadata.transport.timeout 30
```

**Step 2: Submit Spark Job to Kubernetes**

```bash
spark-submit \
  --master k8s://https://kubernetes-api-server:6443 \
  --deploy-mode cluster \
  --name spark-lineage-job \
  --conf spark.executor.instances=2 \
  --conf spark.kubernetes.container.image=spark:3.4.0 \
  --conf spark.kubernetes.driver.volumes.persistentVolumeClaim.spark-jars.options.claimName=spark-jars-pvc \
  --conf spark.kubernetes.driver.volumes.persistentVolumeClaim.spark-jars.mount.path=/opt/spark/jars \
  --conf spark.kubernetes.executor.volumes.persistentVolumeClaim.spark-jars.options.claimName=spark-jars-pvc \
  --conf spark.kubernetes.executor.volumes.persistentVolumeClaim.spark-jars.mount.path=/opt/spark/jars \
  --conf spark.jars=/opt/spark/jars/openmetadata-spark-agent.jar \
  --conf spark.extraListeners=io.openlineage.spark.agent.OpenLineageSparkListener \
  --conf spark.openmetadata.transport.type=openmetadata \
  --conf spark.openmetadata.transport.hostPort=http://openmetadata:8585/api \
  --conf spark.openmetadata.transport.jwtToken=<jwt-token> \
  local:///opt/spark/work-dir/your_job.py
```

**Using Environment Variables in Kubernetes:**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: spark-driver
spec:
  containers:
  - name: spark
    image: spark:3.4.0
    env:
    - name: OPENMETADATA_HOST
      value: "http://openmetadata.default.svc.cluster.local:8585/api"
    - name: OPENMETADATA_JWT_TOKEN
      valueFrom:
        secretKeyRef:
          name: openmetadata-secrets
          key: jwt-token
    - name: PIPELINE_SERVICE_NAME
      value: "k8s_spark_service"
```

### Standalone Cluster Deployment

For standalone Spark clusters:

**Configure spark-defaults.conf on Master and Workers:**

```bash
# On Spark master and all worker nodes
sudo vim $SPARK_HOME/conf/spark-defaults.conf
```

Add the following:

```properties
spark.jars /opt/spark/jars/openmetadata-spark-agent.jar
spark.extraListeners io.openlineage.spark.agent.OpenLineageSparkListener
spark.openmetadata.transport.type openmetadata
spark.openmetadata.transport.hostPort http://openmetadata-server:8585/api
spark.openmetadata.transport.jwtToken <your-jwt-token>
spark.openmetadata.transport.pipelineServiceName standalone_spark_service
```

**Submit job to standalone cluster:**

```bash
spark-submit \
  --master spark://master-host:7077 \
  --deploy-mode cluster \
  --conf "spark.openmetadata.transport.pipelineName=my_etl_job" \
  your_spark_job.py
```

### Docker Quick Start

For quick testing and local development, use Docker Compose:

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  openmetadata:
    image: openmetadata/server:latest
    ports:
      - "8585:8585"
    environment:
      - OPENMETADATA_CLUSTER_NAME=openmetadata

  spark-master:
    image: bitnami/spark:3.4.0
    ports:
      - "8080:8080"
      - "7077:7077"
    environment:
      - SPARK_MODE=master
    volumes:
      - ./jars:/opt/bitnami/spark/jars
      - ./jobs:/opt/bitnami/spark/jobs

  spark-worker:
    image: bitnami/spark:3.4.0
    environment:
      - SPARK_MODE=worker
      - SPARK_MASTER_URL=spark://spark-master:7077
    volumes:
      - ./jars:/opt/bitnami/spark/jars

  mysql-source:
    image: mysql:8.0
    ports:
      - "3307:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=source_db
```

**Quick Start Commands:**

```bash
# Start services
docker-compose up -d

# Copy OpenMetadata Spark Agent JAR
cp openmetadata-spark-agent.jar ./jars/

# Submit test job
docker exec -it spark-master spark-submit \
  --jars /opt/bitnami/spark/jars/openmetadata-spark-agent.jar \
  --conf "spark.extraListeners=io.openlineage.spark.agent.OpenLineageSparkListener" \
  --conf "spark.openmetadata.transport.type=openmetadata" \
  --conf "spark.openmetadata.transport.hostPort=http://openmetadata:8585/api" \
  /opt/bitnami/spark/jobs/test_job.py
```

## Verification

After running your Spark job with OpenMetadata Agent configured, follow these steps to verify lineage was captured successfully:

### 1. Check Spark Logs

Verify the OpenMetadata Spark Agent was initialized:

```bash
# Check for successful agent initialization
grep -i "OpenLineageSparkListener" spark-logs/*.log

# Expected output:
# INFO OpenLineageSparkListener: Registered OpenLineageSparkListener
# INFO OpenLineageSparkListener: OpenMetadata transport initialized
```

### 2. Verify in OpenMetadata UI

1. **Navigate to Pipelines:**
   - Go to OpenMetadata UI: `http://your-openmetadata-server:8585`
   - Click on **Pipelines** in the left navigation menu
   - Look for your pipeline service (e.g., `my_pipeline_service`)

2. **Check Pipeline Details:**
   - Click on the pipeline service
   - You should see your pipeline (e.g., `my_pipeline_name`)
   - Click on the pipeline to view details

3. **Verify Lineage Graph:**
   - Click on the **Lineage** tab
   - You should see a visual graph showing:
     - Source table(s) → Pipeline → Target table(s)
     - Column-level lineage (if available)

### 3. Expected Timeline

- **Immediate:** Agent initialization messages in Spark logs
- **During job execution:** Lineage events sent to OpenMetadata
- **Within 30 seconds after job completion:** Lineage visible in OpenMetadata UI
- **If delayed:** Check OpenMetadata server logs and network connectivity

### 4. Verification Checklist

- [ ] OpenMetadata Spark Agent JAR is in classpath
- [ ] `OpenLineageSparkListener` registered in Spark logs
- [ ] Pipeline service created/updated in OpenMetadata
- [ ] Pipeline appears under the service
- [ ] Source tables are visible in lineage graph
- [ ] Target tables are visible in lineage graph
- [ ] Lineage edges connect source → pipeline → target
- [ ] Job execution metadata is recorded

### 5. Validate API Connectivity

Test OpenMetadata API access from your Spark environment:

```bash
# Test health check
curl http://your-openmetadata-server:8585/api/v1/health-check

# Test authentication
curl -H "Authorization: Bearer <your-jwt-token>" \
     http://your-openmetadata-server:8585/api/v1/users/name/admin

# Expected: 200 OK response
```

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: Lineage Not Appearing in OpenMetadata

**Symptoms:**
- Spark job runs successfully
- No pipeline or lineage visible in OpenMetadata UI

**Diagnostic Steps:**

1. **Check Spark logs for OpenLineageSparkListener:**
   ```bash
   grep -i "OpenLineageSparkListener" spark-logs/*.log
   ```
   - **If not found:** Agent JAR not in classpath or `spark.extraListeners` not configured
   - **Solution:** Verify JAR path in `spark.jars` config and listener in `spark.extraListeners`

2. **Verify OpenMetadata connectivity:**
   ```bash
   # From Spark driver/executor node
   curl http://your-openmetadata-server:8585/api/v1/health-check
   ```
   - **If fails:** Network connectivity issue or incorrect `hostPort`
   - **Solution:** Check firewall rules, DNS resolution, and `spark.openmetadata.transport.hostPort` config

3. **Check for error messages:**
   ```bash
   grep -i "error\|exception\|failed" spark-logs/*.log | grep -i openmetadata
   ```

#### Issue 2: Authentication Failed (401 Unauthorized)

**Symptoms:**
- Logs show "401 Unauthorized" or "Invalid JWT token"

**Solutions:**

1. **Verify JWT token is valid:**
   ```bash
   curl -H "Authorization: Bearer <your-jwt-token>" \
        http://your-openmetadata-server:8585/api/v1/users/name/admin
   ```
   - **If fails:** Token is invalid or expired

2. **Generate new JWT token:**
   - Go to OpenMetadata UI → Settings → Bots → ingestion-bot
   - Click "Revoke & Generate New Token"
   - Copy the new token and update your Spark configuration

3. **Verify token format:**
   - Token should be a long string without spaces
   - Ensure no extra quotes or newlines when copying

#### Issue 3: ClassNotFoundException: OpenLineageSparkListener

**Symptoms:**
```
java.lang.ClassNotFoundException: io.openlineage.spark.agent.OpenLineageSparkListener
```

**Solutions:**

1. **Verify JAR is in classpath:**
   ```bash
   # Check JAR exists
   ls -lh /path/to/openmetadata-spark-agent.jar

   # Verify it's included in spark.jars config
   ```

2. **For YARN deployments:**
   ```bash
   # Upload JAR to HDFS
   hdfs dfs -put openmetadata-spark-agent.jar /user/spark/jars/

   # Use HDFS path in configuration
   --jars hdfs:///user/spark/jars/openmetadata-spark-agent.jar
   ```

3. **For Kubernetes:**
   - Ensure JAR is in container image or mounted volume
   - Verify volume mounts are correct

#### Issue 4: Pipeline Created But No Lineage

**Symptoms:**
- Pipeline service and pipeline exist in OpenMetadata
- No lineage edges visible

**Solutions:**

1. **Verify database services exist:**
   - Check that source and target database services are configured in OpenMetadata
   - Table names in Spark job must match those in OpenMetadata

2. **Use `databaseServiceNames` configuration:**
   ```python
   .config("spark.openmetadata.transport.databaseServiceNames", "mysql_service,postgres_service")
   ```
   - Helps agent find tables faster
   - Reduces search scope

3. **Check table naming:**
   - Ensure table names match exactly (case-sensitive)
   - Include schema/database prefix if needed (e.g., `database.table`)

#### Issue 5: Timeout Errors

**Symptoms:**
```
OpenMetadata API call timed out after 30 seconds
```

**Solutions:**

1. **Increase timeout:**
   ```python
   .config("spark.openmetadata.transport.timeout", "60")
   ```

2. **Check OpenMetadata server performance:**
   - High load on OpenMetadata can cause slow responses
   - Consider scaling OpenMetadata infrastructure

3. **Network latency:**
   - If Spark and OpenMetadata are in different regions/networks
   - Consider using VPN or dedicated network links

#### Issue 6: Memory Issues in Spark Job

**Symptoms:**
- OutOfMemoryError after adding OpenMetadata Agent
- Job runs slower than before

**Solutions:**

1. **Increase executor memory:**
   ```bash
   spark-submit \
     --executor-memory 4g \
     --driver-memory 2g \
     # ... other configs
   ```

2. **The agent has minimal overhead** (~50MB), but if issues persist:
   - Review overall Spark job memory configuration
   - Consider reducing `spark.openmetadata.transport.timeout` to fail faster

#### Issue 7: Multiple Pipelines Created for Same Job

**Symptoms:**
- Each job run creates a new pipeline instead of updating existing one

**Solutions:**

1. **Use consistent `pipelineName`:**
   ```python
   .config("spark.openmetadata.transport.pipelineName", "consistent_name")
   ```
   - Don't use timestamps or random values in pipeline name
   - Use the same name across runs

2. **Use consistent `pipelineServiceName`:**
   - Ensure service name is the same for all related jobs

### Debug Mode

Enable debug logging for detailed troubleshooting:

```python
.config("spark.openmetadata.transport.debug", "true")
```

This will output detailed logs about:
- Lineage events being captured
- API calls to OpenMetadata
- Table resolution process
- Error details

### Getting Help

If you're still experiencing issues:

1. **Check Spark logs** with debug mode enabled
2. **Check OpenMetadata server logs:** `/opt/openmetadata/logs/`
3. **Verify network connectivity** between Spark and OpenMetadata
4. **Check OpenMetadata version compatibility**
5. **Review OpenMetadata Spark Agent GitHub issues:** [https://github.com/open-metadata/openmetadata-spark-agent/issues](https://github.com/open-metadata/openmetadata-spark-agent/issues)
6. **Join OpenMetadata Slack community** for support

### Diagnostic Checklist

When reporting issues, please provide:

- [ ] Spark version
- [ ] OpenMetadata version
- [ ] OpenMetadata Spark Agent version
- [ ] Deployment platform (YARN/Kubernetes/Standalone/Local)
- [ ] Spark job logs (with debug mode enabled)
- [ ] OpenMetadata server logs
- [ ] Network test results (curl to OpenMetadata API)
- [ ] Configuration used (with sensitive values redacted)
