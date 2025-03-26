export interface ConnectorServiceDetails {
  url: string;
  icon: string;
  name: string;
  supportedVersion?: string;
  collate?: boolean;
}
export interface ConnectorCategory {
  connector: string;
  services: Array<ConnectorServiceDetails>;
}
