export const CONNECTORS = [
  {
    connector: "Database",
    services: [
      {
        url: "/connectors/database/athena",
        icon: "./images/connectors/athena.png",
        name: "Athena",
      },
      {
        url: "/connectors/database/datalake",
        icon: "./images/connectors/amazon-s3.png",
        name: "Amazon S3",
      },
      {
        url: "/connectors/database/azuresql",
        icon: "./images/connectors/azuresql.png",
        name: "Azure SQL",
      },
      {
        url: "/connectors/database/bigquery",
        icon: "./images/connectors/bigquery.png",
        name: "BigQuery",
      },
      {
        url: "/connectors/database/clickhouse",
        icon: "./images/connectors/clickhouse.png",
        name: "ClickHouse",
      },
      {
        url: "/connectors/database/deltalake",
        icon: "./images/connectors/delta-lake.png",
        name: "Delta Lake",
      },
      {
        url: "/connectors/database/druid",
        icon: "./images/connectors/druid.png",
        name: "Druid",
      },
      {
        url: "/connectors/database/databricks",
        icon: "./images/connectors/databrick.png",
        name: "Databricks",
      },
      {
        url: "/connectors/database/domo-database",
        icon: "./images/connectors/domo.png",
        name: "Domo",
      },
      {
        url: "/connectors/database/dynamodb",
        icon: "./images/connectors/dynamodb.png",
        name: "DynamoDB",
      },
      {
        url: "/connectors/database/glue",
        icon: "./images/connectors/glue.png",
        name: "Glue",
      },
      {
        url: "/connectors/database/datalake",
        icon: "./images/connectors/googleCloudService.png",
        name: "GCS",
      },
      {
        url: "/connectors/database/hive",
        icon: "./images/connectors/hive.png",
        name: "Hive",
      },
      {
        url: "/connectors/database/db2",
        icon: "./images/connectors/ibmdb2.png",
        name: "IBM Db2",
      },
      {
        url: "/connectors/database/impala",
        icon: "./images/connectors/impala.png",
        name: "Impala",
      },
      {
        url: "/connectors/database/mariadb",
        icon: "./images/connectors/mariadb.png",
        name: "MariaDB",
      },
      {
        url: "/connectors/database/mssql",
        icon: "./images/connectors/mssql.png",
        name: "MSSQL",
      },
      {
        url: "/connectors/database/mysql",
        icon: "./images/connectors/sql.png",
        name: "MySQL",
      },
      {
        url: "/connectors/database/oracle",
        icon: "./images/connectors/oracle.png",
        name: "Oracle",
      },
      {
        url: "/connectors/database/postgres",
        icon: "./images/connectors/post.png",
        name: "Postgres",
      },
      {
        url: "/connectors/database/presto",
        icon: "./images/connectors/presto.png",
        name: "Presto",
      },
      {
        url: "/connectors/database/redshift",
        icon: "./images/connectors/redshift.png",
        name: "Redshift",
      },
      {
        url: "/connectors/database/salesforce",
        icon: "./images/connectors/salesforce.png",
        name: "Salesforce",
      },
      {
        url: "/connectors/database/snowflake",
        icon: "./images/connectors/snowflakes.png",
        name: "Snowflake",
      },
      {
        url: "/connectors/database/singlestore",
        icon: "./images/connectors/singlestore.png",
        name: "SingleStore",
      },
      {
        url: "/connectors/database/trino",
        icon: "./images/connectors/trino.png",
        name: "Trino",
      },
      {
        url: "/connectors/database/vertica",
        icon: "./images/connectors/vertica.png",
        name: "Vertica",
      },
      {
        url: "/connectors/database/pinotdb",
        icon: "./images/connectors/pinot.png",
        name: "Pinot",
      },
      {
        url: "/connectors/database/sqlite",
        icon: "./images/connectors/sqllite.png",
        name: "SQL Lite",
      },
      {
        url: "#",
        icon: "./images/connectors/iceberg.png",
        name: "Apache Iceberg",
      },
    ],
  },
  {
    connector: "Messaging",
    services: [
      {
        url: "/connectors/messaging/kafka",
        icon: "./images/connectors/kafka.png",
        name: "Kafka",
      },
      {
        url: "/connectors/messaging/redpanda",
        icon: "./images/connectors/redpanda.png",
        name: "Redpanda",
      },
      {
        url: "/main-concepts/metadata-standard/schemas/entity/services/connections/messaging/pulsarconnection",
        icon: "./images/connectors/pulsar.png",
        name: "Pulsar",
      },

      {
        url: "/connectors/messaging/kinesis",
        icon: "./images/connectors/kinesis.png",
        name: "AWS Kinesis",
      },
    ],
  },
  {
    connector: "Dashboard",
    services: [
      {
        url: "/connectors/dashboard/looker",
        icon: "./images/connectors/looker.png",
        name: "Looker",
      },
      {
        url: "/connectors/dashboard/metabase",
        icon: "./images/connectors/metabase.png",
        name: "Metabase",
      },
      {
        url: "/connectors/dashboard/mode",
        icon: "./images/connectors/mode.png",
        name: "Mode",
      },
      {
        url: "/connectors/dashboard/powerbi",
        icon: "./images/connectors/power-bi.png",
        name: "Power BI",
      },
      {
        url: "/connectors/dashboard/redash",
        icon: "./images/connectors/redash.png",
        name: "Redash",
      },
      {
        url: "/connectors/dashboard/superset",
        icon: "./images/connectors/superset.png",
        name: "Superset",
      },
      {
        url: "/connectors/dashboard/tableau",
        icon: "./images/connectors/tableau.png",
        name: "Tableau",
      },
      {
        url: "/connectors/dashboard/quicksight",
        icon: "./images/connectors/quicksight.png",
        name: "AWS QuickSight",
      },
    ],
  },
  {
    connector: "Pipeline",
    services: [
      {
        url: "/connectors/pipeline/airflow",
        icon: "./images/connectors/airflow.png",
        name: "Airflow",
      },
      {
        url: "/connectors/pipeline/airbyte",
        icon: "./images/connectors/airbyte.png",
        name: "Airbyte",
      },
      {
        url: "/connectors/pipeline/dagster",
        icon: "./images/connectors/dagster.png",
        name: "Dagster",
      },
      {
        url: "/connectors/pipeline/fivetran",
        icon: "./images/connectors/fivetran.png",
        name: "Fivetran",
      },
      {
        url: "/connectors/pipeline/nifi",
        icon: "./images/connectors/apachenifi.png",
        name: "Apache NiFi",
      },
    ],
  },
  {
    connector: "Mlmodel",
    services: [
      {
        url: "/connectors/ml-model/mlflow",
        icon: "./images/connectors/mlflow.png",
        name: "MLflow",
      },
      {
        url: "/connectors/ml-model/sagemaker",
        icon: "./images/connectors/sagemaker.png",
        name: "AWS SageMaker",
      },
    ],
  },
  {
    connector: "Metadata",
    services: [
      {
        url: "/connectors/metadata/amundsen",
        icon: "./images/connectors/amundsen.png",
        name: "Amundsen",
      },
      {
        url: "/connectors/metadata/atlas",
        icon: "./images/connectors/atlas.png",
        name: "Atlas",
      },
    ],
  },
  {
    connector: "Others",
    services: [
      {
        url: "#",
        icon: "./images/connectors/ldap.png",
        name: "LDAP",
      },
      {
        url: "#",
        icon: "./images/connectors/sqlalchemy.png",
        name: "SQLAlchemy",
      },
    ],
  },
];
