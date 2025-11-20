---
title: Spark Lineage Ingestion
slug: /connectors/ingestion/lineage/spark-lineage
---

# Spark Lineage Ingestion

A spark job may involve movement/transfer of data which may result into a data lineage, to capture such lineages you can make use of `OpenMetadata Spark Agent` which you can configure with your spark session and capture these spark lineages into your OpenMetadata instance.

In this guide we will explain how you can make use of the `OpenMetadata Spark Agent` to capture such lineage.

- [Requirements](#requirements)
- [Configuration](#configuration)
- [Configuration Parameters](#configuration-parameters)
- [Using Spark Agent with Databricks](#using-spark-agent-with-databricks)
- [Using Spark Agent with Glue](#using-spark-agent-with-glue)
- [Troubleshooting](#troubleshooting)

## Requirements

To use the `OpenMetadata Spark Agent`, you will have to download the latest jar from [here](https://github.com/open-metadata/openmetadata-spark-agent/releases).

We support Spark version 3.1 and above.


## Configuration

While configuring the spark session, in this guide we will make use of PySpark to demonstrate the use of `OpenMetadata Spark Agent`


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


{% image
  src="/images/v1.10/connectors/spark/spark-pipeline-service.png"
  alt="Spark Pipeline Service"
  caption="Spark Pipeline Service"
 /%}


 {% image
  src="/images/v1.10/connectors/spark/spark-pipeline-details.png"
  alt="Spark Pipeline Details"
  caption="Spark Pipeline Details"
 /%}



 {% image
  src="/images/v1.10/connectors/spark/spark-pipeline-lineage.png"
  alt="Spark Pipeline Lineage"
  caption="Spark Pipeline Lineage"
 /%}

## Configuration Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `spark.extraListeners` | Yes | Must be set to `io.openlineage.spark.agent.OpenLineageSparkListener` |
| `spark.openmetadata.transport.type` | Yes | Must be set to `openmetadata` |
| `spark.openmetadata.transport.hostPort` | Yes | OpenMetadata server URL with `/api` suffix (e.g., `http://localhost:8585/api`) |
| `spark.openmetadata.transport.jwtToken` | Yes | JWT token for authentication. [Generate token](/deployment/security/enable-jwt-tokens#generate-token) |
| `spark.openmetadata.transport.pipelineServiceName` | No | Name of the pipeline service to create/update |
| `spark.openmetadata.transport.pipelineName` | No | Name of the pipeline to create/update |
| `spark.openmetadata.transport.pipelineDescription` | No | Description for the pipeline |
| `spark.openmetadata.transport.databaseServiceNames` | No | Comma-separated list of database services to search for tables |
| `spark.openmetadata.transport.timeout` | No | Timeout in seconds for OpenMetadata API calls (default: 30) |

## Using Spark Agent with Databricks

Follow the below steps in order to use OpenMetadata Spark Agent with databricks.

### 1. Upload the jar to compute cluster

To use the `OpenMetadata Spark Agent`, you will have to download the latest jar from [here](https://github.com/open-metadata/openmetadata-spark-agent/releases) and upload it to your databricks compute cluster.

To upload the jar you can visit the compute details page and then go to the libraries tab

{% image
  src="/images/v1.10/connectors/spark/spark-upload-jar.png"
  alt="Spark Upload Jar"
  caption="Spark Upload Jar"
 /%}

Click on the "Install Now" button and choose `dbfs` mode and upload the `OpenMetadata Spark Agent` jar.

{% image
  src="/images/v1.10/connectors/spark/spark-upload-jar-2.png"
  alt="Spark Upload Jar"
  caption="Spark Upload Jar"
 /%}

Once your jar is uploaded copy the path of the jar for the next steps.

{% image
  src="/images/v1.10/connectors/spark/spark-uploaded-jar.png"
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
  src="/images/v1.10/connectors/spark/prepare-script.png"
  alt="Prepare Script"
  caption="Prepare Script"
 /%}



### 3. Configure Initialization Script

Once you have created a initialization script, you will need to attach this script to your compute instance, to do that you can go to advanced config > init scripts and add your script path.

{% image
  src="/images/v1.10/connectors/spark/prepare-script.png"
  alt="Prepare Script"
  caption="Prepare Script"
 /%}


{% image
  src="/images/v1.10/connectors/spark/spark-init-script.png"
  alt="Spark Init Script"
  caption="Spark Init Script"
 /%}


### 4. Configure Spark

After configuring the init script, you will need to update the spark config as well.


{% image
  src="/images/v1.10/connectors/spark/spark-config-set.png"
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
  src="/images/v1.10/connectors/spark/glue-job-jar.png"
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
  src="/images/v1.10/connectors/spark/glue-job-params.png"
  alt="Glue Job Configure Params"
  caption="Glue Job Configure Params"
 /%}

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

### Spark Code Patterns That Break Lineage

Certain Spark coding patterns can prevent lineage from being captured correctly. Below are common issues and how to fix them:

#### Pattern 1: Using Dynamic Table Names

**❌ Breaks Lineage:**
```python
import datetime
table_suffix = datetime.datetime.now().strftime("%Y%m%d")
table_name = f"sales_{table_suffix}"  # Dynamic name: sales_20250119

df.write.format("jdbc") \
    .option("dbtable", table_name) \  # Lineage cannot track dynamic names
    .save()
```

**✅ Fix:** Use consistent table names or configure table mapping:
```python
# Option 1: Use consistent base table name
df.write.format("jdbc") \
    .option("dbtable", "sales_current") \
    .mode("overwrite") \
    .save()

# Option 2: Use partitioning instead of table name suffixes
df.write.format("jdbc") \
    .option("dbtable", "sales") \
    .partitionBy("date") \
    .save()
```

#### Pattern 2: Creating DataFrames from Local Collections

**❌ Breaks Lineage:**
```python
# Creating DataFrame from Python list - no source lineage
data = [(1, "John"), (2, "Jane")]
df = spark.createDataFrame(data, ["id", "name"])

df.write.jdbc(url, "users", properties=props)  # No source table tracked
```

**✅ Fix:** Always read from actual data sources:
```python
# Read from actual database/file source
df = spark.read.jdbc(url, "source_users", properties=props)

# Perform transformations
df_transformed = df.select("id", "name")

df_transformed.write.jdbc(url, "users", properties=props)  # Lineage tracked
```

#### Pattern 3: Using RDD Operations

**❌ Breaks Lineage:**
```python
# Reading as DataFrame but converting to RDD
df = spark.read.jdbc(url, "employees", properties=props)
rdd = df.rdd.map(lambda row: (row.id, row.name.upper()))  # Breaks lineage tracking

# Converting back to DataFrame
result_df = rdd.toDF(["id", "name"])
result_df.write.jdbc(url, "employees_upper", properties=props)  # Lineage lost
```

**✅ Fix:** Use DataFrame/Dataset APIs:
```python
from pyspark.sql.functions import upper

df = spark.read.jdbc(url, "employees", properties=props)
result_df = df.select("id", upper("name").alias("name"))  # Lineage preserved
result_df.write.jdbc(url, "employees_upper", properties=props)
```

#### Pattern 4: Using Temporary Views Without Proper Table References

**❌ Breaks Lineage:**
```python
# Reading from JDBC
df = spark.read.jdbc(url, "orders", properties=props)

# Creating temp view and using SQL without clear lineage
df.createOrReplaceTempView("temp_orders")
result = spark.sql("SELECT * FROM temp_orders WHERE amount > 100")

# Writing without maintaining source reference
result.write.mode("overwrite").parquet("/output/filtered_orders")  # Weak lineage
```

**✅ Fix:** Minimize temp views or use JDBC for output:
```python
df = spark.read.jdbc(url, "orders", properties=props)

# Use DataFrame API instead of temp views
result = df.filter("amount > 100")

# Write to tracked destination (JDBC)
result.write.format("jdbc") \
    .option("url", url) \
    .option("dbtable", "filtered_orders") \
    .mode("overwrite") \
    .save()
```

#### Pattern 5: Using collect() and Manual Writes

**❌ Breaks Lineage:**
```python
df = spark.read.jdbc(url, "products", properties=props)

# Collecting data locally and writing manually
rows = df.collect()  # Brings data to driver

# Manual database insert (lineage breaks here)
import psycopg2
conn = psycopg2.connect(...)
for row in rows:
    cursor.execute("INSERT INTO products_copy VALUES (%s, %s)", (row.id, row.name))
conn.commit()
```

**✅ Fix:** Use Spark's native write operations:
```python
df = spark.read.jdbc(url, "products", properties=props)

# Let Spark handle the write - lineage preserved
df.write.format("jdbc") \
    .option("url", url) \
    .option("dbtable", "products_copy") \
    .mode("append") \
    .save()
```

#### Pattern 6: Using Non-JDBC File Formats Without Catalog

**❌ Breaks Lineage:**
```python
# Reading from files without catalog registration
df = spark.read.parquet("/data/input/sales.parquet")

# Writing to files without catalog
df.write.parquet("/data/output/processed_sales.parquet")  # No table lineage
```

**✅ Fix:** Use JDBC sources or register with catalog:
```python
# Option 1: Use JDBC sources/targets
df = spark.read.jdbc(url, "sales", properties=props)
df.write.jdbc(url, "processed_sales", properties=props)

# Option 2: Register files as tables in metastore
spark.sql("CREATE TABLE sales USING parquet LOCATION '/data/input/sales.parquet'")
spark.sql("CREATE TABLE processed_sales USING parquet LOCATION '/data/output/processed_sales.parquet'")

df = spark.table("sales")
df.write.insertInto("processed_sales")
```

#### Pattern 7: Mixing Multiple Write Operations

**❌ Breaks Lineage:**
```python
df = spark.read.jdbc(url, "transactions", properties=props)

# Writing to multiple destinations in separate operations
df.write.mode("overwrite").parquet("/backup/transactions")  # First write
df.write.jdbc(url, "transactions_processed", properties=props)  # Second write

# Lineage may only capture last write
```

**✅ Fix:** Use cache and separate clear operations:
```python
df = spark.read.jdbc(url, "transactions", properties=props)
df_cached = df.cache()  # Cache to avoid re-reading

# Write to primary JDBC target (tracked)
df_cached.write.jdbc(url, "transactions_processed", properties=props)

# Backup write (optional, document separately)
df_cached.write.mode("overwrite").parquet("/backup/transactions")

df_cached.unpersist()
```

#### Pattern 8: Using Incorrect JDBC URL Formats

**❌ Breaks Lineage:**
```python
# Incorrect JDBC URL without proper database/schema
df.write.format("jdbc") \
    .option("url", "jdbc:mysql://localhost:3306") \  # Missing database
    .option("dbtable", "users") \
    .save()

# Or using query instead of table
df.write.format("jdbc") \
    .option("url", url) \
    .option("dbtable", "(SELECT * FROM users WHERE active=1) tmp") \  # Query, not table
    .save()
```

**✅ Fix:** Use proper JDBC URLs and table names:
```python
# Include database in URL
df.write.format("jdbc") \
    .option("url", "jdbc:mysql://localhost:3306/mydb") \
    .option("dbtable", "users") \
    .save()

# Use actual table names, do filtering in DataFrame
df_filtered = df.filter("active = 1")
df_filtered.write.format("jdbc") \
    .option("url", "jdbc:mysql://localhost:3306/mydb") \
    .option("dbtable", "active_users") \
    .save()
```

#### Pattern 9: Using saveAsTable Without Database Prefix

**❌ Breaks Lineage:**
```python
df = spark.read.jdbc(url, "orders", properties=props)

# Saving to Spark catalog without database specification
df.write.mode("overwrite").saveAsTable("processed_orders")  # Which database?
```

**✅ Fix:** Specify database explicitly:
```python
df = spark.read.jdbc(url, "source_db.orders", properties=props)

# Write with full database qualification
df.write.mode("overwrite").saveAsTable("target_db.processed_orders")

# Or use JDBC write for better lineage
df.write.format("jdbc") \
    .option("url", "jdbc:mysql://localhost:3306/target_db") \
    .option("dbtable", "processed_orders") \
    .mode("overwrite") \
    .save()
```

#### Pattern 10: Schema Mismatches Between Spark and OpenMetadata

**❌ Breaks Lineage:**
```python
# Spark reads table with different casing than OpenMetadata
df = spark.read.jdbc(url, "UserAccounts", properties=props)  # Capital case

# OpenMetadata has it registered as "user_accounts" (lowercase)
# Lineage fails due to name mismatch
```

**✅ Fix:** Match table names exactly as in OpenMetadata:
```python
# Check table name in OpenMetadata first
# Use exact same casing and schema qualification
df = spark.read.jdbc(url, "public.user_accounts", properties=props)

# For case-sensitive databases, quote table names
df.write.format("jdbc") \
    .option("url", url) \
    .option("dbtable", '"public"."user_accounts"') \
    .save()
```

#### Pattern 11: Using Deprecated Write APIs

**❌ Breaks Lineage:**
```python
# Old deprecated API
df.write.jdbc(url=url, table="users", mode="overwrite", properties=props)
```

**✅ Fix:** Use modern DataFrame write API:
```python
df.write.format("jdbc") \
    .option("url", url) \
    .option("dbtable", "users") \
    .option("driver", "com.mysql.cj.jdbc.Driver") \
    .mode("overwrite") \
    .save()
```

#### Pattern 12: Not Specifying Driver Class

**❌ Breaks Lineage:**
```python
df.write.format("jdbc") \
    .option("url", "jdbc:mysql://localhost:3306/db") \
    .option("dbtable", "users") \
    .save()  # Missing driver specification
```

**✅ Fix:** Always specify driver:
```python
df.write.format("jdbc") \
    .option("url", "jdbc:mysql://localhost:3306/db") \
    .option("driver", "com.mysql.cj.jdbc.Driver") \
    .option("dbtable", "users") \
    .save()
```

### Best Practices for Lineage-Friendly Spark Code

1. **Always use JDBC format explicitly:**
   ```python
   .format("jdbc")  # Not .jdbc() shortcut
   ```

2. **Use fully qualified table names:**
   ```python
   .option("dbtable", "database.schema.table")
   ```

3. **Avoid dynamic table names - use static names:**
   ```python
   # Good: "sales_current"
   # Bad: f"sales_{datetime.now()}"
   ```

4. **Prefer DataFrame API over SQL strings:**
   ```python
   df.filter("amount > 100")  # Better than SQL on temp views
   ```

5. **Always specify database in JDBC URL:**
   ```python
   jdbc:mysql://host:3306/database  # Include database
   ```

6. **Use consistent naming across Spark and OpenMetadata:**
   - Check table names in OpenMetadata UI
   - Match exact casing and schema names

7. **Avoid intermediate local collections:**
   ```python
   # Don't: df.collect() then manual writes
   # Do: df.write.format("jdbc")...
   ```

8. **Test lineage with simple job first:**
   ```python
   # Minimal test: read one table, write to another
   spark.read.jdbc(..., "source").write.jdbc(..., "target")
   ```

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
- Which tables/operations are detected

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
