// YouTube.js

import {useState, useEffect, useRef} from "react";
import {YouTubeProps} from "./Youtube.interface";
import styles from "./Youtube.module.css";
import Head from "next/head";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const YouTube = ({videoId}: YouTubeProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={videoRef}
      className={`youtube-video-container ${isVisible ? "visible" : ""}`}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {isVisible && (
        <div className={`youtube-video ${styles.Iframe}`}>
          <LiteYouTubeEmbed id={videoId} title="YouTube Video Player" />
        </div>
      )}
    </div>
  );
};

export default YouTube;
