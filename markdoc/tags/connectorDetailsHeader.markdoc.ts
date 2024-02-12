export const connectorDetailsHeader = {
  render: "ConnectorDetailsHeader",
  attributes: {
    name: {
      type: String,
      description: "Name of the connector.",
    },
    stage: {
      type: String,
      description: "The development stage of the connector.",
      default: "PROD",
      matches: ["PROD", "BETA"],
    },
    platform: {
      type: String,
      description: "The platform the connector is available in.",
      default: "OpenMetadata",
      matches: ["OpenMetadata", "Collate"],
    },
    availableFeatures: {
      type: Array<string>,
      description: "List of available features for the connector.",
    },
    unavailableFeatures: {
      type: Array<string>,
      description: "List of unavailable features for the connector.",
    },
  },
};
