import classNames from "classnames";
import { sortBy } from "lodash";
import connectorInfoStyles from "../components/ConnectorInfoCard/ConnectorInfoCard.module.css";
import ConnectorImage from "../components/ConnectorsInfo/ConnectorImage";
import {
  ConnectorCategory,
  ConnectorServiceDetails,
} from "../components/ConnectorsInfo/ConnectorsInfo.interface";
import { REGEX_TO_EXTRACT_VERSION_NUMBER } from "../constants/version.constants";
import { ReactComponent as BetaIcon } from "../images/icons/beta-icon.svg";
import { ReactComponent as CollateIcon } from "../images/icons/ic-collate.svg";
import { ReactComponent as OpenMetadataIcon } from "../images/icons/om-monogram.svg";
import { ReactComponent as ProdIcon } from "../images/icons/prod-icon.svg";
import { getUrlWithVersion } from "./CommonUtils";

export const getSortedServiceList = (services: ConnectorCategory["services"]) =>
  sortBy(services, (service) => service.name.toLowerCase());

// Function to check if the current selected version is
// equal to or greater than the connector supported version
export const getConnectorURL = (
  currentVersion: string,
  connector: ConnectorServiceDetails
) => {
  try {
    // Extract version number from the version strings
    const currentVersionNumber = Number(
      REGEX_TO_EXTRACT_VERSION_NUMBER.exec(currentVersion ?? "")[0]
    );
    const supportedVersionNumber = Number(
      REGEX_TO_EXTRACT_VERSION_NUMBER.exec(connector.supportedVersion ?? "")[0]
    );

    return currentVersionNumber >= supportedVersionNumber
      ? connector.url
      : getUrlWithVersion(connector.url, connector.supportedVersion);
  } catch {
    return connector.url;
  }
};

export const getStageBadge = (stage: string) => {
  let stageClass = connectorInfoStyles.ProdStage;
  let stageIcon = <ProdIcon width={10} />;

  if (stage === "BETA") {
    stageClass = connectorInfoStyles.BetaStage;
    stageIcon = <BetaIcon width={10} />;
  }

  return (
    <span className={classNames(connectorInfoStyles.StageLabel, stageClass)}>
      {stageIcon}
      <span>{stage}</span>
    </span>
  );
};

export const getConnectorPlatformIcon = (platform: string) => {
  if (platform === "Collate") {
    return <CollateIcon width={14} />;
  } else {
    return <OpenMetadataIcon width={14} />;
  }
};

export const getConnectorImage = (connector: string) => {
  let iconSource = "default-service-icon";

  const connectorMappings = {
    ADLS: "adls",
    Airbyte: "airbyte",
    Airflow: "airflow",
    Alation: "alation",
    "Alation Sink": "alation",
    Amundsen: "amundsen",
    Athena: "athena",
    Atlas: "atlas",
    AzureSQL: "azuresql",
    BigQuery: "bigquery",
    BigTable: "big-table",
    Clickhouse: "clickhouse",
    Collate: "collate",
    Couchbase: "couchbase",
    Databricks: "databrick",
    "Databricks Pipeline": "databrick",
    "Databricks SQL": "databrick",
    DB2: "ibmdb2",
    Dagster: "dagster",
    "S3 Datalake": "amazon-s3",
    "ADLS Datalake": "adls",
    "GCS Datalake": "gcs",
    "dbt Cloud": "dbtcloud",
    "Delta Lake": "delta-lake",
    Domo: "domo",
    "Domo Dashboard": "domo",
    "Domo Database": "domo",
    "Domo Pipeline": "domo",
    Doris: "doris",
    Druid: "druid",
    DynamoDB: "dynamodb",
    Elasticsearch: "elasticsearch",
    Flink: "flink",
    Fivetran: "fivetran",
    GCS: "gcs",
    Glue: "glue",
    Greenplum: "greenplum",
    Hive: "hive",
    Iceberg: "iceberg",
    Impala: "impala",
    Kafka: "kafka",
    KafkaConnect: "kafka",
    Kinesis: "kinesis",
    Lightdash: "lightdash",
    Looker: "looker",
    MariaDB: "mariadb",
    Metabase: "metabase",
    MicroStrategy: "microstrategy",
    MLflow: "mlflow",
    Mode: "mode",
    MongoDB: "mongodb",
    MSSQL: "mssql",
    MySQL: "sql",
    NiFi: "apachenifi",
    OpenLineage: "openlineage",
    Oracle: "oracle",
    PinotDB: "pinot",
    Postgres: "post",
    PowerBI: "power-bi",
    Presto: "presto",
    QuickSight: "quicksight",
    "Qlik Cloud": "qlikcloud",
    "Qlik Sense": "qlik-sense",
    Redash: "redash",
    Redpanda: "redpanda",
    Redshift: "redshift",
    Salesforce: "salesforce",
    "SAP ERP": "sap-erp",
    "SAP Hana": "sap-hana",
    SAS: "sas",
    "S3 Storage": "amazon-s3",
    Sagemaker: "sagemaker",
    SingleStore: "singlestore",
    Snowflake: "snowflakes",
    Spline: "spline",
    SQLite: "sqlite",
    Superset: "superset",
    Tableau: "tableau",
    Teradata: "teradata",
    Trino: "trino",
    "Unity Catalog": "databrick",
    Vertica: "vertica",
  };

  iconSource = connectorMappings[connector] || iconSource;

  return (
    <ConnectorImage
      alt={connector}
      src={`/images/connectors/${iconSource}.webp`}
    />
  );
};
