import React, { ReactNode } from "react";
import styles from "./APIVisualInfo.module.css";

interface APIVisualInfoProps {
  children: ReactNode;
}

function APIVisualInfo({ children }: APIVisualInfoProps) {
  return <div className={styles.APIVisualInfoContainer}>{children}</div>;
}

export default APIVisualInfo;
