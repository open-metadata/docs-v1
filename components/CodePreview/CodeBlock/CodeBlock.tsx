import React, { useEffect, useState } from "react";
import { usePreviewContext } from "../../../context/CodePreviewContext";
import styles from "./CodeBlock.module.css";

export default function CodeBlock({ children }) {
  const { selectedPreviewNumber } = usePreviewContext();
  const [prevSelectedCode, setPrevSelectedCode] = useState<number>(1);

  const highlightCodeBlock = () => {
    const codeBlock = document.getElementById("code-block");
    const previousCodeBlock = document.getElementById(
      `code-block-${prevSelectedCode}`
    );
    const currentCodeBlock = document.getElementById(
      `code-block-${selectedPreviewNumber}`
    );

    if (previousCodeBlock) {
      previousCodeBlock.classList.remove("highlightedCode");
    }

    if (currentCodeBlock) {
      currentCodeBlock.classList.add("highlightedCode");

      const positionFromTopOfCodeBlock = currentCodeBlock.offsetTop - 180;
      codeBlock.scrollTop = positionFromTopOfCodeBlock;
    }

    setPrevSelectedCode(selectedPreviewNumber);
  };

  useEffect(() => {
    highlightCodeBlock();
  }, [selectedPreviewNumber]);

  useEffect(() => {
    const initialSelectedCodeBlock = document.getElementById(
      `code-block-${selectedPreviewNumber}`
    );

    if (initialSelectedCodeBlock) {
      initialSelectedCodeBlock.classList.add("highlightedCode");
    }
  }, []);

  return (
    <div className={styles.Container} id="code-block">
      {children}
    </div>
  );
}
