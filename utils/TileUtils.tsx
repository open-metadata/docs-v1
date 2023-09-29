import { ReactComponent as AdministrationIcon } from "../images/icons/administration.svg";
import { ReactComponent as CollaborationIcon } from "../images/icons/collaboration.svg";
import { ReactComponent as DiscoveryIcon } from "../images/icons/discovery.svg";
import { ReactComponent as GovernanceIcon } from "../images/icons/governance.svg";
import { ReactComponent as InsightIcon } from "../images/icons/insight.svg";
import { ReactComponent as LineageIcon } from "../images/icons/lineage.svg";
import { ReactComponent as QualityIcon } from "../images/icons/quality.svg";
import { ReactComponent as StewardIcon } from "../images/icons/steward.svg";
import { materialDesignIcon } from "./CommonUtils";

export const getTileIcons = (iconName: string) => {
  switch (iconName) {
    case "administration":
      return <AdministrationIcon width={32} height={32} />;
    case "collaboration":
      return <CollaborationIcon width={32} height={32} />;
    case "discovery":
      return <DiscoveryIcon width={32} height={32} />;
    case "governance":
      return <GovernanceIcon width={32} height={32} />;
    case "quality":
      return <QualityIcon width={32} height={32} />;
    case "steward":
      return <StewardIcon width={32} height={32} />;
    case "insight":
      return <InsightIcon width={32} height={32} />;
    case "lineage":
      return <LineageIcon width={32} height={32} />;
    default: {
      const getIcon = materialDesignIcon(iconName);
      return getIcon ? getIcon({ size: 32 }) : null;
    }
  }
};
