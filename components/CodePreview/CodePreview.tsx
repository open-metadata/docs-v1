import React from "react";
import { CodePreviewContextProvider } from "../../context/CodePreviewContext";
import styles from "../common/Code/Code.module.css";

export default function CodePreview({ children }) {
  return (
    <CodePreviewContextProvider>
      <div className={styles.CodePreviewContainer} id="code-preview-container">
        {children}
      </div>
    </CodePreviewContextProvider>
  );
}
