import classNames from "classnames";
import React, { useEffect } from "react";
import { usePreviewContext } from "../../../context/CodePreviewContext";
import { getDivIndexFromId } from "../../../utils/CommonUtils";
import styles from "./CodeInfo.module.css";

export default function CodeInfo({ children, srNumber }) {
  const { selectedPreviewNumber, onChangeSelectedPreviewNumber } =
    usePreviewContext();

  const isSelected = selectedPreviewNumber === srNumber;

  function handleClick() {
    const id = this.id;
    onChangeSelectedPreviewNumber(getDivIndexFromId(id));
  }

  useEffect(() => {
    const codeInfoDiv = document.getElementById(`code-info-${srNumber}`);
    codeInfoDiv.onclick = handleClick;
  }, []);

  return (
    <div
      className={classNames(
        styles.Container,
        isSelected ? styles.HighlightedCode : ""
      )}
      id={`code-info-${srNumber}`}
    >
      {children}
    </div>
  );
}
