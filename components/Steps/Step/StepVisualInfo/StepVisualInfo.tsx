import React, { ReactNode } from "react";
import styles from "./StepVisualInfo.module.css";

interface StepVisualInfoProps {
  children: ReactNode;
}

function StepVisualInfo({ children }: StepVisualInfoProps) {
  return <div className={styles.Container}>{children}</div>;
}

export default StepVisualInfo;
