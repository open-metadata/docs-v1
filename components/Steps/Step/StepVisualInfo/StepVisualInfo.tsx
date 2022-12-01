import classNames from "classnames";
import React, { ReactNode } from "react";
import styles from "./StepVisualInfo.module.css";

interface StepVisualInfoProps {
  children: ReactNode;
}

function StepVisualInfo({ children }: StepVisualInfoProps) {
  return (
    <div className={classNames(styles.Container, "step-visual-info")}>
      {children}
    </div>
  );
}

export default StepVisualInfo;
