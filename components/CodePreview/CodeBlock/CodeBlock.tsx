import React, { useEffect, useState } from "react";
import { usePreviewContext } from "../../../context/CodePreviewContext";
import styles from "./CodeBlock.module.css";

export default function CodeBlock({ children }) {
  const { selectedPreviewNumber } = usePreviewContext();
  const [prevSelectedCode, setPrevSelectedCode] = useState<number>(1);

  const getElements = (): {
    codeBlock: HTMLElement;
    codesArray: NodeListOf<Element>;
  } => {
    const codeBlock = document.getElementById("code-block");
    const codesArray = codeBlock.querySelectorAll('[class^="Code_Container_"]');
    return { codeBlock, codesArray };
  };

  const highlightCodeBlock = () => {
    const { codeBlock, codesArray } = getElements();
    codesArray.forEach((element: HTMLElement, id) => {
      if (id + 1 === prevSelectedCode || id + 1 === selectedPreviewNumber) {
        element.classList.toggle("highlitedCode");
        if (id + 1 === selectedPreviewNumber) {
          const positionFromTopOfCodeBlock = element.offsetTop - 180;
          codeBlock.scrollTop = positionFromTopOfCodeBlock;
        }
      }
    });
    setPrevSelectedCode(selectedPreviewNumber);
  };

  useEffect(() => {
    highlightCodeBlock();
  }, [selectedPreviewNumber]);

  useEffect(() => {
    const { codesArray } = getElements();
    codesArray[0] && codesArray[0].classList.add("highlitedCode");
  }, []);

  return (
    <div className={styles.Container} id="code-block">
      {children}
    </div>
  );
}
