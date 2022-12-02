import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-toml";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-yaml";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-highlight/prism-line-highlight";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";

import styles from "./Code.module.css";
import Image from "../Image/Image";

export default function Code({ code, children, language, img, lines }) {
  const [codeElement, setCodeElement] = useState<JSX.Element>();

  useEffect(() => {
    if (window) {
      window.initial = { prism: true };
      Prism.highlightAll();
    }

    return () => {
      window.initial.prism = false;
    };
  }, [codeElement]);

  useEffect(() => {
    let customCode = code !== undefined ? code : children;
    let languageClass = `language-${language}`;

    if (children !== undefined && children.props !== undefined) {
      customCode = children.props.children;
      languageClass = children.props.className;
    }

    if (img) {
      setCodeElement(
        <div className={styles.Container}>
          <Image src={img} clean={true} />
          <pre>
            <code className={languageClass}>{customCode}</code>
          </pre>
        </div>
      );
    } else if (lines) {
      setCodeElement(
        <div className={classNames(styles.Container, styles.LineHighlight)}>
          <pre data-line={lines}>
            <code className={languageClass}>{customCode}</code>
          </pre>
        </div>
      );
    } else {
      setCodeElement(
        <div className={styles.Container}>
          <pre>
            <code className={languageClass}>{customCode}</code>
          </pre>
        </div>
      );
    }
  }, [img, code, children, language, lines]);

  return codeElement;
}
