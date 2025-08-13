import { ReactNode } from "react";
import styles from "./APIInfoContainer.module.css";

interface APIsInfoContainerProps {
  children: ReactNode;
}

function APIsInfoContainer({ children }: APIsInfoContainerProps) {
  return <div className={styles.APIsInfoContainer}>{children}</div>;
}

export default APIsInfoContainer;
