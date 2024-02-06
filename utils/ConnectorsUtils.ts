import { sortBy } from "lodash";
import {
  ConnectorCategory,
  ConnectorServiceDetails,
} from "../components/ConnectorsInfo/ConnectorsInfo.interface";
import { REGEX_TO_EXTRACT_VERSION_NUMBER } from "../constants/version.constants";
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
