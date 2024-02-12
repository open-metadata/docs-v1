import classNames from "classnames";
import {
  getConnectorImage,
  getConnectorPlatformIcon,
  getStageBadge,
} from "../../utils/ConnectorsUtils";
import { ConnectorDetailsHeaderProps } from "./ConnectorDetailsHeader.interface";
import styles from "./ConnectorDetailsHeader.module.css";

function ConnectorDetailsHeader({
  name,
  stage,
  platform,
  availableFeatures,
  unavailableFeatures,
}: Readonly<ConnectorDetailsHeaderProps>) {
  return (
    <div className={styles.Container}>
      <div className={styles.Heading}>
        <div className="flex items-center gap-3">
          <div className={styles.ImageContainer}>{getConnectorImage(name)}</div>
          <div className={styles.ConnectorName}>{name}</div>
          {getStageBadge(stage)}
        </div>
        <div className={styles.PlatformDetails}>
          <div>Available In</div>
          <div className={styles.PlatformIcon}>
            {getConnectorPlatformIcon(platform)}
          </div>
        </div>
      </div>
      <div className={styles.SubHeading}>
        {availableFeatures.map((feature) => (
          <div
            className={classNames(styles.FeatureTag, styles.AvailableFeature)}
            key={feature}
          >
            {feature}
          </div>
        ))}
        {unavailableFeatures.map((feature) => (
          <div
            className={classNames(styles.FeatureTag, styles.UnavailableFeature)}
            key={feature}
          >
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConnectorDetailsHeader;
