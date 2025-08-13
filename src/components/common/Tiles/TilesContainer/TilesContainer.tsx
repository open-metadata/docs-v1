import React, { ReactNode } from "react";
import styles from "./TilesContainer.module.css";

interface TilesContainerProps {
  children: ReactNode;
}

function TilesContainer({ children }: TilesContainerProps) {
  return <div className={styles.Container}>{children}</div>;
}

export default TilesContainer;
