import React, { ReactNode } from "react";
import styles from "../Step.module.css";

interface StepVisualInfoProps {
  children: ReactNode;
}

function StepVisualInfo({ children }: StepVisualInfoProps) {
  return <div className={styles.StepVisualInfoContainer}>{children}</div>;
}

export default StepVisualInfo;
