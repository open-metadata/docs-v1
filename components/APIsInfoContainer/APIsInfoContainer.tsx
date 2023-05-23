import React, { ReactNode } from "react";
import styles from "./APIsInfoContainer.module.css";

interface APIsInfoContainerProps {
  children: ReactNode;
}

function APIsInfoContainer({ children }: APIsInfoContainerProps) {
  return <div className={styles.APIsInfoContainer}>{children}</div>;
}

export default APIsInfoContainer;
