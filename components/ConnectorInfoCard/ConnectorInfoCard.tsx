import Link from "next/link";
import { useDocVersionContext } from "../../context/DocVersionContext";
import { getUrl } from "../../utils/CommonUtils";
import {
  getConnectorImage,
  getConnectorPlatformIcon,
  getStageBadge,
} from "../../utils/ConnectorsUtils";
import { ConnectorInfoCardProps } from "./ConnectorInfoCard.interface";
import styles from "./ConnectorInfoCard.module.css";

function ConnectorInfoCard({
  name,
  stage,
  platform,
  href,
}: Readonly<ConnectorInfoCardProps>) {
  const { docVersion, enableVersion } = useDocVersionContext();

  // Return null if version is disabled and the connector is not collate only
  // This is to prevent showing the collate only connectors on OSS documentation
  if (platform == "Collate" && enableVersion) {
    return null;
  }

  return (
    <Link
      className={styles.Container}
      href={getUrl({ url: href, docVersion, enableVersion })}
    >
      <div className="flex items-center gap-2">
        <div className={styles.ImageContainer}>{getConnectorImage(name)}</div>
        <div className="flex flex-col">
          <div>{name}</div>
          {getStageBadge(stage)}
        </div>
      </div>
      <div className={styles.PlatformDetails}>
        <div>Available In</div>
        <div className={styles.PlatformIcon}>
          {getConnectorPlatformIcon(platform)}
        </div>
      </div>
    </Link>
  );
}

export default ConnectorInfoCard;
