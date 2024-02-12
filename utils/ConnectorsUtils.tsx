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

  switch (connector) {
    case "Athena":
      iconSource = "athena";
      break;

    case "S3":
    case "Data lake":
      iconSource = "amazon-s3";
      break;

    case "Azure SQL":
      iconSource = "azuresql";
      break;

    case "BigQuery":
      iconSource = "bigquery";
      break;

    case "ClickHouse":
      iconSource = "clickhouse";
      break;

    case "Couchbase":
      iconSource = "couchbase";
      break;

    case "Databricks SQL":
    case "Unity Catalog":
    case "Databricks Pipeline":
      iconSource = "databrick";
      break;

    case "DB2":
      iconSource = "ibmdb2";
      break;

    case "Delta Lake":
      iconSource = "delta-lake";
      break;

    case "Domo Database":
    case "Domo Dashboard":
    case "Domo Pipeline":
      iconSource = "domo";
      break;

    case "Druid":
      iconSource = "druid";
      break;

    case "DynamoDB":
      iconSource = "dynamodb";
      break;

    case "Glue":
      iconSource = "glue";
      break;

    case "Greenplum":
      iconSource = "greenplum";
      break;

    case "Hive":
      iconSource = "hive";
      break;

    case "Iceberg":
      iconSource = "iceberg";
      break;

    case "Impala":
      iconSource = "impala";
      break;

    case "MariaDB":
      iconSource = "mariadb";
      break;

    case "MongoDB":
      iconSource = "mongodb";
      break;

    case "MSSQL":
      iconSource = "mssql";
      break;

    case "MySQL":
      iconSource = "sql";
      break;

    case "Oracle":
      iconSource = "oracle";
      break;

    case "PinotDB":
      iconSource = "pinot";
      break;

    case "Postgres":
      iconSource = "post";
      break;

    case "Presto":
      iconSource = "presto";
      break;

    case "Redshift":
      iconSource = "redshift";
      break;

    case "Salesforce":
      iconSource = "salesforce";
      break;

    case "SAP Hana":
      iconSource = "sap-hana";
      break;

    case "SAS":
      iconSource = "sas";
      break;

    case "SingleStore":
      iconSource = "singlestore";
      break;

    case "Snowflake":
      iconSource = "snowflakes";
      break;

    case "SQLite":
      iconSource = "sqlite";
      break;

    case "Trino":
      iconSource = "trino";
      break;

    case "Vertica":
      iconSource = "vertica";
      break;

    case "Looker":
      iconSource = "looker";
      break;

    case "Metabase":
      iconSource = "metabase";
      break;

    case "Mode":
      iconSource = "mode";
      break;

    case "PowerBI":
      iconSource = "power-bi";
      break;

    case "Qlik Sense":
      iconSource = "qlik-sense";
      break;

    case "QuickSight":
      iconSource = "quicksight";
      break;

    case "Redash":
      iconSource = "redash";
      break;

    case "Superset":
      iconSource = "superset";
      break;

    case "Tableau":
      iconSource = "tableau";
      break;

    case "Kafka":
      iconSource = "kafka";
      break;

    case "Kinesis":
      iconSource = "kinesis";
      break;

    case "Redpanda":
      iconSource = "redpanda";
      break;

    case "Airbyte":
      iconSource = "airbyte";
      break;

    case "Airflow":
      iconSource = "airflow";
      break;

    case "Dagster":
      iconSource = "dagster";
      break;

    case "Fivetran":
      iconSource = "fivetran";
      break;

    case "NiFi":
      iconSource = "apachenifi";
      break;

    case "Spline":
      iconSource = "spline";
      break;

    case "MLflow":
      iconSource = "mlflow";
      break;

    case "Sagemaker":
      iconSource = "sagemaker";
      break;

    case "Amundsen":
      iconSource = "amundsen";
      break;

    case "Atlas":
      iconSource = "atlas";
      break;

    case "Elasticsearch":
      iconSource = "elasticsearch";
      break;
  }

  return (
    <ConnectorImage
      alt={connector}
      className={connectorInfoStyles.ConnectorImage}
      src={`/images/connectors/${iconSource}.png`}
    />
  );
};
