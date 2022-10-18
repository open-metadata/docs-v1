import React from "react";
import styles from "./InfoCards.module.css";

interface Props {
  heading: string;
  content: string;
  color: string;
}

export default function InfoCards({ heading, content, color }: Props) {
  return (
    <div className={styles.Container}>
      <div
        className={styles.Heading}
        style={{
          color: color,
        }}
      >
        {heading}
      </div>
      <p>{content}</p>
      <div
        className={styles.Patch}
        style={{
          backgroundColor: `${color}1a`,
        }}
      />
    </div>
  );
}
