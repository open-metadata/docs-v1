import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./APIDescription.module.css";

interface APIDescriptionProps {
  children: ReactNode;
}

function APIDescription({ children }: APIDescriptionProps) {
  return (
    <div
      className={classNames(
        "api-description-container",
        styles.APIDescriptionContainer
      )}
    >
      {children}
    </div>
  );
}

export default APIDescription;
