export const connectorInfoCard = {
  render: "ConnectorInfoCard",
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
    href: {
      type: String,
      description:
        "The connector details page url (relative path in the documentation).",
    },
    platform: {
      type: String,
      description: "The platform the connector is available in.",
      default: "OpenMetadata",
      matches: ["OpenMetadata", "Collate"],
    },
  },
};
