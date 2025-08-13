import React from "react";
import styles from "./InlineCalloutContainer.module.css";

export default function InlineCalloutContainer({ children }) {
  return <div className={styles.Container}>{children}</div>;
}
