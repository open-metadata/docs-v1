export interface ConnectorDetailsHeaderProps {
  name: string;
  stage: string;
  platform: string;
  availableFeatures: Array<string>;
  unavailableFeatures: Array<string>;
}
