import classNames from "classnames";
import {uniqBy} from "lodash";
import dynamic from "next/dynamic";
import Link from "next/link";
import {useState} from "react";
import {useDocVersionContext} from "../../context/DocVersionContext";
import {
  getConnectorURL,
  getSortedServiceList,
} from "../../utils/ConnectorsUtils";
import Loader from "../common/Loader/Loader";
import {CONNECTORS} from "./ConnectorsInfo.constants";
import {ConnectorCategory} from "./ConnectorsInfo.interface";
import styles from "./ConnectorsInfo.module.css";

const ConnectorImage = dynamic(() => import("./ConnectorImage"), {
  ssr: false,
  loading: () => <Loader size={28} />,
});

CONNECTORS.unshift({
  connector: "All connectors",
  services: CONNECTORS.reduce((prev, curr) => {
    return uniqBy([...prev, ...curr.services], "name");
  }, [] as ConnectorCategory["services"]),
});

export default function ConnectorsInfo() {
  const {docVersion} = useDocVersionContext();
  const [selectedTab, setSelectedTab] = useState<ConnectorCategory>(
    CONNECTORS[0]
  );

  return (
    <div className={styles.Container}>
      <div className={styles.TabsContainer}>
        {CONNECTORS.map((connectorCategory) => (
          <button
            className={classNames(
              styles.TabItem,
              connectorCategory.connector === selectedTab.connector
                ? styles.SelectedTab
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
            <Link
              className={styles.ConnectorItem}
              href={getConnectorURL(docVersion, connector)}
              key={connector.name}
            >
              <ConnectorImage
                className="w-[42px] h-[42px]"
                src={connector.icon}
                alt={`${connector.name}-icon`}
              />
              <p>{connector.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
