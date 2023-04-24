import React from "react";
import { connectorsArr } from "./ConnectorsInfo.constants";
import styles from "./ConnectorsInfo.module.css";
import Link from 'next/link'

export default function ConnectorsInfo() {
  return (
    <div className={styles.Container}>
      {connectorsArr.map((connector) => (
          <Link href={connector.url}>
            <div className={styles.ConnectorItem} key={connector.name}>
              <img
                  className={styles.ConnectorImg}
                  src={connector.icon}
                  alt={connector.name}
              />
              <p>{connector.name}</p>
            </div>
          </Link>
      ))}
    </div>
  );
}
