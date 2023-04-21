import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePreviewContext } from "../../../context/CodePreviewContext";
import styles from "../../common/Code/Code.module.css";
import { ReactComponent as ClipboardIcon } from "../../../images/icons/clipboard.svg";
import { ReactComponent as FileIcon } from "../../../images/icons/file-icon.svg";
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
  const [codeBlockId, setCodeBlockId] = useState<string>();

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

  const copyToClipboard = useCallback(() => {
    if (preTag.current) {
      const copyText = preTag.current.textContent;
      navigator.clipboard.writeText(copyText);
      setCopyText("Copied");
      setTimeout(() => {
        setCopyText("Copy");
      }, 1500);
    }
  }, [preTag.current, setCopyText]);

  useEffect(() => {
    highlightCodeBlock();
  }, [selectedPreviewNumber, codeBlockId]);

  useEffect(() => {
    const initialSelectedCodeBlock = document.getElementById(
      `code-block-${selectedPreviewNumber}`
    );

    if (initialSelectedCodeBlock) {
      initialSelectedCodeBlock.classList.add("highlightedCode");
    }
  }, []);

  useEffect(() => {
    const id = uniqueId("code-block-container-");

    setCodeBlockId(id);
  }, []);

  const codeBlock = useMemo(
    () => (
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
    ),
    [fileName, copyToClipboard, copyText, preTag, children, codeBlockId]
  );

  return codeBlock;
}
