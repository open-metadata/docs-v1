import classNames from "classnames";
import React, { ReactNode, useEffect } from "react";
import styles from "./ExtraContent.module.css";

interface ExtraContentProps {
  parentTagName: string;
  children: ReactNode;
}

function ExtraContent({ parentTagName, children }: ExtraContentProps) {
  let className: string = "";

  switch (parentTagName) {
    case "codePreview":
      className = "ml-1";
      break;
    case "stepsContainer":
      className = "ml-12 mt-12";
      break;
  }

  return (
    <div className={classNames(styles.Container, className)}>
      {parentTagName === "codePreview" ? (
        <div className="ml-5">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}

export default ExtraContent;
