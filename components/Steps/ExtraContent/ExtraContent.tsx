import React, { ReactNode } from "react";
import styles from "./ExtraContent.module.css";

interface ExtraContentProps {
  children: ReactNode;
}

function ExtraContent({ children }: ExtraContentProps) {
  return <div className={styles.Container}>{children}</div>;
}

export default ExtraContent;
