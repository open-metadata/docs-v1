import React from "react";
import styles from "./InlineCode.module.css";

interface InlineCodeProps {
  content: string;
}

function InlineCode({ content }: InlineCodeProps) {
  return <code className={styles.Container}>{content}</code>;
}

export default InlineCode;
