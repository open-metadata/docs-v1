import React from "react";
import styles from "./PageLayout1.module.css";

export default function PageLayout1({ children }) {
  return <div className={styles.Container}>{children}</div>;
}
