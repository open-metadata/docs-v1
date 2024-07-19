import Link from "next/link";
import { useDocVersionContext } from "../../context/DocVersionContext";
import { getUrlWithVersion } from "../../utils/CommonUtils";
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

  return (
    <Link
      className={styles.Container}
      href={enableVersion ? getUrlWithVersion(href, docVersion) : href}
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
