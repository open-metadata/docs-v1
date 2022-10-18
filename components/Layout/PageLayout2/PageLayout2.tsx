import React from "react";
import styles from "./PageLayout2.module.css";

export default function PageLayout1({ children }) {
  return <div className={styles.Container}>{children}</div>;
}
