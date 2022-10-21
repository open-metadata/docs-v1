import classNames from "classnames";
import React, { useEffect } from "react";
import { usePreviewContext } from "../../../context/CodePreviewContext";
import { getCodeDivIndexFromId } from "../../../utils/codePreview";
import styles from "./CodeInfo.module.css";

export default function CodeInfo({ children, srNumber }) {
  const { selectedPreviewNumber, changeSelectedPreviewNumber } =
    usePreviewContext();

  const isSelected = selectedPreviewNumber === srNumber;

  function handleClick() {
    const id = this.id;
    changeSelectedPreviewNumber(Number(getCodeDivIndexFromId(id)));
  }

  useEffect(() => {
    const codeInfoDiv = document.getElementById(`code-info-${srNumber}`);
    codeInfoDiv.onclick = handleClick;
  }, []);

  return (
    <div
      className={classNames(
        styles.Container,
        isSelected ? styles.HighlitedCode : ""
      )}
      id={`code-info-${srNumber}`}
    >
      {children}
    </div>
  );
}
