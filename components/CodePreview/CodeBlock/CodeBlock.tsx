import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { usePreviewContext } from "../../../context/CodePreviewContext";
import styles from "../../common/Code/Code.module.css";
import { ReactComponent as ClipboardIcon } from "../../../icons/clipboard.svg";
import { ReactComponent as FileIcon } from "../../../icons/file-icon.svg";
import { uniqueId } from "lodash";

interface Props {
  children: ReactNode;
  fileName: string;
}

export default function CodeBlock({ children, fileName }: Props) {
  const { selectedPreviewNumber } = usePreviewContext();
  const [prevSelectedCode, setPrevSelectedCode] = useState<number>(1);
  const [copyText, setCopyText] = useState<string>("Copy");
  const preTag = useRef<HTMLPreElement>();
  const codeBlockId = useMemo(() => uniqueId("code-block-container-"), []);

  const highlightCodeBlock = () => {
    const codeBlock = document.getElementById(codeBlockId);
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

  const copyToClipboard = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (preTag.current) {
      const copyText = preTag.current.textContent;
      navigator.clipboard.writeText(copyText);
      setCopyText("Copied");
      setTimeout(() => {
        setCopyText("Copy");
      }, 1500);
    }
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
    <div className={styles.CodeBlockContainer} id={codeBlockId}>
      <div className={styles.Toolbar}>
        {fileName && (
          <span className={styles.FileName}>
            <FileIcon />
            <span>{fileName}</span>
          </span>
        )}
        <button className={styles.CopyButton} onClick={copyToClipboard}>
          <ClipboardIcon className="w-3 h-3" />
          <span>{copyText}</span>
        </button>
      </div>
      <pre ref={preTag}>{children}</pre>
    </div>
  );
}
