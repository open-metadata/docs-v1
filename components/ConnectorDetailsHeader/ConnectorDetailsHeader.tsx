import classNames from "classnames";
import { isEmpty } from "lodash";
import { useMemo } from "react";
import { useDocVersionContext } from "../../context/DocVersionContext";
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
  availableFeaturesCollate = [],
}: Readonly<ConnectorDetailsHeaderProps>) {
  const { enableVersion } = useDocVersionContext();

  const { showSubHeading, totalAvailableFeatures } = useMemo(
    () => ({
      // show sub heading if there are available features or unavailable features in either collate or openmetadata
      showSubHeading:
        !isEmpty(availableFeatures) ||
        !isEmpty(unavailableFeatures) ||
        (!enableVersion && !isEmpty(availableFeaturesCollate)),
      // show all available features in openmetadata and collate if version is not enabled
      totalAvailableFeatures: [
        ...availableFeatures,
        ...(enableVersion ? [] : availableFeaturesCollate),
      ],
    }),
    [
      availableFeatures,
      unavailableFeatures,
      availableFeaturesCollate,
      enableVersion,
    ]
  );

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
      {showSubHeading && (
        <div className={styles.SubHeading}>
          <div className={styles.FeaturesHeading}>Feature List</div>
          <div className={styles.FeaturesList}>
            {totalAvailableFeatures.map((feature) => (
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
