import React, { useEffect, useState } from "react";
import { usePreviewContext } from "../../../context/CodePreviewContext";
import styles from "./CodeBlock.module.css";

export default function CodeBlock({ children }) {
  const { selectedPreviewNumber } = usePreviewContext();
  const [prevSelectedCode, setPrevSelectedCode] = useState<number>(1);

  useEffect(() => {
    const codeBlock = document.getElementById("code-block");
    const codesArray = codeBlock.querySelectorAll('[class^="Code_Container_"]');
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
  }, [selectedPreviewNumber]);

  useEffect(() => {
    const codeBlock = document.getElementById("code-block");
    const codesArray = codeBlock.querySelectorAll('[class^="Code_Container_"]');
    codesArray[0].classList.add("highlitedCode");

    codesArray.forEach((element) => {
      element.addEventListener("scroll", (e) => {
        e.stopPropagation();
      });
    });
  }, []);

  return (
    <div className={styles.Container} id="code-block">
      {children}
    </div>
  );
}
