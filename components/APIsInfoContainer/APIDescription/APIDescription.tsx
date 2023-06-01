import React, { ReactNode } from "react";
import styles from "./APIDescription.module.css";

interface APIDescriptionProps {
  children: ReactNode;
}

function APIDescription({ children }: APIDescriptionProps) {
  return <div className={styles.APIDescriptionContainer}>{children}</div>;
}

export default APIDescription;
