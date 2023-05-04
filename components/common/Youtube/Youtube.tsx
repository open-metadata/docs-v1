import React from "react";

import styles from "./Youtube.module.css";

interface YouTubeProps {
  videoId: string;
  start?: string;
  end?: string;
  caption?: string;
  height?: string;
  width?: string;
}

const YouTube = ({
  caption = "",
  videoId,
  start = "",
  end = "",
  height,
  width,
}: YouTubeProps) => {
  let YouTubeBlock;

  if (caption) {
    YouTubeBlock = (
      <section className={styles.Container}>
        <section className={styles.IframeContainer}>
          <iframe
            allowFullScreen
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&start=${start}&end=${end}`}
            className={styles.Iframe}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ height, width }}
          ></iframe>
        </section>
        <section className={styles.CaptionContainer}>
          <p className={styles.Caption}>{caption}</p>
        </section>
      </section>
    );
  } else {
    YouTubeBlock = (
      <section className={styles.IframeContainer} style={{ height, width }}>
        <iframe
          allowFullScreen
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&start=${start}&end=${end}`}
          className={styles.Iframe}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{ height, width }}
        ></iframe>
      </section>
    );
  }
  return YouTubeBlock;
};

export default YouTube;
