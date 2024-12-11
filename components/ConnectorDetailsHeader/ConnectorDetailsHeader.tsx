import classNames from "classnames";
import { isEmpty } from "lodash";
import { useMemo } from "react";
import { ReactComponent as CheckIcon } from "../../images/icons/check.svg";
import { ReactComponent as CrossIcon } from "../../images/icons/cross.svg";
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
  searchWeight,
}: Readonly<ConnectorDetailsHeaderProps>) {
  const showSubHeading = useMemo(
    () => !isEmpty(availableFeatures) || !isEmpty(unavailableFeatures),
    [availableFeatures, unavailableFeatures]
  );

  let otherProps = {};

  if (searchWeight) {
    otherProps = {
      ["data-pagefind-weight"]: searchWeight,
    };
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Heading}>
        <div className="flex items-center gap-3">
          <div className={styles.ImageContainer}>{getConnectorImage(name)}</div>
          <div className={styles.ConnectorName} {...otherProps}>
            {name}
          </div>
          {getStageBadge(stage)}
        </div>
        <div className={styles.PlatformDetails}>
          <div>Available In</div>
          <div className={styles.PlatformIcon}>
            {getConnectorPlatformIcon(platform)}
          </div>
        </div>
      </div>
      {showSubHeading && (
        <div className={styles.SubHeading}>
          <div className={styles.FeaturesHeading}>Feature List</div>
          <div className={styles.FeaturesList}>
            {availableFeatures.map((feature) => (
              <div
                className={classNames(
                  styles.FeatureTag,
                  styles.AvailableFeature
                )}
                key={feature}
              >
                {feature}
                <CheckIcon height={12} />
              </div>
            ))}
            {unavailableFeatures.map((feature) => (
              <div
                className={classNames(
                  styles.FeatureTag,
                  styles.UnavailableFeature
                )}
                key={feature}
              >
                {feature}
                <CrossIcon height={12} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ConnectorDetailsHeader;
