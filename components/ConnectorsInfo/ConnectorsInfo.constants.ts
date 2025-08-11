import { ConnectorCategory } from "./ConnectorsInfo.interface";

export const CONNECTORS: Array<ConnectorCategory> = [
  {
    connector: "API",
    services: [
      {
        url: "/connectors/api/rest",
        icon: "/images/connectors/rest.webp",
        name: "REST",
      },
    ],
  },
  {
    connector: "Database",
    services: [
      {
        url: "/connectors/database/athena",
        icon: "/images/connectors/athena.webp",
        name: "Athena",
      },
      {
        url: "/connectors/database/azuresql",
        icon: "/images/connectors/azuresql.webp",
        name: "Azure SQL",
      },
      {
        url: "/connectors/database/bigquery",
        icon: "/images/connectors/bigquery.webp",
        name: "BigQuery",
      },
      {
        url: "/connectors/database/bigtable",
        icon: "/images/connectors/big-table.webp",
        name: "BigTable",
        supportedVersion: "v1.3.x",
      },
      {
        url: "/connectors/database/cassandra",
        icon: "/images/connectors/cassandra.webp",
        name: "Cassandra",
      },
      {
        url: "/connectors/database/clickhouse",
        icon: "/images/connectors/clickhouse.webp",
        name: "ClickHouse",
      },
      {
        url: "/connectors/database/cockroach",
        icon: "/images/connectors/cockroach.webp",
        name: "Cockroach",
      },
      {
        url: "/connectors/database/couchbase",
        icon: "/images/connectors/couchbase.webp",
        name: "Couchbase",
      },
      {
        url: "/connectors/database/deltalake",
        icon: "/images/connectors/delta-lake.webp",
        name: "Delta Lake",
      },
      {
        url: "/connectors/database/druid",
        icon: "/images/connectors/druid.webp",
        name: "Druid",
      },
      {
        url: "/connectors/database/s3-datalake",
        icon: "/images/connectors/amazon-s3.webp",
        name: "S3 Datalake",
      },
      {
        url: "/connectors/database/adls-datalake",
        icon: "/images/connectors/adls.webp",
        name: "ADLS Datalake",
      },
      {
        url: "/connectors/database/gcs-datalake",
        icon: "/images/connectors/gcs.webp",
        name: "GCS Datalake",
      },
      {
        url: "/connectors/database/databricks",
        icon: "/images/connectors/databrick.webp",
        name: "Databricks",
      },
      {
        url: "/connectors/database/db2",
        icon: "/images/connectors/ibmdb2.webp",
        name: "DB2",
      },
      {
        url: "/connectors/pipeline/dbtcloud",
        icon: "/images/connectors/dbtcloud.webp",
        name: "dbt",
      },
      {
        url: "/connectors/database/domo-database",
        icon: "/images/connectors/domo.webp",
        name: "Domo",
      },
      {
        url: "/connectors/database/doris",
        icon: "/images/connectors/doris.webp",
        name: "Doris",
      },
      {
        url: "/connectors/database/dynamodb",
        icon: "/images/connectors/dynamodb.webp",
        name: "DynamoDB",
      },
      {
        url: "/connectors/database/epic",
        icon: "/images/connectors/epic.webp",
        name: "Epic",
        collate: true,
      },
      {
        url: "/connectors/database/exasol",
        icon: "/images/connectors/exasol.webp",
        name: "Exasol",
      },
      {
        url: "/connectors/database/glue",
        icon: "/images/connectors/glue.webp",
        name: "Glue",
      },
      {
        url: "/connectors/database/greenplum",
        icon: "/images/connectors/greenplum.webp",
        name: "Greenplum",
      },
      {
        url: "/connectors/database/hive",
        icon: "/images/connectors/hive.webp",
        name: "Hive",
      },
      {
        url: "/connectors/database/iceberg",
        icon: "/images/connectors/iceberg.webp",
        name: "Iceberg",
      },
      {
        url: "/connectors/database/impala",
        icon: "/images/connectors/impala.webp",
        name: "Impala",
      },
      {
        url: "/connectors/database/mariadb",
        icon: "/images/connectors/mariadb.webp",
        name: "MariaDB",
      },
      {
        url: "/connectors/database/mongodb",
        icon: "/images/connectors/mongodb.webp",
        name: "MongoDB",
      },
      {
        url: "/connectors/database/mssql",
        icon: "/images/connectors/mssql.webp",
        name: "MSSQL",
      },
      {
        url: "/connectors/database/mysql",
        icon: "/images/connectors/sql.webp",
        name: "MySQL",
      },
      {
        url: "/connectors/database/oracle",
        icon: "/images/connectors/oracle.webp",
        name: "Oracle",
      },
      {
        url: "/connectors/database/postgres",
        icon: "/images/connectors/post.webp",
        name: "PostgreSQL",
      },
      {
        url: "/connectors/database/presto",
        icon: "/images/connectors/presto.webp",
        name: "Presto",
      },
      {
        url: "/connectors/database/redshift",
        icon: "/images/connectors/redshift.webp",
        name: "Redshift",
      },
      {
        url: "/connectors/database/salesforce",
        icon: "/images/connectors/salesforce.webp",
        name: "Salesforce",
      },
      {
        url: "/connectors/database/sap-erp",
        icon: "/images/connectors/sap-erp.webp",
        name: "SAP ERP",
      },
      {
        url: "/connectors/database/sap-hana",
        icon: "/images/connectors/sap-hana.webp",
        name: "SAP HANA",
      },
      {
        url: "/connectors/database/snowflake",
        icon: "/images/connectors/snowflakes.webp",
        name: "Snowflake",
      },
      {
        url: "/connectors/database/singlestore",
        icon: "/images/connectors/singlestore.webp",
        name: "SingleStore",
      },
      {
        url: "/connectors/database/synapse",
        icon: "/images/connectors/synapse.webp",
        name: "Synapse",
        collate: true,
      },
      {
        url: "/connectors/database/teradata",
        icon: "/images/connectors/teradata.webp",
        name: "Teradata",
      },
      {
        url: "/connectors/database/trino",
        icon: "/images/connectors/trino.webp",
        name: "Trino",
      },
      {
        url: "/connectors/database/unity-catalog",
        icon: "/images/connectors/databrick.webp",
        name: "Unity Catalog",
      },
      {
        url: "/connectors/database/vertica",
        icon: "/images/connectors/vertica.webp",
        name: "Vertica",
      },
      {
        url: "/connectors/database/pinotdb",
        icon: "/images/connectors/pinot.webp",
        name: "Pinot",
      },
      {
        url: "/connectors/database/sas",
        icon: "/images/connectors/sas.webp",
        name: "SAS",
        supportedVersion: "v1.3.x",
      },
      {
        url: "/connectors/database/sqlite",
        icon: "/images/connectors/sqlite.webp",
        name: "SQL Lite",
      },
      {
        url: "/connectors/database/ssas",
        icon: "/images/connectors/ssas.webp",
        name: "SSAS",
        collate: true,
      },
    ],
  },
  {
    connector: "Messaging",
    services: [
      {
        url: "/connectors/messaging/kafka",
        icon: "/images/connectors/kafka.webp",
        name: "Kafka",
      },
      {
        url: "/connectors/messaging/redpanda",
        icon: "/images/connectors/redpanda.webp",
        name: "Redpanda",
      },
      {
        url: "/connectors/messaging/kinesis",
        icon: "/images/connectors/kinesis.webp",
        name: "Kinesis",
      },
    ],
  },
  {
    connector: "Dashboard",
    services: [
      {
        url: "/connectors/dashboard/lightdash",
        icon: "/images/connectors/lightdash.webp",
        name: "Lightdash",
      },
      {
        url: "/connectors/dashboard/grafana",
        icon: "/images/connectors/grafana.webp",
        name: "Grafana",
      },
      {
        url: "/connectors/dashboard/looker",
        icon: "/images/connectors/looker.webp",
        name: "Looker",
      },
      {
        url: "/connectors/dashboard/metabase",
        icon: "/images/connectors/metabase.webp",
        name: "Metabase",
      },
      {
        url: "/connectors/dashboard/microstrategy",
        icon: "/images/connectors/microstrategy.webp",
        name: "MicroStrategy",
      },
      {
        url: "/connectors/dashboard/mode",
        icon: "/images/connectors/mode.webp",
        name: "Mode",
      },
      {
        url: "/connectors/dashboard/powerbi",
        icon: "/images/connectors/power-bi.webp",
        name: "Power BI",
      },
      {
        url: "/connectors/dashboard/powerbireportserver",
        icon: "/images/connectors/power-bi.webp",
        name: "PowerBI Report Server",
      },
      {
        url: "/connectors/dashboard/redash",
        icon: "/images/connectors/redash.webp",
        name: "Redash",
      },
      {
        url: "/connectors/dashboard/sigma",
        icon: "/images/connectors/sigma.webp",
        name: "Sigma",
      },
      {
        url: "/connectors/dashboard/superset",
        icon: "/images/connectors/superset.webp",
        name: "Superset",
      },
      {
        url: "/connectors/dashboard/tableau",
        icon: "/images/connectors/tableau.webp",
        name: "Tableau",
      },
      {
        url: "/connectors/dashboard/thoughtspot",
        icon: "/images/connectors/thoughtspot.webp",
        name: "ThoughtSpot",
        collate: true,
      },
      {
        url: "/connectors/dashboard/qlikcloud",
        icon: "/images/connectors/qlikcloud.webp",
        name: "Qlik Cloud",
      },
      {
        url: "/connectors/dashboard/qliksense",
        icon: "/images/connectors/qlik-sense.webp",
        name: "Qlik Sense",
      },
      {
        url: "/connectors/dashboard/quicksight",
        icon: "/images/connectors/quicksight.webp",
        name: "QuickSight",
      },
    ],
  },
  {
    connector: "Pipeline",
    services: [
      {
        url: "/connectors/pipeline/airflow",
        icon: "/images/connectors/airflow.webp",
        name: "Airflow",
      },
      {
        url: "/connectors/pipeline/airbyte",
        icon: "/images/connectors/airbyte.webp",
        name: "Airbyte",
      },
      {
        url: "/connectors/pipeline/dagster",
        icon: "/images/connectors/dagster.webp",
        name: "Dagster",
      },
      {
        url: "/connectors/pipeline/datafactory",
        icon: "/images/connectors/datafactory.webp",
        name: "Azure Data Factory",
        collate: true,
      },
      {
        url: "/connectors/pipeline/dbtcloud",
        icon: "/images/connectors/dbtcloud.webp",
        name: "dbt Cloud",
      },
      {
        url: "/connectors/pipeline/fivetran",
        icon: "/images/connectors/fivetran.webp",
        name: "Fivetran",
      },
      {
        url: "/connectors/pipeline/flink",
        icon: "/images/connectors/flink.webp",
        name: "Flink",
      },
      {
        url: "/connectors/pipeline/matillion",
        icon: "/images/connectors/matillion.webp",
        name: "Matillion",
        collate: true,
      },
      {
        url: "/connectors/pipeline/nifi",
        icon: "/images/connectors/apachenifi.webp",
        name: "NiFi",
      },
      {
        url: "/connectors/pipeline/openlineage",
        icon: "/images/connectors/openlineage.webp",
        name: "OpenLineage",
      },
      {
        url: "/connectors/pipeline/spline",
        icon: "/images/connectors/spline.webp",
        name: "Spline",
      },
      {
        url: "/connectors/pipeline/stitch",
        icon: "/images/connectors/stitch.webp",
        name: "Stitch",
        collate: true,
      },
      {
        url: "/connectors/pipeline/wherescape",
        icon: "/images/connectors/wherescape.webp",
        name: "Wherescape",
        collate: true,
      },
      {
        url: "/connectors/pipeline/ssis",
        icon: "/images/connectors/ssis.webp",
        name: "SSIS",
        collate: true,
      },
    ],
  },
  {
    connector: "Mlmodel",
    services: [
      {
        url: "/connectors/ml-model/mlflow",
        icon: "/images/connectors/mlflow.webp",
        name: "MLflow",
      },
      {
        url: "/connectors/ml-model/sagemaker",
        icon: "/images/connectors/sagemaker.webp",
        name: "SageMaker",
      },
      {
        url: "/connectors/ml-model/vertexai",
        icon: "/images/connectors/vertexai.webp",
        name: "VertexAI",
        collate: true,
      },
    ],
  },
  {
    connector: "Search",
    services: [
      {
        url: "/connectors/search/elasticsearch",
        icon: "/images/connectors/elasticsearch.webp",
        name: "Elasticsearch",
      },
      {
        url: "/connectors/search/opensearch",
        icon: "/images/connectors/opensearch.webp",
        name: "OpenSearch",
      },
    ],
  },
  {
    connector: "Storage",
    services: [
      {
        url: "/connectors/storage/adls",
        icon: "/images/connectors/adls.webp",
        name: "ADLS",
        supportedVersion: "v1.3.x",
        collate: true,
      },
      {
        url: "/connectors/storage/gcs",
        icon: "/images/connectors/gcs.webp",
        name: "GCS",
        supportedVersion: "v1.3.x",
      },
      {
        url: "/connectors/storage/s3",
        icon: "/images/connectors/amazon-s3.webp",
        name: "S3 Storage",
      },
    ],
  },
  {
    connector: "Metadata",
    services: [
      {
        url: "/connectors/metadata/alation",
        icon: "/images/connectors/alation.webp",
        name: "Alation",
        collate: true,
      },
      {
        url: "/connectors/metadata/alationsink",
        icon: "/images/connectors/alation.webp",
        name: "AlationSink",
      },
      {
        url: "/connectors/metadata/atlas",
        icon: "/images/connectors/atlas.webp",
        name: "Atlas",
      },
      {
        url: "/connectors/metadata/atlas",
        icon: "/images/connectors/atlas.webp",
        name: "Atlas",
      },
    ],
  },
];
