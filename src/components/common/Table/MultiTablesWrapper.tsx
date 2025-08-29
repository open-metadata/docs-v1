import React, { ReactNode } from "react";
import styles from "./MultiTablesWrapper.module.css";

function MultiTablesWrapper({ children }: { children: ReactNode }) {
  return <div className={styles.Container}>{children}</div>;
}

export default MultiTablesWrapper;
