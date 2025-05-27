import classNames from "classnames";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useDocVersionContext } from "../../context/DocVersionContext";
import {
  getConnectorsList,
  getConnectorURL,
  getSortedServiceList,
} from "../../utils/ConnectorsUtils";
import Loader from "../common/Loader/Loader";
import { CONNECTORS } from "./ConnectorsInfo.constants";
import { ConnectorCategory } from "./ConnectorsInfo.interface";
import styles from "./ConnectorsInfo.module.css";
import ParamLink from "../ParamLink";

const ConnectorImage = dynamic(() => import("./ConnectorImage"), {
  ssr: false,
  loading: () => <Loader size={28} />,
});

export default function ConnectorsInfo({ tabStyle, activeTabStyle }) {
  const { docVersion, enableVersion } = useDocVersionContext();

  const connectorsList = useMemo(
    () => getConnectorsList(CONNECTORS, enableVersion),
    [enableVersion]
  );

  const [selectedTab, setSelectedTab] = useState<ConnectorCategory>(
    connectorsList[0]
  );

  return (
    <div className={styles.Container}>
      <div className={styles.TabsContainer}>
        {connectorsList.map((connectorCategory) => (
          <button
            className={classNames(
              tabStyle,
              connectorCategory.connector === selectedTab.connector
                ? activeTabStyle
                : ""
            )}
            key={connectorCategory.connector}
            onClick={() => setSelectedTab(connectorCategory)}
          >
            {connectorCategory.connector}
          </button>
        ))}
      </div>
      <div className={styles.ConnectorsContainer}>
        <div className={styles.ConnectorsGridContainer}>
          {getSortedServiceList(selectedTab.services).map((connector) => (
            <ParamLink
              className={styles.ConnectorItem}
              href={getConnectorURL(docVersion, connector)}
              key={connector.name}
            >
              <ConnectorImage
                className={classNames(styles.ConnectorImg)}
                src={connector.icon}
                alt={`${connector.name}-icon`}
              />
              <p>{connector.name}</p>
            </ParamLink>
          ))}
        </div>
      </div>
    </div>
  );
}
