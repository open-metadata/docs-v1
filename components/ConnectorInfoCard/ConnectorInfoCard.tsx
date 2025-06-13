import { useDocVersionContext } from "../../context/DocVersionContext";
import { getUrl } from "../../utils/CommonUtils";
import {
  getConnectorImage,
  getConnectorPlatformIcon,
  getStageBadge,
} from "../../utils/ConnectorsUtils";
import { ConnectorInfoCardProps } from "./ConnectorInfoCard.interface";
import styles from "./ConnectorInfoCard.module.css";
import ParamLink from "../ParamLink";
import { useRouter } from "next/router";

function ConnectorInfoCard({
  name,
  stage,
  platform,
  href,
}: Readonly<ConnectorInfoCardProps>) {
  const router = useRouter();
  const { enableVersion } = useDocVersionContext();

  // Return null if version is disabled and the connector is not collate only
  // This is to prevent showing the collate only connectors on OSS documentation
  if (platform == "Collate" && enableVersion) {
    return null;
  }

  return (
    <ParamLink
      className={styles.Container}
      href={getUrl({ url: href, docVersion: router.query.version as string ?? "latest", enableVersion })}
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
    </ParamLink>
  );
}

export default ConnectorInfoCard;
