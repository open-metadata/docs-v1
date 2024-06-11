import classNames from "classnames";
import { isUndefined } from "lodash";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-go";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-toml";
import "prismjs/components/prism-yaml";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "prismjs/plugins/line-highlight/prism-line-highlight";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";
import "prismjs/plugins/toolbar/prism-toolbar";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ReactComponent as ClipboardIcon } from "../../../images/icons/clipboard.svg";
import Image from "../Image/Image";
import styles from "./Code.module.css";

export default function Code({
  code,
  children,
  language,
  img,
  isCodeBlock = false,
  srNumber,
}) {
  const [codeElement, setCodeElement] = useState<JSX.Element>();
  const [copyText, setCopyText] = useState<ReactNode>(
    <ClipboardIcon className={styles.ClipboardIcon} />
  );
  const preTag = useRef<HTMLPreElement>();

  // Consider it as a code block if either srNumber is provided or isCodeBlock is true
  const isInsideCodeBlock = useMemo(
    () => srNumber || isCodeBlock,
    [srNumber, isCodeBlock]
  );

  useEffect(() => {
    if (window) {
      window.initial = { prism: true };
      Prism.highlightAll();
    }

    return () => {
      window.initial.prism = false;
    };
  }, [codeElement]);

  const getWrappedCodeElement = (codeElement: ReactNode) => {
    if (isInsideCodeBlock) {
      // No need to wrap it up with <pre> tag if it's inside a code block
      // Since the code block will be wrapped with <pre> tag
      return codeElement;
    } else {
      return (
        <>
          <pre ref={preTag}>{codeElement}</pre>
          <button
            className={styles.CopyIconContainer}
            onClick={handleCopyIconClick}
          >
            {copyText}
          </button>
        </>
      );
    }
  };

  const handleCopyIconClick = useCallback(() => {
    if (preTag.current) {
      const copyText = preTag.current.textContent;
      navigator.clipboard.writeText(copyText);
      setCopyText(<div className={styles.CopiedText}>Copied</div>);
      setTimeout(() => {
        setCopyText(<ClipboardIcon className={styles.ClipboardIcon} />);
      }, 1500);
    }
  }, [preTag.current, setCopyText]);

  useEffect(() => {
    let customCode = isUndefined(code) ? children : code;
    let languageClass = `language-${language}`;

    if (!isUndefined(children) && !isUndefined(children.props)) {
      customCode = children.props.children;
      languageClass = children.props.className;
    }

    setCodeElement(
      <div
        id={srNumber ? `code-block-${srNumber}` : null}
        className={classNames(
          `code-container-${language}`,
          styles.CodeContainer,
          isInsideCodeBlock ? styles.CodeWithSrNumber : ""
        )}
      >
        {img && <Image src={img} clean={true} />}

        {getWrappedCodeElement(
          <code className={languageClass}>{customCode}</code>
        )}
      </div>
    );
  }, [img, code, children, language, copyText]);

  return codeElement;
}
