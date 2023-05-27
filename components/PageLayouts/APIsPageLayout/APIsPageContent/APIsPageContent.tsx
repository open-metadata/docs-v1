import React from "react";
import styles from "./APIsPageContent.module.css";
import Markdoc, { RenderableTreeNode } from "@markdoc/markdoc";
import { components } from "../../../../lib/markdoc";

interface APIsPageContentProps {
  parsedContent: RenderableTreeNode;
}

function APIsPageContent({ parsedContent }: APIsPageContentProps) {
  return (
    <div className={styles.APIsPageContentContainer}>
      {Markdoc.renderers.react(parsedContent, React, {
        components,
      })}
    </div>
  );
}

export default APIsPageContent;
