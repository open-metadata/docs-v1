import React from "react";
import styles from "./Banner.module.css";
import YouTube from "../Youtube/Youtube";

export default function Banner({ heading, content, videoId, bgColor }) {
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <div className={styles.Heading}>{heading}</div>
        <section className={styles.Divider} />
        <p>{content}</p>
      </div>
      <div className={styles.Video}>
        {videoId && <YouTube videoId={videoId} />}
      </div>
    </div>
  );
}
